import Taro, { Component } from '@tarojs/taro'
import{ View, Image, Text } from '@tarojs/components'
import { flex } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import pageInit from '../../utils/pageInit'
import User from '../user/index'
import Knowledge from '../knowledge/index'

@pageInit()
@withShare()

class listPic extends Component {
  config = {
    // navigationBarTitleText: ''
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
      list: [{}, {}, {}]

    }
  }

  componentDidMount() {
    // API.get('api/member').then(res => {
    //   if (res.code == 20000) {
    //   }
    // })
  }

  componentDidShow() {

  }


  handleClick(e) {
    console.warn(e)
    if(e == 0) {
      wx.setNavigationBarTitle({
        title: '知识库' 
      })
    } else {
      wx.setNavigationBarTitle({
        title: '个人中心' 
      }) 
    }
    this.setState({
      current: e
    })
  }

  goToDetail() {
    Taro.navigateTo({
      url:'/pages/detail/index'
    })
  }

  

  render() {
    const { list } = this.state

    return (
      <View className='listBox'>
        {
          list.map((e, index) => (
            <View className='Boxs' onClick={this.goToDetail.bind(this, e)}>
              <Image src='' />
              <View>实验任务</View>
              <View>实验介绍</View>
            </View>
          ))
        }
      </View>
    )
  }
}

export default listPic