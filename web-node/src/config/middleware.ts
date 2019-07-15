import express from 'express';

const router = express.Router(); 
const middlewares_path = '../middlewares/';

var middlewares = {
  role: require(middlewares_path+'role'),
};

export default middlewares;