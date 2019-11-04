import * as http from 'http';
import * as socketio from 'socket.io';

type socketOrNull = socketio.Server | null;
let socket: socketOrNull = null;

export function initialize(server: http.Server): void {
  socket = socketio(server);
}
export function io(): socketOrNull {
  return socket;
}
