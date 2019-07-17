// import * as asyncHandler from 'express-async-handler';
import * as express from 'express';

import * as depositController from '../controllers/deposit.controller';
import * as withdrawController from '../controllers/withdraw.controller';
import * as sessionController from '../controllers/session.controller';
// import { config } from './config';

const router = express.Router();

// Session routes
router.get('/login/:provider', sessionController.login);
router.get('/login/hanlde/:provider', sessionController.handle);
router.post('/logout', sessionController.logout);

// Withdraw routes
router.get('/withdraw', withdrawController.index);
router.get('/withdraw/:id', withdrawController.show);
// router.post('/withdraw', withdrawController.make);

// Deposit routes
router.get('/deposit', depositController.index);
router.get('/deposit/:id', depositController.show);
router.post('/deposit', depositController.make);

export default router;
