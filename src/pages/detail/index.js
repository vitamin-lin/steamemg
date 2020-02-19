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
    navigationBarTitleText: 'XXXX实验'
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
    let { cid } = this.$router.params
    API.get('api/v1/samll/courseinfo/detail', {
      id: cid
    }).then(res => {
      this.setState({
        main: res,
        colect: res.opAt
      })
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
      url:'/pages/listwraps/index'
    })
  }

  colect() {
    const { colect } = this.state
    this.setState({
      colect: colect ? false : true
    })
  }

  render() {
    const { colect, main } = this.state
    return (
      <View className='wrap'>
        <Video
          src={main.videoUrls}
          controls={true}
          autoplay={false}
          poster={main.imgUrls}
          initialTime='0'
          id='video'
          loop={false}
          muted={false}
        />
        <View className='tits'>
          <View className='titleTxt'>
            {main.title}
          </View>
          <View className='incona' onClick={this.colect}>
            {/** cloected.png **/}
            <Image src={colect ? 'https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/cloect.png' : 'https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/cloected.png'} />
            <View>收藏</View>      
          </View>
          <View className='inconb'>
            <Image src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/shares.png' />
            <View>分享</View>
            <Button data-id="shareBtn" open-type="share" className='sure'></Button>
          </View>
        </View>
        <View className='detail'>实验详情：</View>
        <View className='main'>
        {main.content}
        </View>
      </View>
    )
  }
}

export default detail
