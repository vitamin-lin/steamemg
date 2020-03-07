import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtTag } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import Logins from '../../components/login/index'

@withShare()
// @pageInit()

class myAchievements extends Component {
  config = {
    navigationBarTitleText: '我的成就'
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
      list: [],
      tabsBars:[
        { title: '我的徽章', listBox:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
        { title: '我的级别', listBox:[{},{}] },
      ], // tabs标题
      current: 0, //  tabs下标
      tags:[{},{},{}], // tags标签多选
      result:[]
    }
  }

  componentDidMount() {
    let {tabsBars} = this.state
    let data = tabsBars[0].listBox;
    API.get('api/v1/samll/levelinfo/data',{
      userId: Taro.getStorageSync('userid'),
    }).then(res => {
      // this.setState({
      //   list: res.data.items
      // })
    })
    this.setState({
      result: data
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

  linkToRules() {
    Taro.navigateTo({
      url:'/pages/rules/index'
    })
  }


  render() {
    const { tabsBars, current, result } = this.state
    console.warn(result)
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
                index == 0 ?
                <AtTabsPane current={current} index={index} className='tabs'>    
                  <View className='badge'>
                    <View className='heads'>
                      <View className='lefts'>
                        获得徽章<Text>15</Text>/15
                      </View>
                      <View className='rights' onClick={this.linkToRules}>
                        <Text>徽章规则</Text>
                        <Image src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/newback.png' />
                      </View>
                    </View>
                    {
                      result.map((k, g) => (
                        <View className='badgeTxt'>
                          <View className='imgsrc'>
                            <Image src={`https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/${g+1}.png`} />
                          </View>
                          <View className='tits'>科学小助手</View>
                        </View>
                      ))}
                  </View>
                </AtTabsPane>
                : 
                <AtTabsPane current={current} index={index} className='tabs'>
                  {
                    e.listBox.map((v, k) => (
                      <View className='las'>
                        <Image class='icons' src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/lv.png' />
                        <View className='nums'>{k+1}</View>
                        <View className='loads'>
                          <View className='lines'></View>
                        </View>
                        <View className='txts'>{`已顺利升级到LV${k+1}`}</View>
                        <View className='numbers'>1 / 5</View>
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

export default myAchievements

// 再答3道题升级到LV3
