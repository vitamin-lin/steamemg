import { combineReducers } from 'redux'
import userInfo from './userInfo/reducer'
import userLogin from './userLogin/reducer'
import idData from './home/reducer'
import GDetail from './goodDetail/reducer'
import cOrder from './confirmOrder/reducer'
import shareGroup from './shareDetail/reducer'
import ruleDialog from './ruleDialog/reducer'

export default combineReducers({
  GDetail,
})
