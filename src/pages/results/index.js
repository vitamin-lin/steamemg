import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import Logins from '../../components/login/index'

@withShare()
// @pageInit()
class contact extends Component {
  config = {
    navigationBarTitleText: '题目答案'
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
      nums:'14552885'
    }
  }

  componentDidMount() {
  }

  componentDidShow() {
  }

  onShareAppMessage(res) {
    const reqDataInfo = {
      shareTitle: 'title',
      sharePath: 'path',
      shareImageUrl: 'imageUrl'
    }
    return reqDataInfo
  }


  render() {
    const { nums } = this.state
    return (
      <View className='wrap'>
        <Image className='bgs' src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/dic.jpg' />
        <Button data-id="shareBtn" open-type="share" className='sure'>确认</Button>
      </View>
    )
  }
}

export default contact
