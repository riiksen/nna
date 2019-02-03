import path from "path";
import express from "express";
import httpError from "http-errors";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes";
import config from "./config";

const app = express();

if (config.env === "development") {
  app.use(logger("dev"));
}

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
