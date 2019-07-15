import bodyParser from 'body-parser'
import compress from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import httpError from 'http-errors'
import logger from 'morgan'
import methodOverride from 'method-override'
import * as path from 'path'
import session from 'express-session'

import routes from './routes'
import passport from './passport'
import config from './config'

const app = express()

if (config.env === 'development') {
  app.use(logger('dev'))
}

var publicDir = '../../public/'

app.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true,
}))

// Load passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set up static folder and send index.html for all requests that don't have api in it
app.use(express.static(path.join(__dirname, publicDir)))
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, publicDir + 'index.html'))
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(compress())
app.use(methodOverride())

// Secure apps by setting various HTTP headers
app.use(helmet())

// Enable CORS - Cross Origin Resource Sharing
app.use(cors())

// API router
app.use('/api/', routes)

export default app
