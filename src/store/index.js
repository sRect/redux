import reducer from '@/store/reducer';

function createStore() {
  let state = {
    color: 'black',
    fontSize: '30px'
  };

  const getState = () => state;
  const dispatch = action => {
    // reducer 接收老状态和action，返回一个新状态
    state = reducer(state, action)
  }
  

  return {
    getState,
    dispatch
  }
}

export default createStore