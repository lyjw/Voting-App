import Server from 'socket.io';

export default function startServer(store) {
  // Creates a Socket.io server and HTTP server bound to port 8090
  const io = new Server().attach(8090);

  store.subscribe(
    // A listener that reads the current state, turns it into a JS object,
    // then emits it as a state event on the Socket.io server to all
    // connected clients
    () => io.emit('state', store.getState().toJS())
  );

  // When a client connects, this event listener will emit the current state
  // so that the client can sync their client-side state to the latest server
  // state immediately
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
  });
}
