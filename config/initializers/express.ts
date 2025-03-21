import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
// import * as httpError from 'http-errors';
import * as logger from 'morgan';
import * as methodOverride from 'method-override';

import { config } from '../config';
import { passport } from './passport';
import { router as routes } from '../routes';

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

// Load passport middleware
app.use(passport.initialize());

// We still need it to get cookie using req.cookie
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compress());
app.use(methodOverride());

// Secure apps by setting various HTTP headers
app.use(helmet());

// Enable CORS - Cross Origin Resource Sharing
app.use(cors());

// API router
app.use('/api/user/', passport.authenticate('jwt', { session: false }));
app.use('/api/', routes);

export { app };
