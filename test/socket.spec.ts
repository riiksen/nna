import * as io from 'socket.io-client';
import { expect } from './utils';
import * as applicationHelper from '../src/helpers/application.helper';

describe('Socket', (): void => {
  let socket: SocketIOClient.Socket;

  beforeEach((): void => {
    socket = io(applicationHelper.rootUrlWithPort());
  });
  it('Socket client should connect to socket server', async(done): Promise<void> => {
    socket.on('connect', (): void => {
      expect(socket.connected).to.equal(true);
      done();
    });
  });
  afterEach((): void => {
    if (socket.connected) {
      socket.disconnect();
    }
  });
});
