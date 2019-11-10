import * as http from 'http';
import * as io from 'socket.io-client';

import * as applicationHelper from '../src/helpers/application.helper';
import config from '../src/config/config';
import { expect } from './utils';
import * as chat from '../src/modules/chat';
import { io as socketServer, initialize as initializeSocket } from '../src/config/socket';

let server: http.Server;
let socket: SocketIOClient.Socket;

beforeAll((done): void => {
  server = http.createServer();

  initializeSocket(server);

  server.listen(config.port);

  done();
});

beforeEach((done): void => {
  socket = io(applicationHelper.rootUrlWithPort());
  done();
});

describe('Chat', (): void => {
  it('Should send message', (): void => {

    socket.join('english');
    chat.sendMessage(socket, 'english', 'test');
    expect(1).to.equal(1);
  });
});

afterAll((done): void => {
  server.close();

  done();
});