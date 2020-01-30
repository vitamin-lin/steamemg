import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtTag } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import Logins from '../../components/login/index'

// @withShare()
// @pageInit()
class Coupons extends Component {
  config = {
    navigationBarTitleText: '基础'
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
      list: [],
      tabsBars:[
        { title: '科学', listBox:[{},{}] },
        { title: '物理', listBox:[{},{}] },
        { title: '化学', listBox:[{}] },
        { title: '工程', listBox:[{},{}] },
        { title: '生物', listBox:[{}] },
        { title: '标签页6' , listBox:[{},{}]}
      ], // tabs标题
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

  render() {
    const { list, tabsBars, current, tags } = this.state
    return (
      <View className='wrap'>
          <AtTabs
            current={this.state.current}
            scroll
            animated={false}
            tabList={tabsBars}
            onClick={this.handleClick.bind(this)}>
            {
              tabsBars.map((e, index) => (
                <AtTabsPane current={current} index={index}>     
                   {
                     e.listBox.map((v, k) => (
                        <View className='links' onClick={this.linkTo.bind(this, v)}> 试题{`${k}`}</View>
                     ))
                   }
                </AtTabsPane>
              ))
            }
          </AtTabs>
      </View>
    )
  }
}

export default Coupons
