// https://github.com/brickspert/blog/issues/22#coordination
// https://mp.weixin.qq.com/s?__biz=MzA5NzkwNDk3MQ==&mid=2650590370&idx=1&sn=ec936869437707cc791836b1bc8e4009&chksm=8891dc86bfe655903d6aa723417abcf1e238c95539d912c2b9fa2e5cb650e786615c3fffded5&mpshare=1&scene=1&srcid=&sharer_sharetime=1568889260830&sharer_shareid=9839e16724f9dfa5381b634b54e6f761#rd
const combineReducers = reducerObj => {
  const reducerKeys = Object.keys(reducerObj);

  // 返回合并后的新的reducer函数
  return (state = {}, action) => {
    // 定义新的state
    let nextState = {};
    let hasChanged = false; //状态是否改变
    reducerKeys.forEach(key => {
      let currentReducer = reducerObj[key];
      let preStateForkey = state[key];
      // 执行reducer,获取新的state
      let nextStateForkey = currentReducer(preStateForkey, action);
      nextState[key] = nextStateForkey;
      hasChanged = hasChanged || nextStateForkey !== preStateForkey;
    })

    return hasChanged ? nextState : state;
  }
}

export default combineReducers