import * as http from 'http';
import * as socketio from 'socket.io';

let socket: socketio.Server;

export function initialize(server: http.Server): void {
  socket = socketio(server);
}
export function io(): socketio.Server {
  return socket;
}
