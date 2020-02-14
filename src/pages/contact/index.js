import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import Logins from '../../components/login/index'

@withShare()
// @pageInit()
class contact extends Component {
  config = {
    navigationBarTitleText: '联系我们'
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
      nums:'14552885'
    }
  }

  componentDidMount() {}

  componentDidShow() {
  }

  copys() {
    const { nums } = this.state
    wx.setClipboardData({
      data: nums,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  }


  render() {
    const { nums } = this.state
    return (
      <View className='wrap'>
        <View className='nums'>{nums}</View>
        <Image className='bgs' src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/we.jpg' />
        <Image className='ewms' src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/ewms.png' />
        <View className='copyNums' onClick={this.copys}></View>
      </View>
    )
  }
}

export default contact
