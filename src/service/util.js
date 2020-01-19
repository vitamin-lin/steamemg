import Taro from '@tarojs/taro'
import API from './api'

export function getCurrentPageUrlWithArgs() {
  const pages = Taro.getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const url = currentPage.route
  const options = currentPage.options
  let urlWithArgs = `/${url}?`
  for (let key in options) {
    const value = options[key]
    urlWithArgs += `${key}=${value}&`
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
  // console.log(urlWithArgs)

  return urlWithArgs
}

export async function reTryRequest(params) {
  const { data, url, method } = params
  // console.log(success)
  const req = API.baseOptions({ data, url }, method)
  const res = await req
  return res
}

export function CheckLogin() {
  return new Promise(function(resolve, reject) {
    Taro.login({
      success: res => {
        var code = res.code
        if (code) {
          API.post('api/login1', { code: code }).then(response => {
            /* eslint-disable */
            const { openid, unionid, token } = response.data
            const app = getApp()
            /* eslint-enable */
            Taro.setStorageSync('token', token)
            // Taro.setStorageSync('expInfo', {
            //   startTime: new Date().getTime(),
            //   ttl
            // })
            console.log(response)
            resolve(response)

            // let curPath = getCurrentPageUrlWithArgs()
            // console.log(curPath)
            // if (curPath.indexOf('pages/home/index') > -1) {
            //   reTryRequest(req)
            // } else {
            //   Taro.reLaunch({
            //     url: curPath
            //   })
            // }
            // const { params } = Taro.$router
          })
        } else {
          console.log('获取用户登录失败：' + res.errMsg)
          reject(res.errMsg)
        }
      }
    })
  })
}
