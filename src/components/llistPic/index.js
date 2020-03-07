import Taro, { Component } from '@tarojs/taro'
import{ View, Image, Text } from '@tarojs/components'
import { flex } from 'taro-ui'
import './index.scss'
import API from '../../service/api'

class listPic extends Component {
  config = {
    // navigationBarTitleText: ''
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
      arr: [],
      brr: []
    }
  }

  componentDidMount() {
    this.initData()
  }

  componentDidShow() {
    // this.initData()
  }

  initData() {
    const { list, type } = this.props
    let data = list
    let _this = this
    if(type && type == 1) {
      API.get('api/v1/samll/collectinfo/data', {
        userId: Taro.getStorageSync('userid')
      }).then(res => {
        if (res.code == 0) {
          let list = res.list
          let arr = []
          let brr = []
          for (let k in list) {
            if( k%2 == 1 ){
              brr.push(list[k])  
            }else{
             arr.push(list[k])
            }
          }
          _this.setState({
            arr: arr, 
            brr: brr
          })
        }
      })  
    } else {
      let arr = []
      let brr = []
      for (let k in data) {
        if( k%2 == 1 ){
          brr.push(data[k])  
        }else{
         arr.push(data[k])
        }
      }
      this.setState({
        arr: arr, 
        brr: brr
      })
    }
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
    const { arr, brr } = this.state
    return (
      <View className='listBox'>
        {
          arr.length !== 0 ?
          (
            <View>
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
          ) : <View className='none'>---暂无数据---</View>

        }

      </View>
    )
  }
}

export default listPic