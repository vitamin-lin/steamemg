import * as constants from './action-type'

const devURL = 'https://test.mall.kmtongji.com/'
// const devURL = 'https://mpmall.huggiesapp.cn/'
const prodURL = 'https://mpmall.huggiesapp.cn/' // 生产环境，线上服务器

const INITIAL_STATE ={
    //请求接口域名地址
    baseURL : process.env.NODE_ENV == 'production' ? prodURL : devURL ,
    //应用首次加载
    appOnLaunch : true ,
    //请求token
    authorize : ''
}

export default function app( state = INITIAL_STATE , action ){
    switch (action.type){
        case constants.CHANGE_APP_ON_LAUNCH :
            return {
                ...state ,
                appOnLaunch : false
            };
        case constants.INSERT_AUTHORIZE :
            return {
                ...state ,
                authorize : action.authorize
            };
        default :
            return state;
    }
}