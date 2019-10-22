const exceptionMiddleware = store => next => action => { // 记录异常中间件
  // console.log(next)
  // console.log(action)
  try {
    // loggerMiddleware(action); //  这里写死了loggerMiddleware
    next(action);
  } catch (error) {
    console.log(error)
  }
}

export default exceptionMiddleware;