import config from './config';

import app from './initializers/express';
import './initializers/sequelize';

if (!module.parent) {
  /**
   * Start Express server.
   */
  // eslint-disable-next-line
  const server = app.listen(config.port, () => {
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

export default app;
