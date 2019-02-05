const ExpressTrade = require("expresstrade");

import config from "./config";

const tradeManager = new ExpressTrade({
  apikey: '',
  twofactorsecret: '',
  pollInterval: 5000
});

tradeManager.on('offerReceived', (offer: any) => {
  tradeManager.ITrade.CancelOffer({ offer_id: offer.id });
});

// tradeManager.on('any', (event: any, offer: any) => {});

export default tradeManager;

