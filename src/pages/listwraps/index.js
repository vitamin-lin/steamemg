// 首页
import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import PropTypes from "prop-types"
import { connect } from "@tarojs/redux"
import Datas from "../../constants/datas"
import { AtCheckbox, AtProgress, AtButton, AtMessage, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import API from '../../service/api'
import "./index.scss"

class Link extends Component {
  static options = {
    addGlobalClass: true
  }
  config = {
    navigationBarTitleText: "基础"
  };

  state = {
    datas:Datas.question,
    Icons:[{},{},{},{},{}],
    current: 0
  };


  constructor() {
    super(...arguments);
  } 

  componentWillMount () {
    // 1 获取所有数据，把当前页面对应的题目放入数据

  }

  submit = e => {
    const { checkedList, defaults, resultData } = this.state;
    // console.warn(checkedList.length, defaults)
    if(defaults === 71) {
      let result = this.backResult();
      // console.warn(result);
      this.setState({
        resultName: result,
        isOpened: true
      })
      API.post('score', {
        result: JSON.stringify(resultData),
        name: result
      }).then(res => {
      })
    }
  }

  control = e => {
    Taro.navigateTo({
      url: '/pages/home/index'
    })
  }

  // 切换题目是第几题
  tapItem(e, index) {
    this.setState({
      current: index
    })
  }

  // 数据返回所有处理，一种是当前页面的数据变更，一种是最终数据的变更
  checkMain() {


  }



  render() {
    const { current, list, datas } = this.state;

    return (
      <View className='wrap'>   
        <View className='tit'>
          <Image className='icons' src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/boxIcon.png' />
          <View className='mains'>
            <Image
              className='voice'
              src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/voiceb.png'
            />
            <View>asdasdadsaasdasdadsaasdasdadsaasdasdadsaasdasdadsaasdasdad这样</View>
          </View>
        </View>

        <View className='listsWrap'>
          {
            datas[0].list.map((e, index) => (
              <View className={e.className} onClick={this.checkMain}>
                <View className='box'>
                  <View>asdasdadsa</View>
                  <View className='voice'>
                    <Image
                      src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/voicea.png'
                    />
                  </View>
                </View>
              </View>
            ))
          }
        </View>
        <View className='botomIcon'>
          <View className='box'>
            {
              datas.map((e, index) => (
                <View className='icons' onClick={this.tapItem.bind(this, e, index)}>
                  <View className={current == index ? 'numActive' : 'num'}>{index + 1}</View>
                </View>
              ))
            }
          </View>
        </View>
      </View>
    );
  }
}

export default Link;