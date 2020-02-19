import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
// import { AtAccordion, AtList, AtListItem } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import Logins from '../../components/login/index'

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
    API.get('api/v1/samll/taskinfo/data',{
      pid: 1
    }).then(res => {
      this.setState({
        list: res
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
    const { list } = this.state
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
      </View>
    )
  }
}

export default taskList
