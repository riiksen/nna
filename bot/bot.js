process.stdin.resume();

const fs = require("fs");
const os = require("os");
const mysql = require("mysql");
const express = require("express"),
	app = express();
const ExpressTrade = require("expresstrade");

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
});

app.all("*",function(req,res,next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.post("/loadInventory", (req,res) => {
	var json = req.body;
	console.log(json);
	var inventory = null;
	if(json["refresh"]!=undefined || json["steamid"]!=undefined || !fileExists("./cache/"+json["steamid"]+".txt")) {
		bots[0].ITrade.GetUserInventoryFromSteamId({steam_id:json["steamid"]},(err,res) => {
			if(!fileExists("./cache")) {
				fs.mkdir("./cache",(err) => {
					if(err) logError(err);
				});
			}
			fs.writeFile("./cache/"+json["steamid"]+".txt",JSON.stringify(res["response"]["items"]),"utf8",(err) => {
				if(err) {
					log("ERR",err);
				}
			});
		});
	} else {
		if(fileExists("./cache/"+json["steamid"]+".txt")) {
			fs.readFile("./cache/"+json["steamid"]+".txt", 'utf8', (err,data) => {
				inventory = data;
			});
		}
	}
	res.json(inventory);
});
app.post("/withdraw", (req, res) => {
	var json=req.body;

	if(Array.isArray(json["items"]) && json["steamid"]!=undefined) {
		if(fileExists("./cache/"+json["steamid"]+".txt")) {
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
						if(rows[0].coins>total) {
							conn.query("UPDATE users SET coins = coins - ? WHERE steamid = ?",[total,json["steamid"]], (err,rows,fields) => {
								if(err) {
									conn.query("UPDATE users SET coins = coins + ? WHERE steamid = ?",[total,json["steamid"]], (err,rows,fields) => {										res.end(err + '/n Coins returned.');
									});
								}
								bots[0].ITrade.SendOfferToSteamId({steam_id: json["steamid"], items: json["items"].join(","), message: "Withdrawal from VGOCRASH."} , (err,body) => {
									if(err) {
										conn.query("UPDATE users SET coins = coins + ? WHERE steamid = ?",[total,json["steamid"]], (err,rows,fields) => {
											if(err) res.end(err);
											res.end(err + '/n Coins returned.');
										});
									}
									res.send('Withdrawal is pending');
								});
							});
						} else {
							res.end("Not enough coins");
						}
					});
				} else {
					res.end("Could not find item in bot inventory.")
				}
			});
		} else {
			res.end("a");
		}
	} else {

	}
});

app.post("/deposit", (req,res) => {
	var json=req.body;
	
});

app.listen(3000, () => console.log(`Listening to port 3000`));

async function logError(msg) {
	log("ERROR",msg).then(function(resp) {
		process.exit();
	});
}
function log(level,msg) {
	var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
	console.log("["+date+"] ("+level+")"+msg);
	return new Promise((resolve,reject) => {
		if(!fileExists("log.txt")) { 
			fs.writeFile("log.txt","",function(err) {
				if(err) throw err;
			});
		}

		fs.appendFile("log.txt","["+date+"] ("+level+")"+msg+os.EOL,function(err) {
			if(err) throw err;
			resolve();
		});
	});
}

function fileExists(file) {
	var stats = fs.statSync(file);
	if(!stats.isDirectory() && !stats.isFile()) return false;
	return true;
}