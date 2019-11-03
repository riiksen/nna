import config from './config/config';

import app from './config/express';
import './config/sequelize';
import { initialize as socket_init } from './config/socket';

if (!module.parent) {
  /**
   * Start Express server.
   */
  // eslint-disable-next-line
  const server = app.listen(config.port, () => {
    socket_init(server);

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
