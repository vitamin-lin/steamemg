import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtTag } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import Logins from '../../components/login/index'

// @withShare()
// @pageInit()
class record extends Component {
  config = {
    navigationBarTitleText: '我的记录'
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
      list: [],
      current: 0, //  tabs下标
      tags:[{},{},{}] // tags标签多选
    }
  }

  componentDidMount() {}

  componentDidShow() {
    // API.get('api/group_list').then(res => {
    //   this.setState({
    //     list: res.data.items
    //   })
    // })
    // var _this = this;
    // // 允许从相机和相册扫码
    // wx.scanCode({
    //   success: (res) => {
    //     var result = res.result;

    //     _this.setData({
    //       result: result,

    //     })
    //   }
    // })
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  onTagClick (e) {
    console.warn(e)
  }

  linkTo (e, index) {
    Taro.navigateTo({
      url:'/pages/detail/index'
    })
  }

  render() {
    const { list, tabsBars, current, tags } = this.state
    return (
      <View className='wrap'>
        <View className='days'>
          <View className='days'>今天</View>
          <View className='mains' onClick={this.linkTo}>
            <View 
              className='pics'
              // style={`background:url('https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/awer.png') no-repeat;background-size: 100% auto;`}
            ></View>
            <View className='tits'>
              <View className='txts'>
                相对论是关于时空和引力的理论，主
                要由爱因斯坦创立要由爱因斯坦创立
              </View>
            </View>
          </View>
        </View>
        <View className='lastDays'>
          <View className='days'>更早</View>
          <View className='mains' onClick={this.linkTo}>
            <View className='pics'></View>
            <View className='tits'>
              <View className='txts'>
                相对论是关于时空和引力的理论，主
                要由爱因斯坦创立要由爱因斯坦创立
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default record
