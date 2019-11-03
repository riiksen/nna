import * as io from 'socket.io-client';
import { expect } from './utils';
import * as applicationHelper from '../src/helpers/application.helper';

describe('Socket', (): void => {
  let socket: SocketIOClient.Socket;

  beforeEach(() => {
    socket = io(applicationHelper.rootUrlWithPort());
  });
  it('Socket client should connect to socket server', async (): Promise<void> => {
    socket.on('connect', () => {
      expect(socket.connected).to.equal(true);
    });
  });
  afterEach(() => {
    if (socket.connected) {
      socket.disconnect();
    }
  });
});
