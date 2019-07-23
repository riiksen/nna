import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
// import * as httpError from 'http-errors';
import * as logger from 'morgan';
import * as methodOverride from 'method-override';
import * as path from 'path';
import * as session from 'express-session';

import routes from './routes';
import passport from './passport';
import config from './config';

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
};

const publicDir = '../../public/';

app.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true,
  cookie: {path: '/', httpOnly: true, secure: false, maxAge:7*24*60*60*1000 },
}));

// Load passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set up static folder and send index.html for all requests that don't have api in it
app.use(express.static(path.join(__dirname, publicDir)));
app.use(/^((?!(api)).)*/, (req: express.Request, res: express.Response): void => {
  res.send(`${req.isAuthenticated()} <br/><br/>${JSON.stringify(req.user)}`);
  //res.sendFile(path.join(__dirname, `${publicDir}index.html`));
});

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
