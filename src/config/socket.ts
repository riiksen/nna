import * as socketio from 'socket.io';
import config from './config';
import app from '../main';

const io = socketio(app);

export default io;