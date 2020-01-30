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
    navigationBarTitleText: '任务列表'
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
      list: [],
      tabsBars:[
        { title: '标签页1', tags:[{},{}] },
        { title: '标签页2', tags:[{},{}] },
        { title: '标签页3', tags:[{}] },
        { title: '标签页4', tags:[{},{}] },
        { title: '标签页5', tags:[{}] },
        { title: '标签页6' , tags:[{},{}]}
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

  render() {
    const { list, tabsBars, current, tags } = this.state
    // 标签组件
    const tagsList = tags.map((e, index) => {
      return (
        <AtTag 
          name='tag-1' 
          type='primary' 
          circle 
          active={true}
          onClick={this.onTagClick.bind(this, index)}
          index={index}
        >
          tag-1
        </AtTag>
      )
    })
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
                  <View>
                    { tagsList }
                  </View>      
                  <View style='font-size:18px;text-align:center;height:100px;'>
                    标签页{`${index}`}
                  </View>
                </AtTabsPane>
              ))
            }
          </AtTabs>
      </View>
    )
  }
}

export default Coupons
