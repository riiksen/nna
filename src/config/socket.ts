import * as socketio from 'socket.io';
import app from '../main';

const io = socketio(app);

io.on('connection', (socket: socketio.Socket) => {
  console.log('socket connected');
});

export default io;