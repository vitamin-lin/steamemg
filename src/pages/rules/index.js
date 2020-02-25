import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Video, Button } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtTag } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import Logins from '../../components/login/index'

@withShare()
// @pageInit()
class detail extends Component {
  config = {
    navigationBarTitleText: '徽章规则'
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
      colect:true,
      main:'',
      current: 0, //  tabs下标
      tags:[{},{},{}] // tags标签多选
    }
  }

  componentDidMount() {

  }

  componentDidShow() {

  }

  render() {
    const { colect, main } = this.state
    return (
      <View className='wrap'>
        <View className='bage'>
          <Image mode='aspectFit' src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/rules.jpg'></Image>
        </View>
      </View>
    )
  }
}

export default detail
