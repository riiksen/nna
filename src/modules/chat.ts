const rooms: string[] = [
  'english', 'polish',
];

let chat = {};

export function joinRoom(socket: SocketIO.Socket, room: string): void {
  if(!rooms[room]) socket.emit('error', 'This room does not exist');
  socket.join(room);
}
export function sendMessage(socket: SocketIO.Socket, room: string, message: string): object {
  if(!rooms[room]) socket.emit('error', 'This room does not exist');
  socket.emit('chat-message',
    {
      'room': room,
      'message': message,
    }
  );
}

export function getMessages(room: string): Object[] {
  if(!chat[room]) chat[room] = new Array();
  return chat[room];
}
