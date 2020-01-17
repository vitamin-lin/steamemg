import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
// import { AtGrid } from "taro-ui"
import noBegin from '../../../assets/images/noBegin.png'
import noGet from '../../../assets/images/noGet.png'
import noHave from '../../../assets/images/noHave.png'
import noPay from '../../../assets/images/noPay.png'
import shares from '../../../assets/images/share.png'
import './policy.scss'

export default class Policy extends Component {
  static defaultProps = {
    list: [{
      image: noPay,
      value: '未付款'
    },
    {
      image: shares,
      value: '待分享'
    },
    {
      image: noBegin,
      value: '待发货'
    },
    {
      image: noGet,
      value: '待收货'
    },
    {
      image: noHave,
      value: '已失效'
    }]
  }

  linkGrid = (item, index) => {
    let num = index + 1;
    const app = getApp();
    if(num == 1) {
      app.km.track('unpaid', null);
    } else if(num == 2) {
      app.km.track('tobeshared', null);
    } else if(num == 3) {
      app.km.track('undeliver', null);
    } else if(num == 4) {
      app.km.track('ondeliver', null);
    } else if (num == 5){
      app.km.track('invalid', null);
    }
    this.props.onChangeId(num);
    Taro.setStorage({ key: 'id', data: num });
    Taro.navigateTo({
      url: '/pages/order/index?id=' + num
    })
  }

  render () {
    const { list } = this.props
    return (

      <View className='home-policy'>
        {list.map((item, index) => (
          <View key={index} className='home-policy__item' onClick={this.linkGrid.bind(this, item, index)}>
            <Image
              className='home-policy__item-img'
              src={item.image}
            />
            <Text className='home-policy__item-txt'>{item.value}</Text>
          </View>
        ))}
      </View>
    )
  }
}


// <AtGrid
// hasBorder={false}
// data={list}
// columnNum={4}
// onClick={this.linkGrid}
// className='girdBox'
// />


// {list.map((item, index) => (
//   <View key={index} className='home-policy__item'>
//     <Image
//       className='home-policy__item-img'
//       src={item.image}
//     />
//     <Text className='home-policy__item-txt'>{item.value}</Text>
//   </View>
// ))}
