// import * as asyncHandler from 'express-async-handler';
import * as express from 'express';
import * as passport from 'passport';

import {
  depositController,
  withdrawController,
  sessionController,
} from '@app/controllers';

const router = express.Router();

// Session routes
router.get('/login/steam',passport.authenticate('steam', { session: false }), sessionController.login);
router.get('/login/handle/steam', passport.authenticate('steam', { session: false }), sessionController.handle);
router.post('/logout', sessionController.logout);
router.get('/refreshAccessToken', sessionController.refreshAccessToken);
router.get('/getUser', sessionController.getUser);

// Withdraw routes
router.get('/withdraw', withdrawController.index);
router.get('/withdraw/:id', withdrawController.show);
// router.post('/withdraw', withdrawController.make);

// Deposit routes
router.get('/deposit', depositController.index);
router.get('/deposit/:id', depositController.show);
router.post('/deposit', depositController.make);

export { router };
