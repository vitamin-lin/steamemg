import { combineReducers } from 'redux'
import userLogin from './userLogin/reducer'
import GDetail from './goodDetail/reducer'

export default combineReducers({
  GDetail,
  userLogin
})
