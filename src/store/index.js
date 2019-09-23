import * as types from '@/store/actionType';

function createStore() {
  let state = {
    color: 'black',
    fontSize: '30px'
  };

  const getState = () => state;
  const changeState = ({ type, color, fontSize }) => {
    switch (type) {
      case types.CHANGE_COLOR:
        return {
          ...state,
          color: color
        };
      case types.CHANGE_FONT:
        return {
          ...state,
          fontSize: fontSize
        };
      default:
        return state;
    }
  }
  

  return {
    getState,
    changeState
  }
}

export default createStore