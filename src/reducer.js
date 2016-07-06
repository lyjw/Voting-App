import {setEntries, next, vote, INITIAL_STATE} from './core';

// The reducer delegates to one of the core functions based
// on the type of action
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_ENTRIES':
    return setEntries(state, action.entries);
  case 'NEXT':
    return next(state);
  case 'VOTE':
    return vote(state, action.entry)
  }

  // If the action is not recognized, the current state is returned
  return state;
}
