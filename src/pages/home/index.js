import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtTabBar, AtIcon } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import pageInit from '../../utils/pageInit'
import User from '../user/index'
import Knowledge from '../knowledge/index'
import { getCurrentMonthFirst, dateLater } from '../../utils/times'

@pageInit()
@withShare()

class HOME extends Component {
  config = {
    navigationBarTitleText: 'MARS MAKER'
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
      current: 0,
      staus: true,
    }
  }

  componentDidMount() {
    // API.get('api/member').then(res => {
    //   if (res.code == 20000) {
    //   }
    // })

    // myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
    var myDate = new Date();//获取系统当前时间
    let days = getCurrentMonthFirst(); // 2020-01-03

    console.warn(dateLater(days, 0),'1234')
    
  }

  componentDidShow() {
    let _this = this
    let loads = Taro.getStorageSync('loads')
    // 如果有值
    if(loads == '') {
      setTimeout(function(){
        _this.setState({
          loads: false
        })
      }, 3000)
      Taro.setStorage({ key: 'loads', data: 1 })
    } else {
      _this.setState({
        loads: false
      })
    }
  }


  handleClick(e) {
    console.warn(e)
    if(e == 0) {
      wx.setNavigationBarTitle({
        title: '知识库' 
      })
    } else {
      wx.setNavigationBarTitle({
        title: '个人中心' 
      }) 
    }
    this.setState({
      current: e
    })
  }

  takePhoto() {
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
      }
    })
  }

  leftTabs(staus) {
    this.setState({
      staus: true
    })
  }

  rightTabs(staus) {
    this.setState({
      staus: false
    })
  }

  render() {
    const { current, staus } = this.state
    return (
      <View className='wrap'>
        {
          current == 1 ? <User/> : <Knowledge/>
        }
        <View className='botms'>
          <View className='left' onClick={this.leftTabs.bind(this, staus)}>
            <View className='main'>
              <Image src={staus ? '../../assets/newIcon/know.png' : '../../assets/newIcon/knows.png'} />
              <View>知识库</View>
            </View>
          </View>
          <View className='center'>
            <Image src='../../assets/newIcon/ervm.png' />
          </View>
          <View className='right' onClick={this.rightTabs.bind(this, staus)}>
            <View className='main'>
              <Image src={staus ? '../../assets/newIcon/userActive.png' : '../../assets/newIcon/user.png'} />
              <View>个人中心</View>
            </View>
          </View>
        </View>

      </View>
    )
  }
}

export default HOME

// <AtTabBar
// fixed
// tabList={[
//   { title: '知识库', iconType: 'bullet-list'},
//   { title: '个人中心', iconType: 'user' }
// ]}
// onClick={this.handleClick.bind(this)}
// current={this.state.current}
// />
// <View className='canmer' onClick={this.takePhoto}>
// <AtIcon value='camera' size='35' color='#000'></AtIcon>
// </View>