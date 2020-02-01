import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import UserHeader from './userHeader/userHeader'
import withShare from '../../utils/withSare'
import './index.scss'

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
  }

  // 我的收藏
  goTomyCollection() {
    Taro.navigateTo({
      url:'/pages/myCollection/index'
    })
  }

  // 我的成就
  goTomyachievement() {
    Taro.navigateTo({
      url:'/pages/myAchievement/index'
    })
  }


  // 我的记录
  goTomyRecord() {
    Taro.navigateTo({
      url:'/pages/myRecord/index'
    })
  }

  // 客服
  goToService() {
    Taro.navigateTo({
      url:'/pages/serviceas/index'
    })
  }

  showToastMsg(msg, type) {
    Taro.showToast({
      title: msg ? msg : '',
      icon: type ? type : 'none'
    })
  }

  onTabItemTap(item) {
    Taro.setStorageSync('items', item)
  }

  componentDidMount() {
    // API.get('api/member').then(res => {
    //   if (res.code == 20000) {
    //   }
    // })
    
  }

  componentDidShow() {
    // myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
    var myDate = new Date();//获取系统当前时间
    console.warn(myDate.getDay())
  }

  render() {
    const { id } = this.state
    const state = Taro.$store.getState()


    return (
      <View className='user'>
        <View className='user_box'>
          <UserHeader/>
          {/** 引入登陆授权组件 **/}
          {
            /**
            <View className='getUser'>
              <Logins />
            </View>
            **/
          }

          <View className='panels' onClick={this.links} />
          <View className='main'>
            <AtList className='panel_top address' hasBorder={false}>
            <AtListItem
              title='我的记录'
              arrow='right'
              hasBorder={false}
              onClick={this.goTomyRecord}
              iconInfo={{
                size: 25,
                color: '#FF4949',
                customStyle: 'iconAddress'
              }}
            />
            <AtListItem
              title='我的成就'
              arrow='right'
              hasBorder={false}
              onClick={this.goTomyachievement}
              iconInfo={{
                size: 25,
                color: '#FF4949',
                customStyle: 'iconAddress'
              }}
            />
            <AtListItem
              title='我的收藏'
              arrow='right'
              hasBorder={false}
              onClick={this.goTomyCollection}
              className='quan'
              iconInfo={{
                size: 25,
                color: '#FF4949',
                customStyle: 'iconAddress'
              }}
            />
            <AtListItem
              title='客服'
              arrow='right'
              hasBorder={false}
              onClick={this.goToService}
              className='icons'
              iconInfo={{
                size: 25,
                color: '#FF4949',
                customStyle: 'iconAddress'
              }}
            />
          </AtList>
          </View>
        </View>
      </View>
    )
  }
}

export default User
