import * as socketio from 'socket.io';
import * as http from 'http';

type socketOrNull = socketio.Server | null;
let socket: socketOrNull = null;

export function initialize(server: http.Server): void {
  socket = socketio(server);
}
export function io(): socketOrNull {
  return socket;
}
