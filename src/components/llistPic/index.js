import Taro, { Component } from '@tarojs/taro'
import{ View, Image, Text } from '@tarojs/components'
import { flex } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import User from '../user/index'
import Knowledge from '../knowledge/index'

class listPic extends Component {
  config = {
    // navigationBarTitleText: ''
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
      list: [{}, {}, {}, {}]

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
    // const leftList = 


    const rightList = list.map((e, index) => (
      <View className='wrapBoxs' onClick={this.goToDetail.bind(this, e)}>
        <View className='boxPic'>
          <Image src='' />
        </View>
        <View>实验任务</View>
        <View>实验介绍</View>
      </View>
    ))

    return (
      <View className='listBox'>
        <View className='Boxs'>
          {
            list.map((e, index) => (
              <View className='wrapBoxs' onClick={this.goToDetail.bind(this, e)}>
                <View
                  style={`background:#ccc;background-size: 100% auto;`}
                  className='box_pic'
                ></View>
                <View className='txta'>试验任务这样的这样的这样的这样的这样的这样的这样的这样的这样的这样的这样的</View>
                <View className='txtb'>asdas</View>
              </View>
            ))
          }
        </View>
        <View className='Boxs'>
          {
            list.map((e, index) => (
              <View className='wrapBoxs' onClick={this.goToDetail.bind(this, e)}>
                <View
                  style={`background:#ccc;background-size: 100% auto;`}
                  className='box_pic'
                ></View>
                <View className='txta'>这样的这样的这样的这样的这样的这样的这样的这样的这样的这样的这样的</View>
                <View className='txtb'>asdas</View>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}

export default listPic