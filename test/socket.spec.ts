import * as io from 'socket.io-client';
import * as http from 'http';
import { expect } from './utils';
import * as applicationHelper from '../src/helpers/application.helper';
import { io as socketServer, initialize as initializeSocket } from '../src/config/socket';
import config from '../src/config/config';

describe('Socket', (): void => {
  let socket: SocketIOClient.Socket;

  beforeEach((done): void => {
    if (socketServer() === null) {
      const server = http.createServer();
      initializeSocket(server);

      server.listen(config.port);
    }

    socket = io(applicationHelper.rootUrlWithPort());
    done();
  });
  it('Socket client should connect to socket server', (done): void => {
    socket.on('connect', (): void => {
      expect(socket.connected).to.equal(true);
      done();
    });
  });
  afterEach((done): void => {
    if (socket.connected) {
      socket.disconnect();
    }
    done();
  });
});
