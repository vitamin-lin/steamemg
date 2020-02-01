/* eslint-disable */
import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
// import { View, Text, ScrollView } from '@tarojs/components'
import API from './service/api'
/* eslint-enable */

import Index from './pages/index'
import configStore from './store'

import { setGlobalData } from './utils/global'
import './app.scss'

// import './assets/fonts/iconfont.css'

// import './utils/kmConf'
// import './utils/km'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {
  state = {
    /* eslint-disable */
    isPhoneX: 0
    /* eslint-enable */
  }
  config = {
    pages: [
      'pages/home/index',  // 首页
      'pages/knowledge/index', //  知识库
      'pages/erwm/index', //扫码
      'pages/questionList/index', // 题库
      'pages/taskList/index', //任务列表
      'pages/courseLists/index', // 课程列表
      'pages/user/index', // 个人中心
      'pages/listwraps/index', // 题库列表
      'pages/tabLink/index', // 基础或者高级题库跳转tabs
      'pages/detail/index', // video详情
      'pages/myRecord/index', // 我的记录
      'pages/myAchievement/index', // 我的成就
      'pages/myCollection/index', // 我的收藏
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      backgroundColor: '#f1f1f1'
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/knowledge/index',
          text: '知识树',
          iconPath: './assets/newIcon/knows.png',
          selectedIconPath: './assets/newIcon/know.png'
        },
        {
          pagePath: 'pages/erwm/index',
          text: '我的',
          iconPath: './assets/newIcon/ervm.png',
          selectedIconPath: './assets/newIcon/ervm.png'
        },
        {
          pagePath: 'pages/user/index',
          text: '个人中心',
          iconPath: './assets/newIcon/userActive.png',
          selectedIconPath: './assets/newIcon/user.png'
        }
      ],
      color: '#a7a7a7',
      selectedColor: '#242424',
      backgroundColor: '#ffffff',
      borderStyle: 'white'
    },

    networkTimeout: {
      request: 1000000,
      connectSocket: 100000,
      uploadFile: 100000,
      downloadFile: 100000
    }

    // debug: true
  }

  componentWillMount() {}

  componentDidMount() {
    //将redux状态挂载到 Taro 对象上，Taro.$store直接获取操作
    this.checkMobilePhone()
    Taro.$store = store
  }

  componentDidShow() {
  }

  componentDidHide() {}

  componentCatchError() {}

  componentDidCatchError() {}


  checkMobilePhone() {
    // var self = this
    Taro.getSystemInfo({
      success: function(e) {
        var a = e.model
        // Taro.showToast({
        //   title : a ,
        //   icon : 'none' ,
        //   mask : true
        // })
        if (
          -1 != a.search('iPhone X') ||
          -1 != a.search('iPhone XS') ||
          -1 != a.search('iPhone XS Max') ||
          -1 != a.search('iPhone XR')
        ) {
          //找到
          setGlobalData('isIphoneX', 1)
          // console.warn('我是X系列')
        } else {
          setGlobalData('isIphoneX', 0)
          // console.warn('我不是X')
        }
      }
    })
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
