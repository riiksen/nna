'use strict';

process.stdin.resume();

const fs = require('fs');
const os = require('os');
const mysql = require('mysql');
const express = require('express'),
	app = express();
const ExpressTrade = require('expresstrade');
const crypto = require('crypto');
const request = require('request');
const socket = require('socket.io'),
	server = require('http').createServer(app),
	io = socket.listen(server);
const SlackWebhook = require('slack-webhook');
const webhook = new SlackWebhook('https://hooks.slack.com/services/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');


const roulette = require('./modules/roulette.js');
const trades = require('./modules/trades.js');
const miner = require('./modules/miner.js')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const config = require('./config.js');

var conn = mysql.createConnection(config.mysql);

conn.connect((err) => {
	if (err) {
		throwError(err);
	}
});
var bots = [];
var cooldown = {};
var loggedSockets = [];
var lastNameUpdate = [];


io.on('connection',(socket) => {
	socket.on('disconnect', (socket) => {
		for(var i = 0; i<loggedSockets.length; i++) {
			if(socket.id==loggedSockets[i]['socketId']) {
				loggedSockets.splice(i,1);
			}
		}
	});
});


async function exitHandler() {
	server.close();
	await roulette.onExit();
	await trades.onExit();
	await miner.onExit();
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
	throwError(err.stack);
	exitHandler();
});

app.use(function(req,res,next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Credentials', true);
	next();
});
app.post('/loginToSocket', (req,res) => {
	if(checkIfLocalRequest) {
		var json = req.body;
		if(json.steamid==undefined || json.socketId==undefined) { res.end(); return; }
		for(var socket in io.sockets.sockets) {
			if(json.socketId==socket) {
				loggedSockets.push({'socketId':socket,'steamid':json.steamid});
			}
		}
	}
	res.end();
});
function addCoins() {

}

addCoins();
server.listen(3000, () => console.log(`Listening to port 3000`));

setInterval(() => {
	io.emit('jackpot_coins',{coins:coinsinjackpot});
},1000);
setInterval(() => {
	addCoins();
},180000);
function updateNameById(id) {
	return new Promise((resolve,reject) => {
		var nowUNIX = new Date().getTime()/1000;
		if(lastNameUpdate[id]===undefined || Math.floor(lastNameUpdate[id]-nowUNIX+3600)>0) { // Time difference between lastNameUpdate + wait time (3600seconds = 1h)
			return Promise.resolve();
		} else {
			conn.query('SELECT steamid FROM users WHERE id = ?',[id], (err,result,fields) => {
				request.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${config.api_key}&steamids=${result[0].steamid}`,(err,response,body) => {
					if(err) {
						log('ERROR',err);
						reject();
					}
					var json = JSON.parse(body);
					conn.query('UPDATE users SET username = ? WHERE id = ?', [json['response']['players'][0]['personaname'],id], (err,result2) => {
						if(err) {
							throwError(err);
							reject();
						}
						resolve();
					});
				});
			});
		}
	});
}
function updateNameBySteamId(steamid) {
	return new Promise((resolve,reject) => {
		var nowUNIX = new Date().getTime()/1000;
		if(lastNameUpdate[steamid]===undefined || Math.floor(lastNameUpdate[steamid]-nowUNIX+3600)>0) { // Time difference between lastNameUpdate + wait time (3600seconds = 1h)
			return Promise.resolve();
		} else {
			lastnameUpdate[steamid] = nowUNIX;
			request.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${config.api_key}&steamids=${steamid}`,(err,response,body) => {
				if(err) {
					log('ERROR',err);
					return Promise.reject(err);
				}
				var json = JSON.parse(body);
				conn.query('UPDATE users SET username = ? WHERE id = ?', [json['response']['players'][0]['personaname'],steamid], (err,result2) => {
					if(err) {
						throwError(err);
						return Promise.reject(err);
					}
					return Promise.resolve();
				});
			});
		}
	});
}
function secretcode() {
	return crypto.randomBytes(6).toString('hex');
}
function throwError(msg) {
	log('ERROR',msg).then(function(resp) {
		process.exit();
	});
}
function log(level,msg,type,info) {
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
	console.log(`[${date}] (${level}) ${msg}`);
	return new Promise((resolve,reject) => {
		var dir = './logs';
		if(!fileExists(dir)) {
			fs.mkdirSync(dir);
		}

		switch(type) {
			case 'trade-log':
				dir += '/trade_log';
				webhook.send({
					text:`[${date}] (${level}) ${msg}`,
					attachments: [

					],
					username: '[NODEJS]',
					channel: '#trade-logs'
				});
				break;
			default:
				dir += '/error_log'
				webhook.send({
					text:`[${date}] (${level}) ${msg}`,
					attachments: [

					],
					username: '[NODEJS]',
					channel: '#error-logs'
				});
				break;
		}

		if(!fileExists(dir)) {
			fs.mkdirSync(dir);
		}
		if(!fileExists(`${dir}/${day}.txt`)) { 
			fs.writeFile(`${dir}/${day}.txt`,'',function(err) {
				if(err) throw err;
			});
		}

		fs.appendFile(`${dir}/${day}.txt`,`[${date}] (${level}) ${msg} ${os.EOL}`,function(err) {
			if(err) throw err;
			resolve();
		});
	});
}

function fileExists(path) {
	if(fs.existsSync(path)) return true;
	return false;
}
function isJSON(str) {
	try {
		JSON.parse(str);
	} catch (err) {
		return false;
	}
	return true;
}
function checkIfLocalRequest(req) {
	if (req.ip === '127.0.0.1' || req.ip === server.address.address) {
		return true;
	} else {
		return false;
	}
}

function scope(context) {
	return eval(context);
}

miner.init(scope);
jackpot.init(scope);
trades.init(scope);