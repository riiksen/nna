var conn,bots,loggedSockets,log,io,ExpressTrade
module.exports.init = function(ExpressTrade,conn,bots,loggedSockets,log,io) {
	this.ExpressTrade = ExpressTrade;
	this.conn = conn;
	this.bots = bots;
	this.loggedSockets = loggedSockets;
	this.log = log;
	this.io = io;
};
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
		if(offer["sent_by_you"] && offer["state"]!=2) {
				conn.query("SELECT value,type FROM trades WHERE id = ?",[offer.id],(err,rows,fields) => {
					if(err) {
						throwError(err);
					}
					var type = rows[0].type;
					var value = rows[0].value;
					switch(offer.state) {
						case 3:
							if(type=="withdraw") {
								conn.query("UPDATE trades SET state = ? WHERE id = ?", [3,offer.id],(err,rows,fields) => {
									if(err) {
										throwError(err);
									} else {
										log("INFO",`Offer ${offer.id} changed to ${offer.state}`,"trade-log",{"offer_id":offer.id,"steamid":offer["recipient"]["steam_id"],"value":value,"state":offer.state,"type":type});
									}
								});
							} else if(type=="deposit") {
								log("INFO",`Offer ${offer.id} changed to ${offer.state}`,"trade-log",{"offer_id":offer.id,"steamid":offer["recipient"]["steam_id"],"value":value,"state":offer.state,"type":type});
								giveTradeCoins(offer,type,value);
							}
							break;
						case 5:
						case 6:
						case 7:
						case 8:
							if(type=="withdraw") {
								log("INFO",`Offer ${offer.id} changed to ${offer.state}`,"trade-log",{"offer_id":offer.id,"steamid":offer["recipient"]["steam_id"],"value":value,"state":offer.state,"type":type});
								giveTradeCoins(offer,type,value);
							} else if(type=="deposit") {
								conn.query("UPDATE trades SET state = ? WHERE id = ?", [offer.state,offer.id],(err,rows,fields) => {
									if(err) {
										throwError(err);
									} else {
										log("INFO",`Offer ${offer.id} changed to ${offer.state}`,"trade-log",{"offer_id":offer.id,"steamid":offer["recipient"]["steam_id"],"value":value,"state":offer.state,"type":type});
									}
								});
							}
							break;
					}
				});
			}
		});
});
function giveTradeCoins(offer,type,value) {
	conn.beginTransaction((err) => {
		if(err) throwError(`${err} ${type} ACCEPT steamid: ${offer["recipient"]["steam_id"]} Value: ${value}`);
		conn.query("UPDATE users SET coins = coins + ? WHERE steamid = ?", [value,offer["recipient"]["steam_id"]],(err,rows,fields) => {
			if(err) {
				conn.rollback(() => {
					throwError(`${err} ${type} state: ${offer["state"]} steamid: ${offer["recipient"]["steam_id"]} Value: ${value}`);
				});
			} else {
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
			}
		});
	});
}
module.exports.onExit = function (conn, bots) {
	return new Promise((resolve,reject) => {
		var count = 0, offerNumber = 0;
		conn.query("SELECT steamid,value,type FROM trades WHERE state = 2", (err,trades,fields) => {
			if(err) {
				log("ERROR",err);
				resolve();
			}
			count = trades.length;
			function check(x) {
				offerNumber++;
				if(count==x) {
					resolve();
				}
			}

			for(let i = 0; i<count; i++) {
				if(trades[i].type=="deposit") {
					bots[0].ITrade.CancelOffer({offer_id:trades[i].id},(err,offer) => {
						if(err) {
							log("ERROR",`${err} ERROR WHEN CANCELING DEPOSIT OFFERID: ${offer.id}`);
							check();
						} else {
							conn.query("UPDATE trades SET state = ? WHERE id = ?",[offer.state,offer.id],(err,rows,fields) => {
								if(err) {
									log("ERROR",`${err} ERROR WHEN CANCELING DEPOSIT OFFERID: ${offer.id}`);
								}
								check();
							});
						}
					});
				} else if(trades[i].type=="withdraw") {
					bots[0].ITrade.GetOffer({offer_id:trades[i].id},(err,offer) => {
						if(err) {
							log("ERROR",`${err} ERROR WHEN REFUNDING OFFERID: ${offer.id}`);
							check();
						} else {
							if(offer.status==1) {
								if(offer.state==2) {
									bots[0].ITrade.CancelOffer({offer_id:offer.id},(err,offer) => {
										conn.beginTransaction((err) => {
											if(err) {
												log("ERROR",`${err} ERROR WHEN REFUNDING OFFERID: ${offer.id}`);
												check();
											} else {
												conn.query("UPDATE trades SET state = ? WHERE id = ?",[offer.state,offer.id],(err,rows2,fields) => {
													if(err) {
														conn.rollback(() => {
															log("ERROR",`${err} ERROR WHEN REFUNDING OFFERID: ${offer.id}`);
															check();
														});
													} else {
														conn.query("UPDATE users SET coins = coins + ? WHERE steamid = ?",[trades[i].value,trades[i].value], (err,rows3,fields) => {
															if(err) {
																conn.rollback(() => {
																	log("ERROR",`${err} ERROR WHEN REFUNDING OFFERID: ${offer.id}`);
																	check();
																});
															} else {
																conn.commit((err) => {
																	if(err) {
																		conn.rollback(() => {
																			log("ERROR",`${err} ERROR WHEN REFUNDING OFFERID: ${offer.id}`);
																			check();
																		});
																	} else {
																		log("INFO",`Successfly refunded user ID64: ${offer["recipient"]["steam_id"]} Offer ID: ${offer.id} For ${trades[i].value}`);
																		check();
																	}
																});
															}
														});
													}
												});
											}
										});
									});
								}
							} else {
								log("ERROR",`OFFER STATUS ${offer.status} [not state] ERROR WHEN REFUNDING OFFERID: ${offer.id}`);
							}
						}
					});
				} else {
					bots[0].ITrade.CancelOffer({offer_id:offer.id}, (err,offer) => {
						if(err) {
							log("ERROR",`${err} ERROR WHEN CANCELING ${trades[i].type} OFFERID: ${offer.id}`);
						}
						check();
					});
				}
			}
		});
	});
}