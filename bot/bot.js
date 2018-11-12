process.stdin.resume();

const fs = require("fs");
const os = require("os");
const mysql = require("mysql");
const express = require("express"),
	app = express();
const ExpressTrade = require("expresstrade");
const crypto = require("crypto");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const config=require("./config.js")

var conn = mysql.createConnection(config.mysql);

conn.connect((err) => {
	if (err) {
		console.log(err);
	}
});
var bots = [];
var cooldown = {};
var offers = {
	"deposits": [],
	"withdraws": [],
	"coinflips": [],
	"jackpots": []
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
		bots[0].CancelOffer({ offer_id: offer.id });
	});
	bots[0].on('any',(event,offer) => {
		if(offer["sent_by_you"] && offer["state"]!=2) {
				conn.query("SELECT value,type FROM trades WHERE id = ?",[offer.id],(err,rows,fields) => {
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
								conn.beginTransaction((err) => {
									if(err) throwError(err + " DEPOSIT ACCEPT steamid: "+offer["recipient"]["steam_id"]+" Value: "+value);
									conn.query("UPDATE users SET coins = coins + ? WHERE steamid = ?", [value,offer["recipient"]["steam_id"]],(err,rows,fields) => {
										if(err) {
											conn.rollback(() => {
												throwError(err + " DEPOSIT ACCEPT steamid: "+offer["recipient"]["steam_id"]+" Value: "+value);
											});
										}
										conn.query("UPDATE trades SET state = ? WHERE id = ?", [3,offer.id],(err,rows,fields) => {
											if(err) {
												conn.rollback(() => {
													throwError(err + " DEPOSIT ACCEPT steamid: "+offer["recipient"]["steam_id"]+" Value: "+value);
												});
											}
											conn.commit((err) => {
												if(err) {
													conn.rollback(() => {
														throwError(err + " DEPOSIT ACCEPT steamid: "+offer["recipient"]["steam_id"]+" Value: "+value);
													});
												}
											});
										});
									});
								});
							}
							break;
						case 5:
						case 6:
						case 7:
						case 8:
							if(type=="withdraw") {
								conn.beginTransaction((err) => {
									if(err) throwError(err)
										console.log("withdraw deklajn");
										conn.query("UPDATE users SET coins = coins + ? WHERE steamid = ?", [value,offer["recipient"]["steam_id"]],(err,rows,fields) => {
											if(err) {
												conn.rollback(() => {
													throwError(err + " WITHDRAW DECLINE steamid: "+offer["recipient"]["steam_id"]+" Value: "+value);
												});
											}
											conn.query("UPDATE trades SET state = ? WHERE id = ?",[offer.state,offer.id],(err,rows,fields) => {
												if(err) {
													conn.rollback(() => {
														throwError(err + " WITHDRAW DECLINE steamid: "+offer["recipient"]["steam_id"]+" Value: "+value);
													});
												}
												conn.commit((err) => {
													if(err) {
														conn.rollback(() => {
															throwError(err + " WITHDRAW DECLINE steamid: "+offer["recipient"]["steam_id"]+" Value: "+value);
														});
													}
												});
											});
										});
								});
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
						if(rows[0].coins>total && rows[0].locked==0) {
							conn.beginTransaction((err) => {
								if(err) throwError(err);
								conn.query("UPDATE users SET coins = coins - ? WHERE steamid = ?",[total,json["steamid"]], (err,rows,fields) => {
									if(err) {
										conn.rollback(() => {
											throwError(err);
										});
									}
									var secret = secretcode();
									bots[0].ITrade.SendOfferToSteamId({steam_id: json["steamid"], items_to_send: json["items"].join(","), message: "Withdrawal from VGOSCAM. Secret code: "+secret, expiration_time:262800} , (err,offer) => {
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
														bots[0].CancelOffer({offer_id:offer.id});
														throwError(err);
													});
												}
												conn.commit((err) => {
													if(err) {
														conn.rollback(() => {
															bots[0].CancelOffer({offer_id:offer.id});
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
					bots[0].ITrade.SendOfferToSteamId({steam_id: json["steamid"], items_to_receive: json["items"].join(","), message: "Deposit to VGOSCAM. Secret code: "+secret, expiration_time:262800} , (err,offer) => {
						if(err) res.end("Error when sending deposit offer.");
						if(offer.status==1) {
							offer = offer["response"]["offer"];
							var secret = secretcode();
							conn.query("INSERT INTO trades (id,bot_id,state,steamid,value,secretcode,type) VALUES (?,?,?,?,?,?,?)", [offer.id,0,2,json["steamid"],total,secret,"deposit"],(err,rows,fields) => {
								if(err) {
									bots[0].CancelOffer({offer_id: offer.id});
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

app.listen(3000, () => console.log(`Listening to port 3000`));

function checkIfInTrade(steamid) {
	offers["withdraws"].forEach((offer) => {
		if(offer["recipient"]["steam_id"]==steamid) return true;
	});
	offers["deposits"].forEach((offer) => {
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