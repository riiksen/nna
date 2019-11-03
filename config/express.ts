import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
// import * as httpError from 'http-errors';
import * as logger from 'morgan';
import * as methodOverride from 'method-override';
import * as session from 'express-session';

import config from './config';
import passport from './passport';
import routes from './routes';

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

app.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true,
  cookie: {
    path: '/', httpOnly: false, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000,
  },
}));

// Load passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser(config.sessionSecret));
app.use(compress());
app.use(methodOverride());

// Secure apps by setting various HTTP headers
app.use(helmet());

// Enable CORS - Cross Origin Resource Sharing
app.use(cors());

// API router
app.use('/api/', routes);

export default app;
