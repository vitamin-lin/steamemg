import Taro from '@tarojs/taro'
// import API from './api'
import { CheckLogin, reTryRequest } from './util'

function showError(message, show = true) {
  show &&
    Taro.showToast({
      title: message,
      icon: 'none'
    })
  return Promise.reject(message)
}

const customInterceptor = function(chain) {
  const requestParams = chain.requestParams
  const { showToast } = requestParams
  return chain
    .proceed(requestParams)
    .catch(res => {
      // 这个catch需要放到前面才能捕获request本身的错误，因为showError返回的也是Promise.reject
      return showError(res.errMsg, showToast)
    })
    .then(async res => {
      Taro.hideLoading()
      // 注：公用状态码，之后要统一处理
      // 只要请求成功，不管返回什么状态码，都走这个回调
      if (res.data.code === 20000) {
        return res.data
      } else if (res.data.code === '50011') {
        // 需要通过 wx.getUserInfo() 发起对用户的授权请求，从而获取用户的 UNiconid
        // Taro.navigateTo({
        //   url: '/pages/userInfo/index'
        // })
        return res.data
      } else if (res.data.code === '50010') {
        // 用户未通过wx.login 登录
        const resCL = await CheckLogin()
        // const resCL =
        console.log(resCL)
        if (resCL.code === 20000) {
          const retryRes = await reTryRequest(requestParams)
          console.log(retryRes)
          return retryRes
        }
      } else {
        showError(res.data.message, showToast)
        return res.data
      }
    })
}

const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]

export default interceptors
