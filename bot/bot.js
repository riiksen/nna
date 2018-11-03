process.stdin.resume();

const fs = require("fs");
const os = require("os");
const mysql = require("mysql");
const express = require("express"),
	app = express();
const ExpressTrade = require("expresstrade");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var ET = new ExpressTrade({
	apikey: "99733de7fe90584be09179ade94739",
	twofactorsecret:"N7VZVLMJB7RIIK3C",
	pollInterval:5000
});

const config=require("./config.js")

var conn = mysql.createConnection(config.mysql);

conn.connect((err) => {
	if (err) {
		console.log(err);
	}
});


/* ET.ITrade.GetUserInventoryFromSteamId({steam_id:"76561198324573476"},(err,res) => {
	if(!fs.existsSync("./cache")) {
		fs.mkdirSync("./cache");
	}
	fs.writeFile("./cache/76561198324573476.txt",JSON.stringify(res["response"]["items"]),"utf8",function(err) {
		if(err) {
			log("ERR",err);
		}
	});
}); */


var cooldown = {};

app.get('/', (req, res) => res.send('Hello World!'))

app.all("*",function(req,res,next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.post("/withdraw", (req, res) => {
	var json=req.body;
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
	console.log("["+date+"] ("+level+")"+msg);
	return new Promise((resolve,reject) => {
		fs.exists("log.txt",function(exists) {
			if(!exists) fs.writeFile("log.txt","",function(err) {
				if(err) throw err;
			});
		});

		var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
		fs.appendFile("log.txt","["+date+"] ("+level+")"+msg+os.EOL,function(err) {
			if(err) throw err;
			resolve();
		});
	});
}

