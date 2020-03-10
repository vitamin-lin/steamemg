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
        { title: '我的徽章'},
        { title: '我的级别', listBox:[{},{}] },
      ], // tabs标题
      listBox:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
      current: 0, //  tabs下标
      tags:[{},{},{}], // tags标签多选
      result:[],
      listWrap: [],
      gc: [],
      hx: [],
      kx: [],
      sw: [],
      wl: []
    }
  }

  componentDidMount() {
    // 获取级别
    this.getItems()
    // 获取等级
    this.getData()

  }

  componentDidShow() {

  }

  // 获取级别
  getItems() {
    let _this = this
    const { gc, hx, kx, sx, wl } = this.state
    API.get('api/v1/samll/badeginfo/data',{
      userId: Taro.getStorageSync('userid'),
    }).then(res => {
      // console.warn(res)
      let gcs = res.gongcheng
      let hxs = res.huaxue
      let kxs = res.kexue
      let sws = res.shengwu
      let wls = res.wuli
      let a1 = _this.ajaxData(gcs, 'gc')
      let a2 = _this.ajaxData(hxs, 'hx')
      let a3 = _this.ajaxData(kxs, 'kx')
      let a4 = _this.ajaxData(sws, 'sw')
      let a5 = _this.ajaxData(wls, 'wl')
      let resultData = a1.concat(a2).concat(a3).concat(a4).concat(a5)
      // console.warn(a1, a2, a3, a4, a5, resultData, '1231')
      _this.setState({
        listBox: resultData
      })
    })
  }

  // 获取等级
  getData() {
    let {tabsBars} = this.state
    let data = tabsBars[0].listBox;
    let _this = this
    API.get('api/v1/samll/levelinfo/data',{
      userId: Taro.getStorageSync('userid'),
    }).then(res => {
      let arr = []
      let val = res.value
      for(let i = 1;i <= val;i++){
        arr.push({})
      }
      _this.setState({
        listWrap: arr
      })
    })
  }

  // 获取徽章列表
  ajaxData(key, type) {
    // console.warn(typeof(key), 'key')
    let _this = this
    if(key == 0) {
      return []
    } else if(key == 1) {
      if(type === 'gc') {
        let arr = [{type: 'gc', title: '工程小助手', pic: 1}]
        return arr
      } else if(type === 'hx') {
        let brr = [{type: 'hx', title: '化学小助手', pic: 4}]
        return brr
      } else if(type === 'kx') {
        let crr = [{type: 'kx', title: '科学小助手', pic: 7}]
        return crr
      } else if(type === 'sw') {
        let drr = [{type: 'sw', title: '生物小助手', pic: 10}]
        return drr
      } else if(type === 'wl') {
        let err = [{type: 'wl', title: '物理小助手', pic: 13}]
        return err
      } else {}
    } else if(key == 2) {
      if(type === 'gc') {
        let arr = [{type: 'gc', title: '工程小助手', pic: 1}, {type: 'gc', title: '工程小研究员', pic: 2}]
        return arr
      } else if(type === 'hx') {
        let brr = [{type: 'hx', title: '化学小助手', pic: 4}, {type: 'hx', title: '化学小研究员', pic: 5}]
        return brr
      } else if(type === 'kx') {
        let crr = [{type: 'kx', title: '科学小助手', pic: 7}, {type: 'kx', title: '科学小研究员', pic: 8}]
        return crr
      } else if(type === 'sw') {
        let drr = [{type: 'sw', title: '生物小助手', pic: 10}, {type: 'sw', title: '生物小研究员', pic: 11}]
        return drr
      } else if(type === 'wl') {
        let err = [{type: 'wl', title: '物理小助手', pic: 13}, {type: 'wl', title: '物理小研究员', pic: 14}]
        return err
      } else {}
    } else if(key >= 3){
        if(type === 'gc') {
          let arr = [{type: 'gc', title: '工程小助手', pic: 1}, {type: 'gc', title: '工程小研究员', pic: 2}, {type: 'gc', title: '小工程学家', pic: 3}]
          return arr
        } else if(type === 'hx') {
          let brr = [{type: 'hx', title: '化学小助手', pic: 4}, {type: 'hx', title: '化学小研究员', pic: 5}, {type: 'hx', title: '小化学家', pic: 6}]
          return brr
        } else if(type === 'kx') {
          let crr = [{type: 'kx', title: '科学小助手', pic: 7}, {type: 'kx', title: '科学小研究员', pic: 8}, {type: 'kx', title: '小科学家', pic: 9}]
          return crr
        } else if(type === 'sw') {
          let drr = [{type: 'sw', title: '生物小助手', pic: 10}, {type: 'sw', title: '生物小研究员', pic: 11}, {type: 'sw', title: '小生物学家', pic: 12}]
          return drr
        } else if(type === 'wl') {
          let err = [{type: 'wl', title: '物理小助手', pic: 13}, {type: 'wl', title: '物理小研究员', pic: 14}, {type: 'wl', title: '小物理学家', pic: 15}]
          return err
        } else {}
    }
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
    const { tabsBars, current, result, listWrap } = this.state
    // console.warn(listWrap)
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
                        获得徽章<Text>{listBox.length}</Text>/15
                      </View>
                      <View className='rights' onClick={this.linkToRules}>
                        <Text>徽章规则</Text>
                        <Image src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/newback.png' />
                      </View>
                    </View>
                    {
                      listBox.map((k, g) => (
                        <View className='badgeTxt' key={g}>
                          <View className='imgsrc'>
                            <Image src={`https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/${k.pic}.png`} />
                          </View>
                          <View className='tits'>{k.title}</View>
                        </View>
                      ))}
                  </View>
                </AtTabsPane>
                : 
                <AtTabsPane current={current} index={index} className='tabs'>
                  {
                    listWrap.map((v, k) => (
                      <View className='las'>
                        <Image class='icons' src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/lv.png' />
                        <View className='nums'>{k+1}</View>
                        <View className='loads'>
                          <View className='lines'></View>
                        </View>
                        <View className='txts'>{`已顺利升级到LV${k+1}`}</View>
                        <View className='numbers'>5 / 5</View>
                      </View>
                    ))
                  }
                  {
                    listWrap.length === 0 && <View className='dengji'>--暂无等级--</View>
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
