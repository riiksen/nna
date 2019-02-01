var id = '127.0.0.1:3000';
var socket = io.connect(id);

socket.on('connect', () => {
  console.log(window.socket.id);
  $.ajax({
    url: '/loginToSocket',
    method: 'POST',
    data: { "socketId": window.socket.id },
    dataType: "text",
    success: function(data) {
      console.log(window.socket.id);
    },
    error: function(a, b, c) {
      console.log(a);
      console.log(b);
      console.log(c);
    }
  });
});
