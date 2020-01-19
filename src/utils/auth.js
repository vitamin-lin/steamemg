// auth.js

import Taro from '@tarojs/taro'
import { insertToken , changeAppOnLaunch } from '../store/userLogin/action'
import config from '../service/config'
//获取数据
export default class Auth {
//app授权
static appCheckAuth(){
    return new Promise(function (resolve) {
        const state = Taro.$store.getState();
        // console.warn(state.userLogin.appOnLaunch, 'asd')
        //如果有授权信息
        if( Auth.checkAuth() && !state.userLogin.appOnLaunch ){
            //直接返回
            resolve(true);
        }else{
            //判断session_key是否过期
            Taro.checkSession().then(async ()=>{
                //未过期检查token是否有效
                if( !Auth.checkAuth() ){
                    //判断是否 token 请求成功
                    let flag = await getAuthToken();
                    if( flag ) {
                        //更新app状态
                        Taro.$store.dispatch(changeAppOnLaunch());
                        resolve(true);
                    }else{
                        //提示
                        Taro.showToast({
                        title : '获取授权信息失败' ,
                        icon : 'none' ,
                        mask : true
                        })
                    }
                }else{
                    //更新app状态
                    Taro.$store.dispatch(changeAppOnLaunch());
                    //token 没有过期，直接返回
                    resolve(true);
                }
            }).catch(async (err)=> {
                console.log(err);
                let flag = await getAuthToken();
                console.warn(flag, 'flag')
                //判断是否 token 请求成功
                if( flag ) {
                    //更新app状态
                    Taro.$store.dispatch(changeAppOnLaunch());
                    resolve(true);
                }else{
                    //提示
                    Taro.showToast({
                        title : '获取授权信息失败' ,
                        icon : 'none' ,
                        mask : true
                    })
                }
            })
        }
    })
}
    
    // 检查令牌是否有效 true--> 有效  false--> 无效
    static checkAuth(){
        const state = Taro.$store.getState();
        //从缓存读取授权信息
        let data = state.data || Taro.getStorageSync('data') || {},
            expiryTime = 0,
            nowTime = ~~(Date.now() / 1000);
    
        if (data.exp) {
            expiryTime = data.ttl;
        }
    
        return expiryTime - nowTime > 300;
    }

    //获取token
    static getToken(){
        const state = Taro.$store.getState();
        let data = state.data || Taro.getStorageSync('data');
        return data.token;
    }
}

//授权用户 token
async function getAuthToken(){
    const state = Taro.$store.getState();
    //login
    let res = await Taro.login();

    //获取token
    let response = await Taro.request({
        url : `${config}api/login1` ,
        data : {
            code : res.code 
        } ,
        method : 'POST'
    })
    //判断是否成功
    if( response.code === 20000 ){
        console.warn(response, '返回')
        //写入token
        let data = response.data;
        saveAuthToken(data);
        return true;
    }else{
        console.log('获取token失败');
        return false;
    }
}

//写入信息
function saveAuthToken (data) {
    console.warn(data)
    // //写入状态管理
    // Taro.$store.dispatch(insertToken(data));
    //写入缓存
    Taro.setStorageSync('token',data.token)
}