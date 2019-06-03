import { CHANGE_APP_ON_LAUNCH, INSERT_AUTHORIZE } from "./action-type";

//更改登录状态
export const changeAppOnLaunch = () => ({
    type : CHANGE_APP_ON_LAUNCH
})

//写入请求token
export const insertToken = (token) => ({
    type : INSERT_AUTHORIZE ,
    token
})
