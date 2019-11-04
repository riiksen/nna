import { config } from './config';

import { app, initialize as sockerInit } from './initializers';

if (!module.parent) {
  /**
   * Start Express server.
   */
  // eslint-disable-next-line
  const server = app.listen(config.port, () => {
    socketInit(server);

    // eslint-disable-next-line
    console.log(
      '  App is running at http://localhost:%d in %s mode',
      config.port,
      config.env,
    );

    // eslint-disable-next-line
    console.log(' Press CTRL-C to stop\n');
  });
}

export { app };
