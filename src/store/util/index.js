// https://github.com/brickspert/blog/issues/22#coordination
const combineReducers = reducerObj => {
  const reducerKeys = Object.keys(reducerObj);
  
  // 返回合并后的新的reducer函数
  return (state = {}, action) => {
    // 定义新的state
    const nextState = {};
    reducerKeys.forEach(key => {
      let currentReducer = reducerObj[key];
      const preState = state[key];
      // 执行reducer,获取新的state
      let nextStateForkey = currentReducer(preState, action);
      nextState[key] = nextStateForkey;
    })

    return nextState;
  }
}

export {
  combineReducers
}