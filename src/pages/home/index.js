import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtTabBar, AtIcon } from 'taro-ui'
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
    navigationBarTitleText: 'MARS MAKER'
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
      current: 0,
      loads: true,
      canShare: true
    }
  }

  componentDidMount() {
    // API.get('api/member').then(res => {
    //   if (res.code == 20000) {
    //   }
    // })
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
  

  render() {
    const { current, loads } = this.state
    return (
      <View className='wrap'>
        {
          current == 1 ? <User/> : <Knowledge/>
        }
        <AtTabBar
          fixed
          tabList={[
            { title: '知识库', iconType: 'bullet-list'},
            { title: '个人中心', iconType: 'user' }
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
        <View className='canmer' onClick={this.takePhoto}>
          <AtIcon value='camera' size='35' color='#000'></AtIcon>
        </View>
      </View>
    )
  }
}

export default HOME

// {
//   loads &&
//   <View className='loading_fc'>
//     loading....
//   </View>
// }
