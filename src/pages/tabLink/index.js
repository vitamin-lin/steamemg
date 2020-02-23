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
      tabsBars:[], // tabs标题
      current: 0, //  tabs下标
      tags:[{},{},{}] // tags标签多选
    }
  }

  componentDidMount() {
    const { leveId } = this.$router.params
    let _this = this
    console.warn(leveId)
    API.get('api/v1/samll/itemcata/data', {
      leveId: leveId,
      userId: Taro.getStorageSync('userid')
    }).then(res => {
      // console.warn(res)
      // let arr = []
      // for(let k in res) {
      //   let data = res[k].childs;
      //   data = data.map(e => {
      //     return {
      //       ...e
      //     }
      //   })
      //   arr.push({ 
      //     title: res[k].name,
      //     tags: data,
      //     ...res[k]
      //   })
      // }
      // // console.warn(arr)
      // // _this.getListData(arr[0].id)
      // this.setState({
      //   tabsBars: arr
      // })
      // // console.warn(a)
      // console.warn(arr)
    })
  }

  componentDidShow() {
    const { leveId } = this.$router.params;
    Taro.setNavigationBarTitle({
      title: leveId == 1 ? '基础' : '高级'
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
    const { leveId } = this.$router.params;
    console.warn(this.$router.params)
    Taro.navigateTo({
      url:`/pages/listwraps/index?title=${e.name}&leveId=${leveId}&cid=${e.id}`
    })
  }

  render() {
    const { tabsBars, current } = this.state
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
                     e.childs.map((v, k) => (
                        <View className='links' onClick={this.linkTo.bind(this, v)}> 
                          <View className='name'>{v.name}</View>
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
