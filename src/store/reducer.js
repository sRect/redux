import * as types from '@/store/actionType';
import { combineReducers } from './util'

// InfoReducer 接收的 state 是 state.info
const InfoReducer = (state, action) => {
  switch (action.type) {
    case types.CHANGE_COLOR:
      return {
        ...state,
        color: action.color
      };
    case types.CHANGE_FONT:
      return {
        ...state,
        fontSize: action.fontSize
      };
    default:
      return state;
  }
}

// counterReducer 接收的 state 是 state.counter
function counterReducer(state, action) {
  switch (action.type) {
    case types.INCREMENT:
      return {
        count: state.count + 1
      }
    case types.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state;
  }
}

const reducer = combineReducers({
  counter: counterReducer,
  info: InfoReducer
});

console.log(reducer)

export default reducer;