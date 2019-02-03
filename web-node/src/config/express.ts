import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import httpError from "http-errors";
import logger from "morgan";
import methodOverride from "method-override";
import * as path from "path";

import routes from "./routes";
import config from "./config";

const app = express();

if (config.env === "development") {
  app.use(logger("dev"));
}

var distDir = "../../dist/";

// Set up static folder and send index.html for all requests that don't have api in it
app.use(express.static(path.join(__dirname, distDir)));
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, distDir + "index.html"));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// Secure apps by setting various HTTP headers
app.use(helmet());

// Enable CORS - Cross Origin Resource Sharing
app.use(cors());

// API router
app.use("/api/", routes);

export default app;
