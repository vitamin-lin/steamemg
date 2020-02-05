import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
// import { AtAccordion, AtList, AtListItem } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import Logins from '../../components/login/index'

// @withShare()
// @pageInit()
class Coupons extends Component {
  config = {
    navigationBarTitleText: '任务列表'
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
      list: [{},{},{},{},{},{},{},{},{}]
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

  detailTo() {
    Taro.navigateTo({
      url:'/pages/detail/index'
    })
  }

  render() {
    const { list } = this.state
    return (
      <View className='wrap'>
        {
          list.map((e, index) => (
            <View className='main' onClick={this.detailTo.bind(this, e)}>
              <View className='tits'>试验任务XXXX</View>
            </View>
          ))
        }
      </View>
    )
  }
}

export default Coupons
