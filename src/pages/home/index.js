import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import pageInit from '../../utils/pageInit'
import User from '../user/index'
import Knowledge from '../knowledge/index'

@pageInit()
@withShare()

class HOME extends Component {
  config = {
    navigationBarTitleText: 'MARS MAKER',
    // disableScroll: true,
    navigationStyle: "custom" 
  }

  constructor() {
    super(...arguments)
    this.state = {
      stau: true,
    }
  }

  setNavSize () {
    let sysinfo = Taro.getSystemInfoSync()
    let statusHeight = sysinfo.statusBarHeight
    let isiOS = sysinfo.system.indexOf('iOS') > -1
    let navHeight
    if (!isiOS) {
      navHeight = 48;
    } else {
      navHeight = 44;
    }
    this.setState({
      status: statusHeight,
      navHeight: navHeight
    })
  }

  takePhoto() {
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        if(res.errMsg === 'scanCode:ok') {
          // let dataStr = res.result
          let first = res.result.slice(0, 1)
          let data = res.result.substr(1)
          console.warn(data, first)
          if(first == 'L') {
            // 去任务列表
            Taro.navigateTo({
              url: `/pages/taskList/index?dataVal=${data}`
            })
          } else {
            // 去详情页
            Taro.navigateTo({
              url: `/pages/detail/index?cid=${data}`
            })
          }
        }
      }
    })
  }

  leftTabs(staus) {
    this.setState({
      stau: true
    })
  }

  rightTabs(staus) {
    this.setState({
      stau: false
    })
  }
  componentDidMount() {
    console.warn('test')
  }

  componentDidShow() {
  }

  componentDidMount () {
    this.setNavSize()
  }

  render() {
    const { current, stau, staus } = this.state
    const style = {
      paddingTop: Taro.$navBarMarginTop + 'px'
     }
     
    return (
      <View className='wrap'>
        <View className="nav-box">
          <View className='nav' style={style}></View>
          <View className='nav-title' style={style}>
            <Image src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/tit.png' />
          </View>
        </View>
        {
          !stau ? <View style={style}><User /></View> : <View style={style}><Knowledge /></View>
        }
        <View className='botms'>
          <View className='left' onClick={this.leftTabs.bind(this, staus)}>
            <View className='main'>
              <Image src={stau ? 'https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/know.png' : 'https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/knows.png'} />
              <View>知识库</View>
            </View>
          </View>
          <View className='center' onClick={this.takePhoto}>
            <Image src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/ervm.png' />
          </View>
          <View className='right' onClick={this.rightTabs.bind(this, staus)}>
            <View className='main'>
              <Image src={stau ? 'https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/userActive.png' : 'https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/user.png'} />
              <View>个人中心</View>
            </View>
          </View>
        </View>

      </View>
    )
  }
}

export default HOME