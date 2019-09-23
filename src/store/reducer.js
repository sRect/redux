import * as types from '@/store/actionType';

const reducer = (state, action) => {
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

export default reducer;