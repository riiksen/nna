import express from 'express';

const router = express.Router(); 
const middlewares_path = '../middlewares/';

var middlewares = {
  test: require(middlewares_path+'test'),
};

export default middlewares;