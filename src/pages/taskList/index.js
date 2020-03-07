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
      list: []
    }
  }

  componentDidMount() {
    let _this = this
    API.get('api/v1/samll/taskinfo/data',{
      userId: Taro.getStorageSync('userid'),
      // taskIds:'3'
    }).then(res => {
      let data = res
      _this.setState({
        list: data
      })
    })
  }

  componentDidShow() {
  }

  detailTo() {
    Taro.navigateTo({
      url:'/pages/detail/index'
    })
  }

  render() {
    let { list } = this.state
    return (
      <View className='wrap'>
        {
          list.map((e, index) => (
            <View className='main' onClick={this.detailTo.bind(this, e)} key={index}>
              <Image src={e.imgUrls} />
              <View className='tits'>{e.title}</View>
            </View>
          ))
        }
        {
          list.length === 0 && 
          <View className='tishi'>请返回首页扫码后再来查看喔</View>
        }
      </View>
    )
  }
}

export default taskList
