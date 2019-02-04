import express from "express";
import asyncHandler from "express-async-handler";

import * as depositController from "../controllers/deposit.controller";
import * as withdrawController from "../controllers/withdraw.controller";
import config from "../config/config";

const router = express.Router(); // eslint-disable-line new-cap

// Withdraw routes
router.get('/withdraw', withdrawController.index);
router.get('/withdraw/:id', withdrawController.show);
router.post('/withdraw', withdrawController.make);

// Deposit routes
router.get('/deposit', depositController.index);
router.get('/deposit/:id', depositController.show);
router.post('/deposit', depositController.make);

export default router;
