import * as http from 'http';
import * as io from 'socket.io-client';

import * as applicationHelper from '../src/helpers/application.helper';
import config from '../src/config/config';
import { io as socketServer, initialize as initializeSocket } from '../src/config/socket';
import { expect } from './utils';

let server: http.Server;

beforeAll((done): void => {
  server = http.createServer();
  initializeSocket(server);
  
  server.listen(config.port);

  done();
});

describe('Socket', (): void => {
  let socket: SocketIOClient.Socket;

  beforeEach((done): void => {
    socket = io(applicationHelper.rootUrlWithPort());
    done();
  });

  it('Socket client should connect to socket server', async (done): Promise<void> => {
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

afterAll((done): void => {
  if (server) {
    server.close();
  }
  done();
});
