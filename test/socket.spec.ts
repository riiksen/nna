import * as io from 'socket.io-client';
import { expect } from './utils';
import * as applicationHelper from '../src/helpers/application.helper';

describe('Socket', (): void => {
  it('Socket client should connect to socket server', (): void => {
    const socket = io(applicationHelper.rootUrlWithPort());

    expect(socket.connected).to.equal(true);
  });
});
