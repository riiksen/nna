import * as io from 'socket.io-client';
import { expect } from './utils';
import * as applicationHelper from '../src/helpers/application.helper';

describe('Socket', (): void => {
  let socket: SocketIOClient.Socket;

  beforeEach((done): void => {
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
