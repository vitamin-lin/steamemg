import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtTag } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import Logins from '../../components/login/index'

@withShare()
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
      tags:[{},{},{}], // tags标签多选
      today:[],
      earlier: []
    }
  }

  componentDidMount() {
    var _this = this;
    API.get('api/v1/samll/recordinfo/data', {
      userId: Taro.getStorageSync('userid'),
      // pageNo:1,
      // pageSize: 1
    }).then(res => {
      _this.setState({
        today: res.today,
        earlier: res.earlier
      })
      // console.warn(res)
    })

  }

  componentDidShow() {
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
    const { today, earlier } = this.state
    console.warn(this.state)
    return (
      <View className='wrap'>
        <View className='days'>
          <View className='days'>今天</View>
          {
            today.map(e => (
              <View className='mains' onClick={this.linkTo}>
                <View 
                  className='pics'
                  style={`background:url(${e.courseInfo.imgUrls}) no-repeat;background-size: 100% auto;`}
                ></View>
                <View className='tits'>
                  <View className='txts'>
                    {e.courseInfo.title}
                  </View>
                </View>
              </View>
            ))
          }
        </View>
        <View className='lastDays'>
          <View className='days'>更早</View>
          {
            earlier.map(e => (
              <View className='mains' onClick={this.linkTo}>
                <View
                  style={`background:url(${e.courseInfo.imgUrls}) no-repeat;background-size: 100% auto;`}
                  className='pics'></View>
                <View className='tits'>
                  <View className='txts'>
                    {e.courseInfo.title}
                  </View>
                </View>
              </View>
            ))
          }
          {
            earlier.length === 0 &&<View className='none'>--暂无数据--</View>
          }
        </View>
      </View>
    )
  }
}

export default record
