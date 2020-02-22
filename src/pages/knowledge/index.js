import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { AtButton } from 'taro-ui'
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
      staus: true,
      logins: false,
      list: [{
        text: '任务列表',
        url:'https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/homea.jpg'
      },{
        text: '课程列表',
        url:'https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/homeb.jpg'
      },{
        text: '题库',
        url:'https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/homec.jpg'
      }]
    }
  }

  componentDidMount() {
    // console.warn('1asasa1')
    // API.get('api/v1/samll/iteminfo/data', {
    //   cid: 1,
    //   leveId: 1
    // }).then(res => {
    //   if (res.code == 20000) {
    //     console.warn('11')
    //   }
    // })  
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

  handleGetUserInfo(e, index) {
    console.warn(e)
    let _this = this
    if(e.detail.errMsg === "getUserInfo:ok") {
      console.warn('到了', e.encryptedData, e.iv)
      API.post('api/mini/login', {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        rawData: e.detail.rawData,
        signature: e.detail.signature,
        openid: Taro.getStorageSync('token')
      }).then(res => {
        if (res.code == 0) {
          _this.setState({
            staus: false
          })
          console.warn('登录成功')
          _this.linkWrap(index)
        }
      })  
    }
 }

  render() {
    const { list, staus } = this.state
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
              >
                {
                  !staus &&
                  <View>
                  {
                    index !== 1 &&
                    <Button
                      key={index}
                      open-type='getUserInfo'
                      onGetUserInfo={e => {
                        e.stopPropagation()
                        e.preventDefault()
                        this.handleGetUserInfo(e, index)
                      }}
                      ></Button>
                    }
                  </View>
                }
                <Image src={item.url} onClick={this.linkWrap.bind(this, index)}/>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}

export default Coupons

