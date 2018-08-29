process.stdin.resume();

const os = require("os");
const mysql = require("mysql");
const express = require("express");
const OPSkinsAPI = require("@opskins/api");

var conn = mysql.createConnection(config.mysql);

conn.connect((err) => {
	if (err) {
		log("ERROR", err);
	}
});

var opskins = new OPSkinsAPI("99733de7fe905dw84be09179ade94739");

opskins.getSteamID((err, steamID) => {
	if (err) {
		log("ERROR",err);
		process.exit();
	} else {
		console.log("OPSkins API connected to (id64): " + steamID);
	}
});

var cooldown = {};


function log(level,msg) {
	fs.exists("log.txt",function(exists) {
		if(!exists) fs.writeFile("log.txt","",function(err) {
			if(err) throw err;
		});
	});

	var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
	fs.appendFile("log.txt","["+date+"] ("+level+")"+msg+os.EOL,function(err) {
		if(err) throw err;
	});
}

