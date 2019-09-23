import reducer from '@/store/reducer';
import { initState } from '@/store/state';

function createStore() {
  let state = initState;
  let listeners = [];
  const getState = () => state;

  const subscribe = (fn) => {
    listeners.push(fn);

    const unsubscribe = () => {
      listeners = listeners.filter(listener => fn !== listener);
    }
    return unsubscribe;
  }

  const dispatch = action => {
    // reducer 接收老状态和action，返回一个新状态
    state = reducer(state, action);
    console.log(listeners)
    listeners.forEach(fn => fn());
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}

export default createStore