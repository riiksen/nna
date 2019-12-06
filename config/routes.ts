// import * as asyncHandler from 'express-async-handler';
import * as express from 'express';

import {
  depositController,
  sessionController,
  userController,
  withdrawController,
} from '@app/controllers';

const router = express.Router();

// Session routes
router.get('/login/:provider', sessionController.login);
router.get('/login/handle/:provider', sessionController.handle);
router.post('/refreshAccessToken', sessionController.refreshAccessToken);
router.post('/logout', sessionController.logout);

// User routes
router.get('/user', userController.getUser);

// Withdraw routes
router.get('/withdraw', withdrawController.index);
router.get('/withdraw/:id', withdrawController.show);
// router.post('/withdraw', withdrawController.make);

// Deposit routes
router.get('/deposit', depositController.index);
router.get('/deposit/:id', depositController.show);
router.post('/deposit', depositController.make);

export { router };
