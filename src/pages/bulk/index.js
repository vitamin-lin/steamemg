import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
// import { AtAccordion, AtList, AtListItem } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'

// @withShare()
// @pageInit()
class Coupons extends Component {
  config = {
    navigationBarTitleText: '组队资讯'
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
    }
  }

  componentDidMount() {}

  componentDidShow() {
    // API.get('api/group_list').then(res => {
    //   this.setState({
    //     list: res.data.items
    //   })
    // })
  }

  render() {
    return (
      <View className='wrap'>

      </View>
    )
  }
}

export default Coupons
