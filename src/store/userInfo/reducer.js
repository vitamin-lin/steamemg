import { SAVEUSERINFO } from "./action-type";

const INITIAL_STATE = {
  detail: []
};

export default function userInfo(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVEUSERINFO:
      return {
        ...state,
        detail: action.data
      };
    default:
      return state;
  }
}
