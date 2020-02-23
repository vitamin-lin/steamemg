import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
// import { AtTabs } from 'taro-ui'
import llistPic from '../../components/llistPic/index'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'

@withShare()
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

  componentDidMount() {
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
      url:'/pages/listwraps/index'
    })
  }

  render() {
    const { list, tabsBars, current, tags } = this.state
    const { type } = this.$router.params
    console.warn(type)
    return (
      <View className='wrap'>
        <llistPic type={type} />
      </View>
    )
  }
}

export default detail
