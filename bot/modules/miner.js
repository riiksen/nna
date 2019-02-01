'use strict';

var nicehashMiners = [];
var algos = [];
var coinsinjackpot = 0.00;
var main,request,config,conn,loggedSockets,io,updateNameById;

module.exports.init = function(scope) {
	main = scope;

};
module.exports.coinhiveMiner = function() {
	request.get('https://api.bitfinex.com/v1/pubticker/xmrusd' , (err,response,body) => {
		if(err) {
			log('ERROR',err);
			return;
		}
		var bitfnex_price = JSON.parse(body)['ask'];
		request.get('https://api.hitbtc.com/api/2/public/ticker/XMRUSD' , (err,response,body) => {
			if(err) {
				log('ERROR',err);
				return;
			}
			var hitbtc_price = JSON.parse(body)['ask'];
			if(bitfnex_price==undefined || hitbtc_price==undefined) {
				log('ERROR',`Undefined bitfnex_price or hitbtc_price. BITFNEX_PRICE: ${bitfnex_price}, HITBTC_PRICE: ${hitbtc_price}`);
				return;
			} else if(bitfnex_price>hitbtc_price*1.05 && hitbtc_price>bitfnex_price*1.05) {
				log('ERROR',`Price difference more than 5%. BITFNEX_PRICE: ${bitfnex_price}, HITBTC_PRICE: ${hitbtc_price}`);
				return;
			}
			request.get(`https://api.coinhive.com/user/top?secret=${config.miner.coinhive.secret_key}&count=1024&order=balance` ,(err,response,body) => {
				if(err) {
					log('ERROR',err);
					return;
				}
				var json = JSON.parse(body);
				var users = json['users'];
				request.get(`http://moneroblocks.info/api/get_stats/`,(err,response,body) => {
					var blockJSON = JSON.parse(body);
					var block_reward = blockJSON['last_reward']/Math.pow(10,12),
					block_difficulty = blockJSON['difficulty'];
					if(json['success']) {
						if(users.length>0) {
							for(let i in users) {
								let user = users[i];
								if(user['balance']==0) break;
								request.post(`https://api.coinhive.com/user/withdraw?secret=${ config.miner.coinhive.secret_key }&name=${user['name']}&amount=${user['balance']}`, (err,response,body) => {
									if(err) {
										log('ERROR',err);
										return;
									}
									let withdrawJSON = JSON.parse(body);
									if(withdrawJSON['success']) {
										var coins = (user['balance']/block_difficulty) * (1-config.miner.fee) * bitfnex_price;
										conn.beginTransaction((err) => {
											if(err) throwError(err);
											conn.query('SELECT COUNT(steamid=?) AS count FROM users',[user['name']],(err,rows,fields) => {
												if(err) {
													conn.rollback(() => {
														throwError(err);
													});
												}
												if(rows[0].count>0) {
													conn.query('INSERT INTO mined_coins (steamid,coins,miner) VALUES (?,?,?)',[user['name'],coins,'coinhive'],(err,result) => {
														if(err) {
															conn.rollback(() => {
																throwError(err);
															});
														}
														conn.query('UPDATE users SET coins = coins + ? WHERE steamid = ?', [coins,user['name']],(err,result) => {
															conn.commit((err) => {
																if(err) {
																	conn.rollback(() => {
																		throwError(err);
																	});
																}
															});
														});
													});
												}
											});
										});
									} else {
										log('ERROR',`addCoins: error when withdrawing coinhive balance ${withdrawJSON['error']}`);
									}
								});
							}
						}
					} else {
						log('ERROR',`addCoins: error when getting top user ${err}`);
					}

				});
			});
		});
	});
};
module.exports.nicehashMiner = function () {
	var coinhive = config.miner.coinhive,
	nicehash = config.miner.nicehash,
	fee = config.miner.fee;

	//NICEHASH

	const statsprovider = "https://api.nicehash.com/api?method=stats.provider.ex&addr="+nicehash.address;
	//get algos profitability 
	request.get(statsprovider, (error,response,body) => {
		if(error) { log("ERROR", error); return; }
		if(!isJSON(body)) return;
		let json = JSON.parse(body);
		if(typeof(json.result.error) !== "undefined") { log("ERROR",json.result.error); return; }
		json.result.current.forEach(function(algo) {
			algos[algo.algo]= {"profitability":algo.profitability};
		});
		
		//workers
		const workers = "https://api.nicehash.com/api?method=stats.provider.workers&addr="+nicehash.address;
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
				var count = Object.keys(json.result.workers).length;
				json.result.workers.forEach((worker) => {
					if(algos[worker[6]]==undefined) return;
					if(worker[1]["a"]==undefined) return;
						conn.beginTransaction(async(err) => {
							if(err) throwError(err);
							await updateNameById(worker[0]);
							conn.query("SELECT steamid,name,refferid FROM users u JOIN affiliates a ON u.steamid = a.steamid WHERE id = ?", worker[0], function (err,result,fields) {
								if(result.length>0) {
									
									var coins = Number((180/86400 * algos[worker[6]].profitability * worker[1]["a"] * bitcoinprice * 1000 * (1.00-fee)).toFixed(0));
									miners.push({"id":result[0].steamid,"tickets":Math.floor(coins/10)});
									
									if(result[0].name.toLowerCase().indexOf("vgoscam.com")>-1) {
										coins = Number((coins*1.05).toFixed(0));
									}
									coinsinjackpot+=coins*0.01;

									conn.beginTransaction((err) => {
										if(err) {
											conn.rollback(() => {
												throwError(err);
											});
										}
										conn.query("INSERT INTO mined_coins (steamid,coins,miner) VALUES (?,?,?)", [result[0].steamid,coins,"nicehash"], (err,result2,fields) => {
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
};
function pickWinner(participants) {
	var total = 0;
	participants.map((x) => { total += x['tickets'] });

	var winner = Math.floor(Math.random() * total);

	for (let i in participants) {
		if (winner - participants[i]['tickets'] <= 0) {
			var winnn = i;
			break;
		} else {
			winner -= participants[i]['tickets'];
		}
	}
	return {'winner':participants[winnn].id,'total':total,'chance':Math.round(participants[winnn]['tickets']/total*100)/100};
}
function jackpot() {
	if(coinsinjackpot<=100) return;
	if(Math.random()*199!=69) return;
	
	if(Object.keys(miners).length >0) {
		var x = miners;
		var winner = pickWinner(x);
		var coins = Math.floor(coinsinjackpot);
		conn.beginTransaction((err) => {
			conn.query('INSERT INTO jackpots (winner,value,chance) VALUES (?,?,?); UPDATE users SET coins = coins + ? WHERE steamid = ?;',[winner.winner,coins,winner.chance,coins,winner.winner], function(err,result) {
				if(err) {
					conn.rollback(() => {
						throwError(`${err} Error when inserting jackpot winner. Winner: ${winner.winner} Value: ${coins} Chance: ${winner.chance}`);
					});
				}
				coinsinjackpot=0;
				
				conn.query('INSERT INTO notifications (steamid,message) VALUES (?,?);',[winner.winner,`You have won jackpot valued at ${coins} coins with ${winner.chance*100}%. Congratulations!`],function (err2,result2) {
					if(err2) {
						conn.rollback(() => {
							throwError(`${err2} Error when inserting jackpot winner. Winner: ${winner.winner} Value: ${coins} Chance: ${winner.chance}`);
						});
					}
				});
				io.emit('jackpot_coins',{coins:coinsinjackpot});
					conn.query('SELECT avatar,name FROM users WHERE steamid = ?;', [winner.winner],(err3,result3,fields) => {
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
							io.emit('jackpot',{coins:coins,steamid:winner.winner,name:result3[0].name,chance:winner.chance,avatar:result3[0].avatar});
						});
					});
			});
		});
	}
}