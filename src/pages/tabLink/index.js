import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtTag } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import Logins from '../../components/login/index'

@withShare()
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
        // { title: '标签页6' , listBox:[{},{}]},
        // { title: '标签页7' , listBox:[{},{}]},
        // { title: '标签页8' , listBox:[{},{}]},
        // { title: '标签页9' , listBox:[{},{}]},
        // { title: '标签页10' , listBox:[{},{}]},
      ], // tabs标题
      current: 0, //  tabs下标
      tags:[{},{},{}] // tags标签多选
    }
  }

  componentDidMount() {}

  componentDidShow() {
    const { type } = this.$router.params;
    Taro.setNavigationBarTitle({
      title: type == 0 ? '基础' : '高级'
    });
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
            className='tabsBox'
            onClick={this.handleClick.bind(this)}>
            {
              tabsBars.map((e, index) => (
                <AtTabsPane current={current} index={index} className='tabs'>     
                   {
                     e.listBox.map((v, k) => (
                        <View className='links' onClick={this.linkTo.bind(this, v)}> 
                          <View className='name'>试题{`${k}`}</View>
                          {
                            k%2 === 0 ? <Image src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/linka.png' /> :
                            <Image src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/linkb.png' />
                          }
                          <View className={k%2 === 0 ? 'overs' : 'oversa' }>已完成</View>
                        </View>
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
