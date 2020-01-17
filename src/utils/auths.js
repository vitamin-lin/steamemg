// auth.js

import Taro from '@tarojs/taro'
import { insertToken , changeAppOnLaunch } from '../store/userLogin/action'
import API from '../service/api'
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
    resolve(true);
  }else{
    //提示
    // Taro.showToast({
    //     title : '获取授权信息失败' ,
    //     icon : 'none' ,
    //     mask : true
    // })
    resolve(false);
  }
}


//授权用户 token
async function getAuthToken(){
    Taro.showLoading({
      title: '加载中',
    })

    API.get('api/orders', {
      status: '全部',
      page: 1
    }).then(res => {
      Taro.hideLoading();
      if(res.data.code === '20000') {
        return true;
      } else if((res.data.code === '50010' || res.data.code === '50012' || res.data.code === '50014')){
        return false;
      }
    })
}
