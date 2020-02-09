// 首页
import Taro, { Component } from "@tarojs/taro"
import { View, Audio, Button } from "@tarojs/components"
import PropTypes from "prop-types"
import { connect } from "@tarojs/redux"
import Datas from "../../constants/datas"
// import {  AtModalAction } from 'taro-ui'
import API from '../../service/api'
import "./index.scss"

var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()
const innerAudioContext = wx.createInnerAudioContext();

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
    current: 0,
    audioSrc:'',
    autoplay: false,
  };


  constructor() {
    super(...arguments);
  } 

  componentDidMount() {
    var res = Taro.getSystemInfoSync()
    this.setState({
      platform:res.platform
    })
  }

  // 页面退出
  componentWillUnmount() {
    innerAudioContext.stop()
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
    // this.setState({
    //   current: index
    // })
  }

  // 数据返回所有处理，一种是当前页面的数据变更，一种是最终数据的变更
  checkMain() {


  }

  getVoice(txts) {
    let _this = this;
    plugin.textToSpeech({
      lang: "zh_CN",
      tts: true,
      content: txts,
      success: function(res) {
        console.log(res) 
        _this.setState({
          audioSrc: res.filename
        })
        _this.yuyinPlay(res)
      },
      fail: function(res) {
          console.log("fail tts", res)
      }
    })
  }

  // 播放语音
  yuyinPlay(res) {
    let platform = this.state.platform
    if(platform !== 'android') {
      console.warn('我执行了')
      innerAudioContext.autoplay = true
      innerAudioContext.src = res.filename 
      innerAudioContext.play()
    } else {
      wx.downloadFile({
        url: res.filename, //仅为示例，并非真实的资源
        success (res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            innerAudioContext.autoplay = true
            innerAudioContext.src = res.tempFilePath 
            innerAudioContext.play()
          }
        }
      })
    }
    // wx.showToast({
    //   title: '点击完毕'
    // })
  }



  render() {
    const { current, list, datas, audioSrc, autoplay } = this.state;
    let txts = datas[0].tit ? datas[0].tit : '';
    return (
      <View className='wrap'>   
        <View className='tit'>
          <Image className='icons' src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/boxIcon.png' />
          <View className='mains'>
            <Image
              className='voice'
              src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/voiceb.png'
              onClick={this.getVoice.bind(this, txts)}
            />
            <View>{datas[0].tit ? datas[0].tit : ''}</View>
          </View>
        </View>

        <View className='listsWrap'>
          {
            datas[0].list.map((e, index) => (
              <View className={e.className} key={index}>
                <View className='box'>
                  <View>{e.mian}</View>
                  <View className='voice' onClick={this.getVoice.bind(this, e.mian)}>
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
                <View className='icons' key={index} onClick={this.tapItem.bind(this, e, index)}>
                  <View className={current == index ? 'numActive' : 'num'}>{index + 1}</View>
                </View>
              ))
            }
          </View>
        </View>
        <View className='submits'>提交答案</View>
      </View>
    );
  }
}

export default Link;