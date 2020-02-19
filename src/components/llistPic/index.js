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
    }
  }

  componentDidMount() {
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

  goToDetail(e) {
    Taro.navigateTo({
      url:`/pages/detail/index?cid=${e.cid}`
    })
  }

  

  render() {
    const { list } = this.props
    let arr = []
    let brr = []
    for (let k in list) {
      if( k%2 == 1 ){
        brr.push(list[k])  
      }else{
       arr.push(list[k])
      }
    }
    return (
      <View className='listBox'>
        <View className='Boxs'>
          {
            arr.map((e, index) => (
              <View className='wrapBoxs' onClick={this.goToDetail.bind(this, e)}>
                <View
                  style={`background:url(${e.imgUrls});background-size: 100% auto;`}
                  className='box_pic'
                ></View>
                <View className='txta'>{e.title}</View>
                <View className='txtb'>{e.summary}</View>
              </View>
            ))
          }
        </View>
        <View className='Boxs'>
          {
            brr.map((e, index) => (
              <View className='wrapBoxs' onClick={this.goToDetail.bind(this, e)}>
                <View
                  style={`background:url(${e.imgUrls});background-size: 100% auto;`}
                  className='box_pic'
                ></View>
                <View className='txta'>{e.title}</View>
                <View className='txtb'>{e.summary}</View>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}

export default listPic