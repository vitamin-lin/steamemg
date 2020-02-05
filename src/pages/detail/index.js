import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Video } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtTag } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import Logins from '../../components/login/index'

// @withShare()
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
      list: [],
      current: 0, //  tabs下标
      tags:[{},{},{}] // tags标签多选
    }
  }

  componentDidMount() {}

  componentDidShow() {
    // API.get('api/group_list').then(res => {
    //   this.setState({
    //     list: res.data.items
    //   })
    // })
    // var _this = this;
    // // 允许从相机和相册扫码
    // wx.scanCode({
    //   success: (res) => {
    //     var result = res.result;

    //     _this.setData({
    //       result: result,

    //     })
    //   }
    // })
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
    const { colect } = this.state
    return (
      <View className='wrap'>
        <Video
          src='http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
          controls={true}
          autoplay={false}
          poster='http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
          initialTime='0'
          id='video'
          loop={false}
          muted={false}
        />
        <View className='tits'>
          <View className='titleTxt'>
            试验任务相对论（英语：Theory of relativity）是关于时空和引力的理论
          </View>
          <View className='incona' onClick={this.colect}>
            {/** cloected.png **/}
            <Image src={colect ? 'https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/cloect.png' : 'https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/cloected.png'} />
            <View>收藏</View>      
          </View>
          <View className='inconb'>
            <Image src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/shares.png' />
            <View>分享</View>
          </View>
        </View>
        <View className='detail'>实验详情：</View>
        <View className='main'>
        相对论（英语：Theory of relativity）是关于时空和引力的理论，主
        要由爱因斯坦创立，依其研究对象的不同可分为狭义相对论和广义相
        对论。相对论和量子力学的提出给物理学带来了革命性的变化，它们
        共同奠定了现代物理学的基础。
        </View>
      </View>
    )
  }
}

export default detail
