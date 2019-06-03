// auth.js

import Taro from '@tarojs/taro'
import { insertToken , changeAppOnLaunch } from '../store/userLogin/action'
//获取数据
export default class Auth {
  //app授权
  static appCheckAuth(){
    return new Promise(function (resolve) {
      // new 检查是否有token和（用户信息？)
      Taro.checkSession().then(async ()=>{
        //未过期检查token是否有效,获取token
        let flag = await getAuthToken();
        await checkToken(resolve, flag);
      }).catch(async ()=> {
        let flag = await getAuthToken();
        await checkToken(resolve, flag);
      })
    })
  }

  //获取token
  static getToken(){
    let token = Taro.getStorageSync('token');
    return token.token ? true : false;
  }
}

//授权用户 token
async function checkToken(resolve, flag){
  //判断是否 token 请求成功
  if( flag ) {
    //更新app状态
    // Taro.setStorage({key:'userLogin',data: true});
    // Taro.$store.dispatch(changeAppOnLaunch());
    // resolve(true);
  }else{
    //提示
    Taro.showToast({
        title : '获取授权信息失败' ,
        icon : 'none' ,
        mask : true
    })
    // resolve(false);
  }
}


//授权用户 token
async function getAuthToken(){
    Taro.showLoading({
      title: '加载中',
    })
    const state = Taro.$store.getState();
    //login
    let res = await Taro.login();
    //获取token
    let response = await Taro.request({
      url : 'https://archetype.kmtongji.com/login' ,
      data : {
        code : res.code
      } ,
      method : 'POST',
      success(rst){
        Taro.hideLoading();
        if(rst.data.code === 0) {
          // Taro.navigateTo({
          //   url: "../home/index"
          // })
        }
      },
      fail(erro) {
        // Taro.navigateTo({
        //   url: '/pages/list/index'
        // })
      }
    })
    //判断是否成功
    if( response.data && response.data.token ){
      //写入token
      let token = response.data.token;
      //写入状态管理
      Taro.$store.dispatch(insertToken(token));
      //写入缓存
      Taro.setStorageSync('token',token)
      return true;
    }else{
      return false;
    }
}
