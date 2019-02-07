import config from "./config/config";

import app from "./config/express";

if (!module.parent) {
  /**
   * Start Express server.
   */
  const server = app.listen(config.port, () => {
    console.log(
      "  App is running at http://localhost:%d in %s mode",
      config.port,
      config.env,
    );
    console.log(" Press CTRL-C to stop\n")
  });
}

export default app;
