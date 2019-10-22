import { initState } from '@/store/state';
import reducer from '@/store/reducer';

function createStore(reducer) {
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

const store = createStore(reducer);
const next = store.dispatch;

const loggerMiddleware = action => { // 记录日志中间件
  console.log('this state', store.getState());
  console.log('action', action);
  next(action);
  console.log('next state', store.getState());
}

const exceptionMiddleware = action => { // 记录异常中间件
  try {
    loggerMiddleware(action);
  } catch (error) {
    console.log(error)
  }
}

// 重写store.dispatch（记录日志，记录异常）
// store.dispatch = (action) => {
//   try {
//     loggerMiddleware(action);
//   } catch (error) {
//     console.log(error)
//   }
// }

store.dispatch = exceptionMiddleware;

export default store;