import * as express from 'express';

import role from '../middlewares/role';

const router = express.Router();

const middlewares = {
  role,
};

export default middlewares;
