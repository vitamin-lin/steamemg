import Taro, { Component } from "@tarojs/taro";
import { View, Text, ScrollView } from '@tarojs/components'
import pageInit from '../../utils/pageInit'
import { getWindowHeight } from '@utils/style'
import UserHeader from './userHeader'
import Policy from './policy'
import Panel from "../../components/panel"
import cityPicker from "../../components/city-picker"
import "./index.scss";

@pageInit()
class User extends Component {
  config = {
    navigationBarTitleText: "个人中心"
  };
  state = {
  };

  static propTypes = {
  };

  constructor() {
    super(...arguments);
  }

  componentDidMount() {
  }

  componentWillMount () {

    // // 通过缓存获取是否登陆授权过，如果登录过直接进入首页，反之授权登录
    // Taro.getStorage({key:'userInfo'}).then(rst => {
    //   //从缓存中获取用户信息
    //   this.setState({
    //     isLogin: true
    //   })
    // }).catch(erro => {
    //   Taro.hideTabBar({
    //     animation: false //是否需要过渡动画
    //   })
    // })
  }

  onClickSearchBar() {
    // Taro.navigateTo({ url: URL.SEARCH });
  }
  // 鉴权按钮
  getUserInfo = () => {

    // if(userInfo.detail){   //同意
    //   console.warn('我要存储到redux了', this.props);
    //   // this.props.setUserInfo(userInfo.detail.userInfo) //将用户信息存入redux
    //   this.props.dispatchSaveUserInfo(userInfo.detail);
    //   this.setState({
    //     isLogin: true
    //   })
    //   Taro.setStorage({key:'userInfo',data:userInfo.detail.userInfo}).then(rst => {  //将用户信息存入缓存中
    //     console.warn('存储成功')
    //     Taro.navigateBack()
    //   }).catch(erro => {
    //     console.warn(erro, '为什么失败了')
    //   })
    // }
    // else{ //拒绝,保持当前页面，直到同意
    //   wx.removeStorage({
    //     key: 'userInfo',
    //     success: function(res) {
    //       console.log(res.data)
    //     }
    //   })
    //   console.warn('我拒绝了')
    // }
  }

  onChangeCity = e => {
    console.warn(e);
  }


  render() {
    // const { userInfo } = this.props
    const state = Taro.$store.getState();
    // console.warn(state);
    return (
      <View className='user'>
        <ScrollView
          scrollY
          className='user__wrap'
          style={{ height: getWindowHeight() }}
        >
        <UserHeader
          reuxState={state}
        />
        <Panel
          title='订单中心'
          className='panel_top panel_first'
        >
        <Policy />
        </Panel>
        <Panel
          title='关注公众号'
          className='panel_top'
        >
        </Panel>
        <Panel
          title='收货地址'
          className='panel_top'
        >
          <cityPicker onChangeCity={this.onChangeCity.bind(this)}>
            <Text>我是地址选择传入的</Text>
          </cityPicker>
        </Panel>
        </ScrollView>
      </View>
    );
  }
}

export default User;
// <HorizonList data={this.props.recommendBooks} />
// <HorizonList data={this.props.newBooks} />
// <HorizonList data={this.props.hotBooks} />
