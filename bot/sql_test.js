const mysql = require("mysql");

const config = require("./config.js");

var conn = mysql.createConnection(config.mysql);

conn.connect((err) => {
	if (err) {
		console.log(err);
	}
});

conn.query("SELECT * FROM trades WHERE state = ?", "2", (err,rows,fields) => {
	console.log(rows.length);
});