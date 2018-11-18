process.stdin.resume();

const fs = require("fs");
const os = require("os");
const mysql = require("mysql");
const express = require("express"),
	app = express();
const ExpressTrade = require("expresstrade");
const crypto = require("crypto");
const socket = require("socket.io"),
	server = require("http").createServer(app),
	io = socket.listen(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const config = require("./config.js");

server.listen(3000);

var conn = mysql.createConnection(config.mysql);

conn.connect((err) => {
	if (err) {
		console.log(err);
	}
});
var exit = false;
var bots = [];
var cooldown = {};
var miners = [];
var algos = [];
var coinsinjackpot = 0.00;
var offers = {
	"deposits": [],
	"withdraws": [],
	"coinflips": [],
	"jackpots": []
}

function exitHandler() {
	exit = true;
	var i = 0, count = 0;
	for(var key in offers) {
		if(offers[key] instanceof Array) {
			count+=offers[key].length;
		}
	}
	function check() {
		i++;
		if(count==i) {
			process.exit();
		}
	}
	for(var type in offers) {
		if(offers[type].length>0) {
			Object.values(offers[type]).forEach(offer => {
				if(type=="deposits") {
					bots[0].ITrade.CancelOffer({offer_id:offer.id});
					conn.query("UPDATE trades SET state = ? WHERE id = ?",[6,offer.id],(err,rows,fields) => {
						if(err) {
							log("ERROR",err);
						}
					});
				} else if(type=="withdraws") {
					bots[0].ITrade.GetOffer({offer_id:offer.id},(err,offer) => {
						if(err) {
							log("ERROR",`${err} ERROR WHEN REFUNDING OFFERID: ${offer.id}`);
						}
						if(offer.status==1) {
							offer = offer["response"]["offer"];
							if(offer.state==2) {
								bots[0].ITrade.CancelOffer({offer_id:offer.id});
								conn.beginTransaction((err) => {
									if(err) {
										log("ERROR",`${err} ERROR WHEN REFUNDING OFFERID: ${offer.id}`);
									}
									conn.query("SELECT value FROM trades WHERE id = ?",[offer.id], (err,rows,fields) => {
										if(err){
											conn.rollback(() =>{
												log("ERROR",`${err} ERROR WHEN REFUNDING OFFERID: ${offer.id}`);
											});
										}
										conn.query("UPDATE trades SET state = ? WHERE id = ?",[offer.state,offer.id],(err,rows2,fields) => {
											if(err) {
												conn.rollback(() => {
													log("ERROR",`${err} ERROR WHEN REFUNDING OFFERID: ${offer.id}`);
												});
											}
											conn.query("UPDATE users SET coins = coins + ? WHERE steamid = ?",[rows[0].value,offer["recipient"]["steam_id"]], (err,rows3,fields) => {
												if(err) {
													conn.rollback(() => {
														log("ERROR",`${err} ERROR WHEN REFUNDING OFFERID: ${offer.id}`);
													});
												}
												conn.commit((err) => {
													if(err) {
														conn.rollback(() => {
															log("ERROR",`${err} ERROR WHEN REFUNDING OFFERID: ${offer.id}`);
														});
													}
													log("INFO",`Successfly refunded user ID64: ${offer["recipient"]["steam_id"]} Offer ID: ${offer.id} For ${rows[0].value}`);
													check();
												});
											});
										});
									});
								});
							}
						} else {
							log("ERROR",`OFFER STATUS ${offer.status} ERROR WHEN REFUNDING OFFERID: ${offer.id}`);
						}
					});
				} else {
					check();
				}
			});
		}
	}
}
process.on('SIGINT', function() {
	exitHandler();	
});

process.on('SIGUSR1', function() {
	exitHandler();
});
process.on('SIGUSR2', function() {
	exitHandler();
});

process.on('uncaughtException', function (err) {
	throwError(err);
	exitHandler();
});

function giveTradeCoins(offer,type,value) {
	conn.beginTransaction((err) => {
		if(err) throwError(err + " "+type+" ACCEPT steamid: "+offer["recipient"]["steam_id"]+" Value: "+value);
		conn.query("UPDATE users SET coins = coins + ? WHERE steamid = ?", [value,offer["recipient"]["steam_id"]],(err,rows,fields) => {
			if(err) {
				conn.rollback(() => {
					throwError(`${err} ${type} state: ${offer["state"]} steamid: ${offer["recipient"]["steam_id"]} Value: ${value}`);
				});
			}
			conn.query("UPDATE trades SET state = ? WHERE id = ?", [3,offer.id],(err,rows,fields) => {
				if(err) {
					conn.rollback(() => {
						throwError(`${err} ${type} state: ${offer["state"]} steamid: ${offer["recipient"]["steam_id"]} Value: ${value}`);
					});
				}
				conn.commit((err) => {
					if(err) {
						conn.rollback(() => {
							throwError(`${err} ${type} state: ${offer["state"]} steamid: ${offer["recipient"]["steam_id"]} Value: ${value}`);
						});
					}
				});
			});
		});
	});
}
conn.query("SELECT * FROM bots",(err,result,fields)=> {
	result.forEach(bot => {
		bots.push(
			new ExpressTrade({
				apikey: result[0].api_key,
				twofactorsecret: result[0].secret_2fa,
				pollInterval:5000
			})
		);
	});
	bots[0].on('offerReceived',(offer) => {
		bots[0].ITrade.CancelOffer({ offer_id: offer.id });
	});
	bots[0].on('any',(event,offer) => {
		if(offer["sent_by_you"] && offer["state"]!=2 && exit!==true) {
				conn.query("SELECT value,type FROM trades WHERE id = ?",[offer.id],(err,rows,fields) => {
					if(err) {
						throwError(err);
					}
					var type = rows[0].type;
					var value = rows[0].value;
					for(var i in offers[type+"s"]) {
						if(offers[type+"s"].id==offer.id) {
							offers[type+"s"].splice(i,1);
						}
					}
					switch(offer.state) {
						case 3:
							if(type=="withdraw") {
								conn.query("UPDATE trades SET state = ? WHERE id = ?", [3,offer.id],(err,rows,fields) => {
									if(err) {
										throwError(err);
									}
								});
							} else if(type=="deposit") {
								giveTradeCoins(offer,type,value);
							}
							break;
						case 5:
						case 6:
						case 7:
						case 8:
							if(type=="withdraw") {
								giveTradeCoins(offer,type,value);
							} else if(type=="deposit") {
								conn.query("UPDATE trades SET state = ? WHERE id = ?", [offer.state,offer.id],(err,rows,fields) => {
									if(err) {
										throwError(err);
									}
								});
							}
							break;
					}
				});
			}
		});
});

app.all("*",function(req,res,next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.post("/loadInventory", (req,res) => {
	if(exit) res.end("Script exitting.");
	var json = req.body;
	var inventory = null;
	if(json["refresh"]!=undefined || json["steamid"]!=undefined || !fileExists("./cache/"+json["steamid"]+".txt")) {
		bots[0].ITrade.GetUserInventoryFromSteamId({steam_id:json["steamid"]},(err,res) => {
			if(err) res.end(err);
			var inventory = res["response"]["items"];
			if(!fileExists("./cache")) {
				fs.mkdir("./cache",(err) => {
					if(err) throwError(err);
				});
			}
			fs.writeFile("./cache/"+json["steamid"]+".txt",JSON.stringify(inventory),"utf8",(err) => {
				if(err) {
					log("ERR",err);
				}
				res.json(JSON.stringify(inventory));
			});
		});
	} else {
		if(fileExists("./cache/"+json["steamid"]+".txt")) {
			fs.readFile("./cache/"+json["steamid"]+".txt", 'utf8', (err,data) => {
				inventory = data;
				res.json(inventory);
			});
		}
	}
});
app.post("/withdraw", (req, res) => {
	if(exit) res.end("Script exitting.");
	var json=req.body;
	if(Array.isArray(json["items"]) && json["steamid"]!=undefined) {
			if(checkIfInTrade(json["steamid"])) res.end("You are already in trade");

			var inventory = null;
			bots[0].IUser.GetInventory((err, data) => {
				if(err) res.end("Error when loading bot inventory.");
				var inventory = data["response"]["items"];
				var total = 0;
				var count = 0;
				inventory.forEach((item) => {
					if(json["items"].indexOf(item["id"])>-1) {
						total+=item["suggested_price"]*10;
						count++;
					}
				});
				if(count==json["items"].length) {
					conn.query("SELECT coins,locked FROM users WHERE steamid = ?", [json["steamid"]],(err,rows,fields) => {
						if(err) {
							throwError(err);
						}
						if(rows[0].coins>=total && rows[0].locked==0) {
							conn.beginTransaction((err) => {
								if(err) throwError(err);
								conn.query("UPDATE users SET coins = coins - ? WHERE steamid = ?",[total,json["steamid"]], (err,rows,fields) => {
									if(err) {
										conn.rollback(() => {
											throwError(err);
										});
									}
									var secret = secretcode();
									bots[0].ITrade.SendOfferToSteamId({steam_id: json["steamid"], items_to_send: json["items"].join(","), message: "Withdrawal from VGOSCAM. Secret code: "+secret} , (err,offer) => {
										if(err) {
											conn.rollback(() => {
												throwError(err);
											});
										}
										if(offer["status"] == 1) {
											offer = offer["response"]["offer"];
											conn.query("INSERT INTO trades (id,bot_id,state,steamid,value,secretcode,type) VALUES (?,?,?,?,?,?,?)", [offer.id,0,2,json["steamid"],total,secret,"withdraw"],(err,rows,fields) => {
												if(err) {
													conn.rollback(() => {
														bots[0].ITrade.CancelOffer({offer_id:offer.id});
														throwError(err);
													});
												}
												conn.commit((err) => {
													if(err) {
														conn.rollback(() => {
															bots[0].ITrade.CancelOffer({offer_id:offer.id});
															throwError(err);
														})
													}
													offers["withdraws"].push(offer);
													res.send("Withdrawal is pending");
												});
											});
										} else {
											conn.rollback(() => {
												res.end(offer["message"]);
											});
										}
									});
								});
							});
						} else if(rows[0].coins<total && rows[0].locked==0) {
							res.end("Not enough coins");
						} else if(rows[0].locked==1) {
							res.end("You are locked.");
						}
					});
				} else {
					res.end("Could not find item in bot inventory.")
				}
			});
	} else {
		res.end("Your has not selected items");
	}
});

app.post("/deposit", (req,res) => {
	if(exit) res.end("Script exitting.");
	var json=req.body;
	var inventory = null;
	if(fileExists("./cache/"+json["steamid"]+".txt")) {
		if(Array.isArray(json["items"]) && json["steamid"]!=undefined) {
			if(checkIfInTrade(json["steamid"])) res.end("You are already in trade");
			fs.readFile("./cache/"+json["steamid"]+".txt", 'utf8', (err,inventory) => {
				var total = 0;
				var count = 0;
				inventory = JSON.parse(inventory);
				inventory.forEach((item) => {
					if(json["items"].indexOf(item["id"])>-1) {
						total+=item["suggested_price"]*10;
						count++;
					}
				});
				if(count==json["items"].length) {
					var secret = secretcode();
					bots[0].ITrade.SendOfferToSteamId({steam_id: json["steamid"], items_to_receive: json["items"].join(","), message: "Deposit to VGOSCAM. Secret code: "+secret} , (err,offer) => {
						if(err) res.end("Error when sending deposit offer.");
						if(offer.status==1) {
							offer = offer["response"]["offer"];
							var secret = secretcode();
							conn.query("INSERT INTO trades (id,bot_id,state,steamid,value,secretcode,type) VALUES (?,?,?,?,?,?,?)", [offer.id,0,2,json["steamid"],total,secret,"deposit"],(err,rows,fields) => {
								if(err) {
									bots[0].ITrade.CancelOffer({offer_id: offer.id});
									throwError(err);
								}
								offers["deposits"].push(offer);
								res.send("Deposit offer sent.");
							});
						} else {
							res.end(offer.message);
						}
					});
				} else {
					res.end("Could not find item in your inventory.");
				}
			});
		} else {
			res.end("Your has not selected items");
		}
	} else {
		res.end("Could not find Your inventory cache.");
	}
});
function addCoins() {
const statsprovider = "https://api.nicehash.com/api?method=stats.provider.ex&addr="+config.address;


//get algos profitability
request.get(statsprovider, (error,response,body) => {
	if(error) { log(error); return; }
	if(!isJSON(body)) return;
	let json = JSON.parse(body);
	if(typeof(json.result.error) !== "undefined") { log("ERROR: "+json.result.error); return; }
	json.result.current.forEach(function(algo) {
		algos[algo.algo]= {"profitability":algo.profitability};
	});
	
	//workers
	const workers = "https://api.nicehash.com/api?method=stats.provider.workers&addr="+config.address;
	request.get(workers, (error2,response2,body2) => {
		if(error2) { log("ERROR",error2); return; }
		if(!isJSON(body2)) return;
		let json = JSON.parse(body2);
		if(typeof(json.result.error) !== "undefined") { log("ERROR",json.result.error); return; }
		
		const bitcoinusd = "https://blockchain.info/pl/ticker";
			
		request.get(bitcoinusd, (error3,response3,body3) => {
		if(error3) { log(error3); return; }
		if(!isJSON(body3)) return;
		let bitcoinusd_json = JSON.parse(body3);
		var bitcoinprice = bitcoinusd_json.USD['15m'];
			miners=[];
			var count = Object.keys(json.result.workers).length;
			json.result.workers.forEach(function(worker) {
				if(algos[worker[6]]==undefined) return;
				if(worker[1]["a"]==undefined) return;
					conn.beginTransaction((err) => {
						if(err) throwError(err);
						conn.query("SELECT steamid,name,refferid FROM users u JOIN affiliates a ON u.steamid = a.steamid WHERE id = ?", worker[0], function (err,result,fields) {
							if(result.length>0) {
								
								var coins = Number((180/86400 * algos[worker[6]].profitability * worker[1]["a"] * bitcoinprice*1000 * (1.00-config.fee)).toFixed(0));
								miners.push({"id":result[0].steamid,"tickets":Math.floor(coins/10)});
								
								if(result[0].name.toLowerCase().indexOf("vgoscam.com")>-1) {
									coins = Number((coins*1.02).toFixed(0));
								}
								coinsinjackpot+=coins*0.01;

								conn.beginTransaction((err) => {
									if(err) {
										conn.rollback(() => {
											throwError(err);
										});
									}
									conn.query("INSERT INTO minedcoins (steamid,coins) VALUES (?,?)", [result[0].steamid,coins], (err,result2,fields) => {
										if(err) {
											conn.rollback(() => {
												throwError(err);
											});
										}
										if(result[0].refferid!="") {
											conn.query("UPDATE users SET coins = coins + ? WHERE id= ?; UPDATE users SET refferal_avaliable = TRUNCATE(refferal_avaliable + ?,2) , refferal_total = TRUNCATE(refferal_total + ?,2) WHERE steamid = ?;", [coins,worker[0] ,coins*0.02,coins*0.02,result[0].refferid], function(err,result2) {
												if(err) {
													conn.rollback(() => {
														throwError(err);
													});
												}
												conn.commit((err) => {
													if(err) {
														throwError(err);
													}
												});
											});
										}
										else {
											conn.query("UPDATE users SET coins = coins + ? WHERE id = ?",[coins,worker[0]],function(err,result2) {
												if(err) {
													conn.rollback(() => {
														throwError(err);
													});
												}
												conn.commit((err) => {
													if(err) {
														throwError(err);
													}
												});
											});
										}
										
										if(--count == 0) jackpot();
									});
								});
								
							}
						});
					});
				});
			
		});
		
	});
});
}
function jackpot() {
	if(coinsinjackpot<=100) return;
	if(Math.random()*199!=69) return;
	
	if(Object.keys(miners).length >0) {
		var x = miners;
		var winner = pickWinner(x);
		var coins = Math.floor(coinsinjackpot);
		conn.beginTransaction((err) => {
			conn.query("INSERT INTO jackpots (winner,value,chance) VALUES (?,?,?); UPDATE users SET coins = coins + ? WHERE steamid = ?;",[winner.winner,coins,winner.chance,coins,winner.winner], function(err,result) {
				if(err) {
					conn.rollback(() => {
						throwError(`${err} Error when inserting jackpot winner. Winner: ${winner.winner} Value: ${coins} Chance: ${winner.chance}`);
					});
				}
				coinsinjackpot=0;
				
				conn.query("INSERT INTO notifications (steamid,message) VALUES (?,?);",[winner.winner,"You have won jackpot valued at "+coins+" coins with "+winner.chance*100 +"%. Congratulations!"],function (err2,result2) {
					if(err2) {
						conn.rollback(() => {
							throwError(`${err2} Error when inserting jackpot winner. Winner: ${winner.winner} Value: ${coins} Chance: ${winner.chance}`);
						});
					}
				});
				io.emit("jackpot_coins",{coins:coinsinjackpot});
					conn.query("SELECT avatar,name FROM users WHERE steamid = ?;", [winner.winner],function(err3,result3,fields) {
						if(err3) {
							conn.rollback(() => {
								throwError(`${err3} Error when inserting jackpot winner. Winner: ${winner.winner} Value: ${coins} Chance: ${winner.chance}`);
							});
						}
						conn.commit((err) => {
							if(err) {
								conn.rollback(() => {
									throwError(`${err} Error when inserting jackpot winner. Winner: ${winner.winner} Value: ${coins} Chance: ${winner.chance}`);
								});
							}
							io.emit("jackpot",{coins:coins,steamid:winner.winner,name:result3[0].name,chance:winner.chance,avatar:result3[0].avatar});
						});
					});
			});
		});
	}
}
function pickWinner(participants) {
  var total = 0;
  participants.map((x) => { total += x["tickets"] });

  var winner = Math.floor(Math.random() * total);

  for (var i in participants) {
    if (winner - participants[i]["tickets"] <= 0) {
      var winnn = i;
      break;
    } else {
      winner -= participants[i]["tickets"];
    }
  }
  return {"winner":participants[winnn].id,"total":total,"chance":Math.round(participants[winnn]["tickets"]/total*100)/100};
}

app.listen(3000, () => console.log(`Listening to port 3000`));

setInterval(() => {
	io.emit("jackpot_coins",{coins:coinsinjackpot});
});
function updateName(steamid) {

}
function checkIfInTrade(steamid) {
	offers["withdraws"].map(offer => {
		if(offer["recipient"]["steam_id"]==steamid) return true;
	});
	offers["deposits"].map(offer => {
		if(offer["recipient"]["steam_id"]==steamid) return true;
	});
	return false;
}
function secretcode() {
	return crypto.randomBytes(6).toString('hex');
}
async function throwError(msg) {
	log("ERROR",msg).then(function(resp) {
		process.exit();
	});
}
function log(level,msg) {
	Date.prototype.ddmmyyyy = function() {
		var mm = this.getMonth() + 1;
		var dd = this.getDate();

		return [this.getFullYear(),
		(dd>9 ? '' : '0') + dd,
		(mm>9 ? '' : '0') + mm
		].join('_');
	};

	var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
	var day = new Date().ddmmyyyy();
	console.log("["+date+"] ("+level+")"+msg);
	return new Promise((resolve,reject) => {
		if(!fileExists("./logs")) {
			fs.mkdirSync("./logs");
		}
		if(!fileExists("./logs/log_"+day+".txt")) { 
			fs.writeFile("./logs/log_"+day+".txt","",function(err) {
				if(err) throw err;
			});
		}

		fs.appendFile("./logs/log_"+day+".txt","["+date+"] ("+level+")"+msg+os.EOL,function(err) {
			if(err) throw err;
			resolve();
		});
	});
}

function fileExists(path) {
	if(fs.existsSync(path)) return true;
	return false;
}