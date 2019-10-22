import { initState } from '@/store/state';
import reducer from '@/store/reducer';
import exceptionMiddleware from '@/store/middleware/exceptionMiddleware'; 
import loggerMiddleware from '@/store/middleware/loggerMiddleware';
import timeMiddleware from '@/store/middleware/timeMiddleware';
import applyMiddleware from '@/store/applyMiddleware';

function createStore(reducer, initState) {
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
    listeners.forEach(fn => fn());
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}

// const store = createStore(reducer, initState);
const newCreateStore = applyMiddleware(exceptionMiddleware, timeMiddleware, loggerMiddleware)(createStore);
const store = newCreateStore(reducer, initState);
// const next = store.dispatch;

// const logger = loggerMiddleware(store);
// const exception = exceptionMiddleware(store);
// const time = timeMiddleware(store);
// store.dispatch = exception(time(logger(next)));

export default store;