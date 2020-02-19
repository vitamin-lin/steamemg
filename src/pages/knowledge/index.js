import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
// import { AtAccordion, AtList, AtListItem } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import Logins from '../../components/login/index'

@withShare()
// @pageInit()
class Coupons extends Component {
  config = {
    navigationBarTitleText: '知识树'
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
      logins: false,
      list: [{
        text: '任务列表',
        url:'https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/lista.png'
      },{
        text: '课程列表',
        url:'https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/listb.png'
      },{
        text: '题库',
        url:'https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/listc.png'
      }]
    }
  }

  componentDidMount() {
    console.warn('1asasa1')
    API.get('api/v1/samll/iteminfo/data', {
      cid: 1,
      leveId: 1
    }).then(res => {
      if (res.code == 20000) {
        console.warn('11')
      }
    })  
  }

  componentDidShow() {
    // API.get('api/v1/samll/iteminfo/data', {
    //   cid: 1,
    //   leveId: 1
    // }).then(res => {
    //   if (res.code == 20000) {
    //     console.warn('11')
    //   }
    // })  
  }

  onTabItemTap(item) {
    Taro.setStorageSync('items', item)
  }

  linkWrap(link) {
    console.warn(link)
    if(link == 0) {
      Taro.navigateTo({
        url:'/pages/taskList/index'
      })
    } else if(link == 1) {
      Taro.navigateTo({
        url:'/pages/courseLists/index'
      })
    } else {
      Taro.navigateTo({
        url:'/pages/questionList/index'
      })
    }
  }

  // 授权成功之后
  onChangeStaus() {
    console.warn(link)
  }

  render() {
    const { list } = this.state
    return (
      <View className='wrap'>
        <Image
          src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/rightTxt.png'
          className='rightTxt'
        />
        <View>
          {
            list.map((item,index) => (
              <View
                className='listWrap'
                key={index}
                onClick={this.linkWrap.bind(this, index)}
              >
                <Image src={item.url} />
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}

export default Coupons
