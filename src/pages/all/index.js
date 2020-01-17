import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import starsFlow from '../../components/all-pro/index';
import './index.scss'
import withShare from '../../utils/withSare'

@withShare()
// {
//   title: '可设置分享标题',
//   imageUrl: '可设置分享图片路径',
//   path: '可设置分享路径'
// }
// @pageInit()
class Coupons extends Component {
  config = {
    navigationBarTitleText: '全部商品'
    // disableScroll: true
  }

  link() {
    const app = getApp()
    app.km.track('groupnews_shopping', null)
    Taro.switchTab({
      url: '/pages/home/index'
    })
  }

  handleClick(key) {
    const app = getApp()
    app.km.track('see', null)
    Taro.navigateTo({
      url: '/pages/shareDetail/index?gcode=' + key
    })
  }

  onTabItemTap(item) {
    console.log(item)
    const arrTrack = ['groupnews', 'allgd', 'index', 'shoppingcart', 'personal']
    const app = getApp()
    app.km.track(arrTrack[item.index], null)
  }

  render() {
    return (
      <View className='wrap'>
        <starsFlow />
      </View>
    )
  }
}

export default Coupons
