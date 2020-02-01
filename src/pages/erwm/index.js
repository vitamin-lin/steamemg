import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtTabBar, AtIcon } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import pageInit from '../../utils/pageInit'
import User from '../user/index'
import Knowledge from '../knowledge/index'
import { getCurrentMonthFirst, dateLater } from '../../utils/times'

// @pageInit()
// @withShare()

class erWm extends Component {
  config = {
    navigationBarTitleText: ''
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
    }
  }

  componentDidMount() {
    // this.takePhoto()
  }

  componentDidShow() {
    // this.takePhoto()
  }

  onTabItemTap(item) {
    console.warn(item)
    let _this = this;
    if(item.index == 1) {
      _this.takePhoto()
    }    
  }

  handleClick(e) {
  }

  takePhoto(path) {
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
      },
      cancel: (res) => {
        Taro.switchTab({
          url: `/pages/knowledge/index`
        })
      }
    })
  }
  

  render() {
    const { current, loads } = this.state
    return (
      <View className='wrap'>
      </View>
    )
  }
}

export default erWm