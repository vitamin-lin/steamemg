import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
// import { AtAccordion, AtList, AtListItem } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import Logins from '../../components/login/index'
import datas from '../../constants/datas'

@withShare()
// @pageInit()
class taskList extends Component {
  config = {
    navigationBarTitleText: '任务列表'
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
      list: [],
      staus: false
    }
  }

  componentDidMount() {
    const { type } = this.$router.params
    if(type == 1) {
      this.ajaxData()
    } else {
      this.ajaxDataScan()
    }
    // this.ajaxDataScan()
  }

  componentDidShow() {
  }

  // 扫描 (多个的情况就是任务列表)
  ajaxDataScan() {
    let _this = this
    const { dataVal } = this.$router.params
    // let dataStr = 'L3'
    // let length = dataStr.length
    // let first = dataStr.substr(0, length)
    // if(first == 'L') {}
    // dataStr = dataStr.substr(1)
    API.get('api/v1/samll/taskinfo/scan',{
      userId: Taro.getStorageSync('userid'),
      qrid: dataVal
    }).then(res => {
      let data = res
      _this.setState({
        list: data
      })
      if(data.length === 0) {
        _this.setState({
          staus: true
        })
      }
    })
  }

  // 非扫描
  ajaxData() {
    let _this = this
    API.get('api/v1/samll/taskinfo/data',{
      userId: Taro.getStorageSync('userid'),
      // taskIds:
    }).then(res => {
      let data = res
      _this.setState({
        list: data
      })
      if(data.length === 0) {
        _this.setState({
          staus: true
        })
      }
    })
  }

  detailTo(e) {
    if(e.courseInfo) {
      Taro.navigateTo({
        url: `/pages/detail/index?cid=${e.courseInfo.id}`
      })
    } else {
      Taro.navigateTo({
        url: `/pages/detail/index?cid=${e.id}`
      })
    }
  }

  render() {
    let { list, staus } = this.state
    return (
      <View className='wrap'>
        {
          list.map((e, index) => (
            <View className='main' onClick={this.detailTo.bind(this, e)} key={index}>
              <Image src={e.courseInfo ? e.courseInfo.imgUrls : e.imgUrls} />
              <View className='tits'>{e.courseInfo ? e.courseInfo.title : e.title}</View>
            </View>
          ))
        }
        {
          staus && 
          <View className='tishi'>请返回首页扫码后再来查看喔</View>
        }
      </View>
    )
  }
}

export default taskList
