import * as crypto from 'crypto';
import * as tradeManager from '../config/expresstrade';
import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import config from '../config/config';

import Trade from '../models/trade';

export async function index(req: Request, res: Response) {
  // const withdraws = req.session.user.withdraws
  res.json({ ok: 'ok' });
}

export async function show(req: Request, res: Response) {
  const trade = await Trade.findByPk<Trade>(7);

  res.json(trade);
}

export async function make(req: Request, res: Response) {
  // const inputSchema = Joi.object({
  //   items: Joi.array()
  // }).unknown()
  //   .required()

  // const { error, value: items } = Joi.validate(process.env, inputSchema)
  // if (error) {
  //   throw new Error(`Config validation error: ${error.message}`)
  // }

  // var totalValue = 0

  // var inventory = tradeManager.IUser.getInventory()

  // items.forEach(await (item) => {

  // })
}
