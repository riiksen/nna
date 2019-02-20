import crypto from "crypto";
import tradeManager from "../config/expresstrade"
import Joi from "joi";
import { Request, Response, NextFunction } from "express";

import config from "../config/config";

export async function index(req: Request, res: Response) {
  const withdraws = req.session.user.withdraws;
}

export async function show(req: Request, res: Response) {

}

export async function make(req: Request, res: Response) {
  const inputSchema = Joi.object({
    items: Joi.array()
  }).unknown()
    .required();

  const { error, value: items } = Joi.validate(process.env, inputSchema);
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  var totalValue = 0;

  var inventory = tradeManager.IUser.getInventory();

  items.forEach(await (item) => {

  });
}
