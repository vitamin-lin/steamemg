import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
// import { AtList, AtListItem } from 'taro-ui'
import withShare from '../../utils/withSare'
import { getCurrentMonthFirst, dateLater } from '../../utils/times'
import './index.scss'

@withShare()
class User extends Component {
  config = {
    navigationBarTitleText: '个人中心'
  }
  state = {
    userInfo: '',
    userLogin: false,
    staus: true,
    id: 0,
    list:[{
      tits:'我的记录',
      link:'/pages/myRecord/index'
    },{
      tits:'我的成就',
      link:'/pages/myAchievements/index'
    },{
      tits:'我的收藏',
      link:'/pages/myCollection/index'
    },{
      tits:'联系我们',
      link:'/pages/contact/index'
    }]
  }

  static propTypes = {}

  constructor() {
    super(...arguments)
  }

  Login = () => {
    Taro.navigateTo({
      url: '/pages/userInfo/index'
    })
  }

  links() {
  }

  // 我的收藏
  goTomyCollection() {
    Taro.navigateTo({
      url:'/pages/myCollection/index'
    })
  }

  // 我的成就
  goTomyachievement() {
    Taro.navigateTo({
      url:'/pages/myAchievements/index'
    })
  }


  // 我的记录
  goTomyRecord() {
    Taro.navigateTo({
      url:'/pages/myRecord/index'
    })
  }

  // 客服
  goToService() {
    Taro.navigateTo({
      url:'/pages/serviceas/index'
    })
  }

  showToastMsg(msg, type) {
    Taro.showToast({
      title: msg ? msg : '',
      icon: type ? type : 'none'
    })
  }

  onTabItemTap(item) {
    Taro.setStorageSync('items', item)
  }

  linkTo(e) {
    Taro.navigateTo({
      url: e
    })
  }

  componentDidMount() {
    console.warn('111')
    // API.get('api/member').then(res => {
    //   if (res.code == 20000) {
    //   }
    // })
    
  }

  componentDidShow() {
    // myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
    var myDate = new Date();//获取系统当前时间
    // console.warn(myDate.getDay())
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
    const { id, list } = this.state
    const state = Taro.$store.getState()
    // myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
    var myDate = new Date();//获取系统当前时间
    let days = getCurrentMonthFirst(); // 2020-01-03
    let week = dateLater(days, 0).week;
    // console.warn(dateLater(days, 0),days,'1234')

    return (
      <View className='user'>
        <View className='userBg'>
          <Image src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/userHeader.jpg' />
        </View>
        <View className='days'>{days}</View>
        <View className='week'>{week}</View>
        <View className='headPic'>
          <open-data type="userAvatarUrl"></open-data>
        </View>
        <View className='nick'>
          <open-data type="userNickName"></open-data>
        </View>
        <View className='user_box'>
          <View className='boxs'>
            {
              list.map((e, index) => (
                <View className='items' onClick={this.linkTo.bind(this, e.link)}>
                  {
                    !staus &&
                    <View>
                    {
                      index !== 3 &&
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
                  {e.tits}
                  <Image src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/icons.png' />
                </View>
              ))
            }
          </View>
        </View>
        <Image className='logo' src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/logo.png' />
      </View>
    )
  }
}

export default User
