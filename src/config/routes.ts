// import * as asyncHandler from 'express-async-handler';
import * as express from 'express';
import * as passport from 'passport';

import * as depositController from '../controllers/deposit.controller';
import * as withdrawController from '../controllers/withdraw.controller';
import * as sessionController from '../controllers/session.controller';
import config from '../config/config';
import middlewares from '../config/middleware';

// import { config } from './config';

const router = express.Router();

// Session routes
router.get('/login/steam', sessionController.login);
router.get('/login/steam/handle', sessionController.handle);
router.post('/logout', sessionController.logout);

// Withdraw routes
router.get('/withdraw', withdrawController.index);
router.get('/withdraw/:id', withdrawController.show);
// router.post('/withdraw', withdrawController.make);

// Deposit routes
router.get('/deposit', depositController.index);
router.get('/deposit/:id', depositController.show);
router.post('/deposit', depositController.make);

// Example to test role middleware
router.get('/admin', [middlewares.role('admin')], withdrawController.index);

export default router;
