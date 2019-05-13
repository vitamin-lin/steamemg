import { CHANGE_APP_ON_LAUNCH, INSERT_AUTHORIZE } from "./action-type";

const INITIAL_STATE ={
  //请求接口域名地址
  baseURL : 'https://www.easy-mock.com/mock/5cc59123ad97307c95f389b4/api' ,
  //应用首次加载
  appOnLaunch : true ,
  //请求token
  authorize : ''
}

export default function userLogin( state = INITIAL_STATE , action ){
  switch (action.type){
    case CHANGE_APP_ON_LAUNCH :
      return {
        ...state ,
        appOnLaunch : false
      };
    case INSERT_AUTHORIZE :
      return {
          ...state ,
        authorize : action.authorize
      };
    default :
      return state;
  }
}
