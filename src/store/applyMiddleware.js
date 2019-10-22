// const applyMiddleware = (...middlewares) => {
//   // 返回一个重写的createStore方法
//   return function rewriteCreateStoreFn(oldCreateStore) {
//     // 返回重新写的createStore
//     return function newCreateStore(reducer, initState) {
//       // 1. 生成store
//       const store = oldCreateStore(reducer, initState);

//       // 2.给每个 middleware 传下store,相当于 
//       // const logger = loggerMiddleware(store);
//       // const exception = exceptionMiddleware(store);
//       // const time = timeMiddleware(store);
//       const chain = middlewares.map(middleware => middleware(store));

//       // 3.实现 exception(time((logger(dispatch))))
//       let dispatch = store.dispatch;
//       dispatch = chain.reduceRight((a, b) => b(a), dispatch);

//       // 4.重写dispatch
//       store.dispatch = dispatch;

//       return store;
//     }
//   }
// }
/**
 * applyMiddleware目的是改写store，返回值是一个新的store
 */
const applyMiddleware = (...middlewares) => oldCreateStore => (reducer, initState) => {
  // 1. 生成store
  const store = oldCreateStore(reducer, initState);

  // 2.给每个 middleware 传下store,相当于 
  // const logger = loggerMiddleware(store);
  // const exception = exceptionMiddleware(store);
  // const time = timeMiddleware(store);
  const chain = middlewares.map(middleware => middleware(store));

  // 3.实现 exception(time((logger(dispatch))))
  let dispatch = store.dispatch;
  dispatch = chain.reduceRight((a, b) => b(a), dispatch);

  // 4.重写dispatch
  store.dispatch = dispatch;

  return store;
}

export default applyMiddleware;