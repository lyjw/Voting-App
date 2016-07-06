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

  io.on('connection', (socket) => {
    // When a client connects, this event listener will emit the current state
    // so that the client can sync their client-side state to the latest server
    // state immediately
    socket.emit('state', store.getState().toJS());

    // Dispatch actions directly into the Redux store, where the store calls
    // the reducer and the reducer's logic is executed. The Store updates
    // the state based on the reducer's return value and executes the
    // listener function subscribed by the server.

    // Here, the server emits a 'state' event, so all connected clients receive
    // the new state
    socket.on('action', store.dispatch.bind(store));
  });
}
