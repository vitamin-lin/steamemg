import Taro , { Component } from '@tarojs/taro'
import { View, Text , Image } from '@tarojs/components'
// import { AtAvatar } from 'taro-ui'
// import defaultAvatar from './assets/default-avatar.png'
// import bg from './assets/bg.png'
import "./userHeader.scss"

export default class userHeader extends Component {
  state={
    userInfo:'',
    userLogin: false
  }

  componentDidShow () {
    let userLogin = Taro.getStorageSync('userLogin');
    let userInfo = Taro.getStorageSync('userInfo');
    if(userLogin) {
      this.setState({
        userInfo: userInfo,
        userLogin: userLogin
      })
    } else {
      this.setState({
        userInfo:'',
        userLogin: false
      })
    }
  }


  Login = () => {
    Taro.navigateTo({
      url: '/pages/userInfo/index',
    })
  }

  render() {
    const { userInfo, userLogin } = this.state;
    return (
      <View className='wrap'>
        {/* // NOTE 背景图片：Image 标签 + position absolute 实现 */}
        <View className='headPic'>
          <open-data type="userAvatarUrl"></open-data>
        </View>
        <View className='nick'>
          <open-data type="userNickName"></open-data>
        </View>
      </View>
    );
  }
}

// <View>
//   <Text className='staus user' onClick={this.Login}>
//     点击登录
//   </Text>
// </View>

// <Image
//   className='headPic'
//   src={userLogin && userInfo !=='' ? userInfo.avatarUrl : defaultAvatar}
//   mode='widthFix'
// />


// {
//   userLogin && userInfo !==''
//   ? <View className='staus'>
//       <View className='phone'>{userInfo.phone}</View>
//     </View>
//   : null
// }
