import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import UserHeader from './userHeader/userHeader'
import Policy from './policy'
import Panel from '../../components/panel'
import biaoqian from '../../assets/images/biaoqian.png'
import quan from '../../assets/images/quan.png'
import './index.scss'
import withShare from '../../utils/withSare'
import Logins from '../../components/login/index'

@withShare()
class User extends Component {
  config = {
    navigationBarTitleText: '个人中心'
  }
  state = {
    userInfo: '',
    userLogin: false,
    id: 0
  }

  static propTypes = {}

  constructor() {
    super(...arguments)
  }

  Login = () => {
    Taro.navigateTo({
      url: '/pages/userInfo/index'
    })
  }

  links() {
    const app = getApp()
    app.km.track('allorder', null)
    Taro.setStorage({ key: 'id', data: 0 })
    Taro.navigateTo({
      url: '/pages/order/index?id=0'
    })
  }

  getAddress() {
    const app = getApp()
    app.km.track('address', null)
    const _this = this
    Taro.chooseAddress({
      success(res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      },
      complete(res) {
        console.log(res.errMsg)
        if (res.errMsg === 'chooseAddress:cancel') {
          // _this.showToastMsg('用户未选择地址信息')
        } else if (
          res.errMsg == 'chooseAddress:fail authorize no response' ||
          res.errMsg == 'chooseAddress:fail auth deny'
        ) {
          Taro.showToast({
            title:
              '请点击小程序右上角“...” 》关于好奇官方精品商城》“...” 》设置》授权通讯地址',
            icon: 'none',
            duration: 3500
          })
        }
      }
    })
  }

  showToastMsg(msg, type) {
    Taro.showToast({
      title: msg ? msg : '',
      icon: type ? type : 'none'
    })
  }

  getCoupons() {
    const app = getApp()
    app.km.track('coupons', null)
    Taro.navigateTo({
      url: '/pages/coupons/index?type=1'
    })
  }

  onChangeId(e) {
    // console.warn(e)
    this.setState({
      id: e
    })
  }

  componentDidShow() {
    let userLogin = Taro.getStorageSync('userLogin')
    let userInfo = Taro.getStorageSync('userInfo')
    if (userLogin) {
      this.setState({
        userInfo: userInfo,
        userLogin: userLogin
      })
    } else {
      this.setState({
        userInfo: '',
        userLogin: false
      })
    }
  }

  onTabItemTap(item) {
    console.log(item)
    const arrTrack = ['groupnews', 'allgd', 'index', 'shoppingcart', 'personal']
    const app = getApp()
    app.km.track(arrTrack[item.index], null)
  }

  render() {
    const { id } = this.state
    const state = Taro.$store.getState()
    return (
      <View className='user'>
        <View className='user_box'>
          <UserHeader reuxState={state} />
          {/** 引入登陆授权组件 **/}
          <View className='getUser'>
            <Logins />
          </View>
          <Panel
            title='订单中心'
            changeId={id}
            className='panel_top panel_first'
            url='/pages/order/index'
          >
            <Policy onChangeId={this.onChangeId} />
          </Panel>
          <View className='panels' onClick={this.links} />
          <AtList className='panel_top address' hasBorder={false}>
            <AtListItem
              title='收货地址'
              arrow='right'
              hasBorder={false}
              thumb={biaoqian}
              onClick={this.getAddress}
              iconInfo={{
                size: 25,
                color: '#FF4949',
                customStyle: 'iconAddress'
              }}
            />
            <AtListItem
              title='我的优惠券'
              arrow='right'
              hasBorder={false}
              thumb={quan}
              onClick={this.getCoupons}
              className='quan'
              iconInfo={{
                size: 25,
                color: '#FF4949',
                customStyle: 'iconAddress'
              }}
            />
          </AtList>
          <View className='verCode'>
            <View className='codeHeader'>
              <Image
                className='erweima'
                src='https://mpmall.huggiesapp.cn/storage/wxmall/another/erweima.png'
              />
              <Text> 关注公众号 扫码免费领试用</Text>
              <Image
                className='codePic'
                src='https://mpmall.huggiesapp.cn/storage/wxmall/another/codePicnew.png'
                mode='aspectFit'
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default User
