// 首页
import Taro, { Component } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import PropTypes from "prop-types"
import { connect } from "@tarojs/redux"
import pageInit from '../../utils/pageInit'
import { AtAvatar } from 'taro-ui'
import { saveUserInfo } from "@store/userInfo/action"
import defaultAvatar from '../../assets/user.png'
import waveTop from '../../assets/wave-top.png'
import waveMid from '../../assets/wave-mid.png'
import waveBot from '../../assets/wave-bot.png'
import Datas from "../../constants/datas"
import URL from "../../constants/urls"
import List from "../list/index"
import API from '../../service/api'
import "./index.scss";

@connect(
  ({ home, userInfo }) => ({
    recommendBooks: home.recommendBooks,
    userInfo: userInfo.userInfo
  }),
  {
    // dispatchGetRecommendBooks: getRecommendBooks,
    dispatchSaveUserInfo: saveUserInfo,
  }
)
@pageInit()
class Home extends Component {
  constructor (props){
    super(props);
    this.state = {
      userLogin: true,
      userInfo: [],
      initText: '授权登录'
    }
  }
  config = {
    navigationBarTitleText: "ARCHETYPE"
  };

 
  componentDidMount () {
  }

  // 鉴权按钮
  getUserInfo = (e) => {
    const { rawData } = e.detail;
    let userInfo = Taro.getStorageSync('userInfo');
    let endData = [];
    if(userInfo && userInfo !== '') {
      endData = JSON.parse(userInfo);
    }
    if(userInfo) {
      API.get('score').then(res => {
        Taro.navigateTo({
          url: '/pages/list/index'
        })
      });
    } else {
      Taro.setStorage({key:'userInfo',data:rawData}).then(rst => { 
        //将用户信息存入缓存中
        this.setState({
          userInfo: rawData,
          initText: '开始答题'
        })
      }).catch(erro => {
        console.warn(erro, '为什么失败了')
      })
    }
  }

  render() {
    let userInfos = Taro.getStorageSync('userInfo');
    let endData = [];
    if(userInfos && userInfos !== '') {
      endData = JSON.parse(userInfos);
    }
    
    return (
      <View>
        <View className='btom'></View>
        <View className='Tits'></View>
        <View className='Tit'>ARCHETYPE TEST</View>
        <View className='avatars'>
          <Image
            src={endData.length !== 0 ? endData.avatarUrl : ''}
          />
          <Text className='nick'>{endData.nickName ? endData.nickName : '昵称'}</Text>
        </View>
        <Button className='begin' open-type='getUserInfo' onGetUserInfo={this.getUserInfo}> {endData.length !== 0 ? '开始答题' : this.state.initText} </Button>
      </View>
    );
  }
}

export default Home;