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
      earlier: [],
      more: '查看更多',
      pageNum: 1,
    }
  }

  componentDidMount() {
    this.ajaxData()
    this.ajaxEarlierData()
  }

  componentDidShow() {
  }

  // 获取今天记录
  ajaxData() {
    var _this = this;
    API.get('api/v1/samll/recordinfo/today', {
      userId: Taro.getStorageSync('userid'),
      // pageNo:1,
      // pageSize: 1
    }).then(res => {
      _this.setState({
        today: res.today
      })
      // console.warn(res)
    })
  }

    // 获取更早记录
    ajaxEarlierData(pageNum) {
      var _this = this;
      API.get('api/v1/samll/recordinfo/earlier', {
        userId: Taro.getStorageSync('userid'),
        pageNum: pageNum ? pageNum : this.state.pageNum,
        pageSize: 15
      }).then(res => {
        let arr = _this.state.earlier
        let brr = arr.concat(res.earlier)
        _this.setState({
          earlier: brr
        })
        if(res.earlier.length === 0) {
          _this.setState({
            more: '这里是底线了'
          })
        }
        // console.warn(res)
      })
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
    // console.warn(e, '12312')
    Taro.navigateTo({
      url:`/pages/detail/index?cid=${e.taskId}`
    })
  }
  // 获取更多
  getMore() {
    const { pageNum } = this.state
    this.ajaxEarlierData(pageNum + 1)
    this.setState({
      pageNum: pageNum + 1
    })
  }

  render() {
    const { today, earlier } = this.state
    // console.warn(this.state)
    return (
      <View className='wrap'>
        <View className='days'>
          <View className='days'>今天</View>
          {
            today.map(e => (
              <View className='mains' onClick={this.linkTo.bind(this, e)}>
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
            <View className='more' onClick={this.getMore}>---{this.state.more}---</View>
          }

        </View>
      </View>
    )
  }
}

export default record
// {
//   earlier.length === 0 &&<View className='none'>--暂无数据--</View>
// }