import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer(store);

// Load store with movie entires
store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});

// Start the vote
store.dispatch({type: 'NEXT'});
