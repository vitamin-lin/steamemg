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
    // this.audioCtx = wx.createAudioContext('myAudio')
    // //开始监听
    // innerAudioContext.onPlay(() => {
    //   console.log('开始播放');
    // })

    // //结束监听
    // innerAudioContext.onEnded(() => {
    //   console.log('自动播放完毕');
    // })

    // //错误回调
    // innerAudioContext.onError((err) => {
    //   console.log(err); 
    //   return
    // })
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
    // innerAudioContext.src = res.filename
    // innerAudioContext.play()
    // console.warn(audioCtx)
    innerAudioContext.autoplay = true
    innerAudioContext.src = res.filename 
    innerAudioContext.play()

    wx.showToast({
      title: '点击完毕'
    })

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