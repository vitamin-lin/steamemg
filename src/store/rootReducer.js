import { combineReducers } from "redux";
import home from "./home/reducer";
import counter from "./counter/reducer";
import user from "./user/reducer";
import userInfo from "./userInfo/reducer";
import userLogin from "./userLogin/reducer";

export default combineReducers({
  home,
  counter,
  userInfo,
  userLogin
});
