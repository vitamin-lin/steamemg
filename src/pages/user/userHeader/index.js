import Taro , { Component } from '@tarojs/taro'
import { View, Text , Button, Image } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import { connect } from "@tarojs/redux"
import { saveUserInfo } from "@store/userInfo/action"
import defaultAvatar from './assets/default-avatar.png'
import bg from './assets/bg.png'
import "./index.scss"


@connect(
  ({ userInfo }) => ({
    userInfo: userInfo.userInfo
  }),
  {
    dispatchSaveUserInfo: saveUserInfo,
  }
)

export default class userHeader extends Component {
  state={
    userInfo:'',
    userLogin: false
  }

  componentWillMount () {
    let userLogin = Taro.getStorageSync('userLogin');
    let userInfo = Taro.getStorageSync('userInfo');
    this.setState({
      userInfo: userInfo,
      userLogin: userLogin
    })
  }

  tobegin = (userInfo) => {
    if(userInfo.detail.userInfo){   //同意
      const { detail } = userInfo;
      this.props.dispatchSaveUserInfo(detail);
      Taro.setStorage({key:'userInfo',data:userInfo.detail.userInfo});
      Taro.setStorage({key:'userLogin',data: true});
      this.setState({
        userLogin: true,
        userInfo: userInfo.detail.userInfo
      })
    } else{ //拒绝,保持当前页面，直到同意
    }
  };

  render() {
    const { userInfo, userLogin } = this.state;
    const { reuxState } = this.props;
    return (
      <View className='wrap'>
        {/* // NOTE 背景图片：Image 标签 + position absolute 实现 */}
        <Image
          className='bg'
          src={bg}
          mode='widthFix'
        />
        <View className='avatar'>
          <AtAvatar
            circle
            size='large'
            image={userLogin && userInfo !=='' ? userInfo.avatarUrl : defaultAvatar}
          ></AtAvatar>
            {
              userLogin && userInfo !==''
              ? <Text className='staus'>{userInfo.nickName}</Text>
              : <View>
                  <Text className='staus'>未登录</Text>
                  <Text className='staus user'>点击登录</Text>
                  <Button
                    className="staus btn"
                    openType="getUserInfo"
                    onGetUserInfo={this.tobegin}
                    type="text"
                  >go</Button>
                </View>
            }
        </View>
      </View>
    );
  }
}
