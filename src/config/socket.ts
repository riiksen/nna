import * as socketio from 'socket.io';

let socket: socketio.Server | undefined;

export function initialize(server: any) {
  socket = socketio(server);
}

export default socket;