import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
// import { AtTabs } from 'taro-ui'
import llistPic from '../../components/llistPic/index'
import './index.scss'
import API from '../../service/api'


// @withShare()
// @pageInit()
class detail extends Component {
  config = {
    navigationBarTitleText: '我的收藏'
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
      url:'/pages/listwraps/index'
    })
  }

  render() {
    const { list, tabsBars, current, tags } = this.state
    return (
      <View className='wrap'>
        <llistPic />
      </View>
    )
  }
}

export default detail
