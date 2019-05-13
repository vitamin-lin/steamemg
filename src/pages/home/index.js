import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";
import {
  // getRecommendBooks,
} from "@store/home/action";
import pageInit from '../../utils/pageInit'
import { saveUserInfo } from "@store/userInfo/action";
import Panel from "../../components/panel";
import HorizonList from "../../components/horizon-list";
import FakeSearchBar from "../../components/fake-search-bar";
import URL from "../../constants/urls";
import Banner from "./banner";

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
  config = {
    navigationBarTitleText: "首页"
  };
  state = {
    isLogin: true
  };

  static propTypes = {
    // newBooks: PropTypes.arrayOf(PropTypes.object),
    // hotBooks: PropTypes.arrayOf(PropTypes.object),
    // recommendBooks: PropTypes.arrayOf(PropTypes.object)
  };

  constructor() {
    super(...arguments);
    this.onClickSearchBar = this.onClickSearchBar.bind(this);
  }

  componentDidMount() {
    // this.props.dispatchGetRecommendBooks();
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
    Taro.navigateTo({ url: URL.SEARCH });
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


  render() {
    const { isLogin } = this.state;
    const state = Taro.$store.getState();
    return (
      isLogin === true ?
      <View>
        <Banner/>
        <FakeSearchBar onClick={this.onClickSearchBar} />
        <Panel
          url={`${URL.BOOK_LIST}?type=new`}
          title='新书速递'
          className='panel--first'
        >

        </Panel>
        <Panel
          url={`${URL.BOOK_LIST}?type=hot`}
          title='近期热门'
          className='margin-top-lg'
        >

        </Panel>
        <Panel
          url={`${URL.BOOK_LIST}?type=recommend`}
          title='为你推荐'
          className='margin-top-lg'
        >

        </Panel>
      </View> :
      <View>
        <Button open-type='getUserInfo' onGetUserInfo={this.getUserInfo}> 微信授权 </Button>
      </View>
    );
  }
}

export default Home;
// <HorizonList data={this.props.recommendBooks} />
// <HorizonList data={this.props.hotBooks} />
// <HorizonList data={this.props.newBooks} />
