const loggerMiddleware = store => next => action => { // 记录日志中间件
  console.log('this state', store.getState());
  console.log('action', action);
  next(action);
  console.log('next state', store.getState());
}

export default loggerMiddleware;