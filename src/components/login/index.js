import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import API from '../../service/api'
// import saveUserInfo from '../../store/userInfo/action'
import './index.scss'

class login extends Component {

  static defaultProps = {}

  constructor() {
    super(...arguments)
    this.state = {
      logins: true
    }
  }

  componentDidShow() {
    // this.member()
  }

  // 判断是否登陆授权
  member() {
    // console.warn('11111111')
    let _this = this
    API.get('api/member').then(res => {
      if (res.code == '20000') {
        _this.setState({
          logins: true
        })

      } else if (res.code == '50011') {
        _this.setState({
          logins: false
        })
      }
    })
  }

  sendUserInfo(response) {
    API.post('api/login2', {
      iv: response.detail.iv,
      encryptedData: response.detail.encryptedData
    }).then(res => {
      const { detail } = response
      const { unionid, openid } = res.data
      /* eslint-disable */
      const app = getApp()
      /* eslint-enable */
      app.km.indentify(openid, unionid)
      saveUserInfo(detail)
      Taro.setStorage({ key: 'userInfo', data: detail.userInfo })
      Taro.navigateTo({
        url: '/pages/order/index?id=0'
      })
    })
  }


 // 授权btn
  getUserInfo(response) {
    /* eslint-disable */
    const app = getApp()
    /* eslint-enable */
    //同意
    if (response.detail.userInfo) {
      this.sendUserInfo(response)
      /* eslint-enable */
    } else {
      //拒绝,保持当前页面，直到同意
      // Taro.navigateTo({
      //   url: '/pages/order/index?id=0'
      // })
    }
  }



  render() {
    const { logins } = this.state
    return (
      <View>
        {
          !logins &&
          <View>
            <Button
              openType='getUserInfo'
              onGetUserInfo={this.getUserInfo}
              type='text'
              formType='submit'
            >
              微信登陆
            </Button>
          </View>
        }
      </View>
    )
  }
}

export default login
