import * as types from '@/store/actionType';

function changeState({ type, color, fontSize}, state) {
  switch(type) {
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

export default changeState