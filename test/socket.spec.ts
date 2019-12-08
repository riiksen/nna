import * as http from 'http';
import { AddressInfo } from 'net';
import * as io from 'socket.io-client';

import { rootUrl } from '@app/helpers/application.helper';
import { initialize as initializeSocket } from '@config/initializers';

let server: http.Server;

beforeAll((done): void => {
  server = http.createServer();
  initializeSocket(server);

  server.listen(0);

  done();
});

describe('Socket', (): void => {
  let socket: SocketIOClient.Socket;

  beforeEach((done): void => {
    const { port } = server.address() as AddressInfo;
    socket = io(`${rootUrl()}:${port}`);

    done();
  });

  it('Socket client should connect to socket server', async (done): Promise<void> => {
    socket.on('connect', (): void => {
      expect(socket.connected).toEqual(true);
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
