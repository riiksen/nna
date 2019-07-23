import * as express from 'express';

import role from '../middlewares/role';

const router = express.Router(); 

var middlewares = {
  role: role,
};

export default middlewares;