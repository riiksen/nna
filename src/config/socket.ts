import * as socketio from 'socket.io';
import app from '../main';

const io = socketio(app);

export default io;
