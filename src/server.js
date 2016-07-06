import Server from 'socket.io';

export default function startServer() {
  // Creates a Socket.io server and HTTP server bound to port 8090
  const io = new Server().attach(8090);
}
