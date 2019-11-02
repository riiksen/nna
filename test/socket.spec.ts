import { expect } from './utils';
import io from 'socket.io-client';
import config from '../src/config/config';

describe('Socket', (): void => {
  it('Socket client should connect to socket server', async (): Promise<void> => {
    let socket = io(`http://localhost:${config.port}`);
  });
});
