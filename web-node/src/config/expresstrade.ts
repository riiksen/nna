import config from "./config"
import { getConnection } from "typeorm"
import Trade from "../entities/trade"

const ExpressTrade = require("expresstrade")

const tradeManager = new ExpressTrade({
  apikey: config.opSkinsApiKey,
  twofactorsecret: config.opSkinsTwoFactorSecret,
  pollInterval: 5000
})

tradeManager.on('offerReceived', (offer: any) => {
  tradeManager.ITrade.CancelOffer({ offer_id: offer.id })
})

// tradeManager.on('any', (event: any, offer: any) => {});

tradeManager.on('any', async (event: any, offer: any) => {
  if (offer["sent_by_you"] && offer["state"] != 2) {
    const trade = await connection.getRepository(Trade).findOne({ id: offer.id })
    switch (offert.state) {
      case 3: { // STATE_ACCEPTED
        log() // TODO(mike)
        trade.finalaize()
      }
      case 5: // STATE_EXPIRED
      case 6: // STATE_CANCELED
      case 7: // STATE_DECLINED
      case 8: { // STATE_INVALID_ITEMS

      }
    }
  }
})

export default tradeManager

