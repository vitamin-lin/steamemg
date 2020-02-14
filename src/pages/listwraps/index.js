// 首页
import Taro, { Component, navigateTo } from "@tarojs/taro"
import { View, Audio, Button } from "@tarojs/components"
import PropTypes from "prop-types"
import { connect } from "@tarojs/redux"
import Datas from "../../constants/datas"
import { AtCurtain } from 'taro-ui'
// import {  AtModalAction } from 'taro-ui'
import API from '../../service/api'
import "./index.scss"
import withShare from '../../utils/withSare'

var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()
const innerAudioContext = wx.createInnerAudioContext();


@withShare()
class Link extends Component {
  static options = {
    addGlobalClass: true
  }
  config = {
    navigationBarTitleText: "试题"
  };

  state = {
    datas:Datas.question,
    Icons:[{},{},{},{},{}],
    current: 0, // 当前试题的下标
    audioSrc:'',
    autoplay: false,
    isOpened: true,
    nowData:[], // 当前页面的试题
    staus: false, // 判断是否可以点击
    fc: false, // 浮层是否显示
    submit: false, // 答题按钮是否存在
    dia: false, // 控制浮层图片1
    dib: false // 控制浮层图片2
  };


  constructor() {
    super(...arguments);
  } 

  componentDidMount() {
    var res = Taro.getSystemInfoSync()
    this.setState({
      platform:res.platform,
      nowData:Datas.question[0],
      current:0
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
      url: '/pages/results/index'
    })
  }

  // 提交答案
  submitAwser() {
    let { datas, current, staus } = this.state
    let newDatas = Datas;
    let lists = newDatas.question[current].list // 当前题目
    let _this = this
    // 处理其他选项的结果 1 选中的是错误的 2 选中的是正确的
    lists.map((v, k) => {
      if((v.className === 'seaActive' || v.className === 'seaActive seaFalse') && !v.result){
        // 如果是选中的而且是错的
          v.className='seaActive seaFalse'
          this.setState({
            fc: true,
            dia: true
          })
          setTimeout(function() {
            _this.close()
          }, 800)
      } else if((v.className !== 'sea' || v.className === 'seaActive') && v.result) {
        // 正确答案
        // v.className='seaActive'
        this.setState({
          fc: true,
          dib: true
        })
        setTimeout(function() {
          if(current == 4) {
            _this.setState({
              fc: false,
              dib: false
            })
            Taro.navigateTo({
              url:'/pages/results/index'
            })
          } else {
            innerAudioContext.stop()
            _this.setState({
              current: current + 1,
              fc: false,
              dib: false,
              submit: false
            })
          }
        }, 800)
      } else {}
    })
    this.setState({
      datas: newDatas.question,
    })
  }

  // 关闭疑浮层
  close() {
    let _this = this
    _this.setState({
      fc: false,
      dia: false
    })
  }

  // 选题目是第几题
  tapItem(e, index) {
    let { datas, current, staus } = this.state
    let newDatas = Datas;
    // 判断是否可以点击
    // if(staus) return false;
    let lists = newDatas.question[current].list // 当前题目
    // 选对
    // if(lists[index].result) {
      // lists[index].className = 'seaActive'
    // } 
    // else {
    //   lists[index].className = 'seaFalse'
    // }
    // 处理其他选项的结果
    lists.map((v, k) => {
      // console.warn(k,index,'你说呢')
      if(k !== index) {
        v.className = 'sea'
      } else {
        v.className = 'seaActive'
      }
    })
    // 使其不可点击，且出现浮层，接着跳转到下一题
    // console.warn(newDatas.question, 'www')
    this.setState({
      datas: newDatas.question,
      submit: true
    })
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
    let _this = this
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
          _this.setState({
            paths: res,
          })
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            innerAudioContext.autoplay = true
            innerAudioContext.src = res.tempFilePath 
            innerAudioContext.play()
          }
        },
        fail (failres) {
        }
      })
    }
    wx.showToast({
      title: '点击完毕'
    })
  }



  render() {
    const { current, datas, fc, submit } = this.state;
    let txts = datas[current].tit ? datas[current].tit : '';
    return (
      <View className='wrap'> 
        <View className={fc ? 'fc' : 'dn'}>
          <View className='mia'></View>
          <Image className={dia ? 'seas' : 'dn'} src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/dia.png' />
          <Image className={dib ? 'seb' : 'dn'} src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/dib.png' />
        </View>  
        <View className='tit'>
          <Image className='icons' src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/boxIcon.png' />
          <View className='mains'>
            <Image
              className='voice'
              src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/voiceb.png'
              onClick={this.getVoice.bind(this, txts)}
            />
            <View>{current + 1}.{datas[current].tit ? datas[current].tit : ''}</View>
          </View>
        </View>

        <View className='listsWrap'>
          {
            datas[current].list.map((e, index) => (
              <View className={e.className} key={index}>
                <View className='box'>
                  <View onClick={this.tapItem.bind(this, e, index)}>{e.mian}</View>
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
                <View className='icons' key={index}>
                  <View className={current == index ? 'numActive' : 'num'}>{index + 1}</View>
                </View>
              ))
            }
          </View>
        </View>
        <View className={submit ? 'botomSub' : 'dn'}>
          <View className='submits' onClick={this.submitAwser}>提交答案</View>
        </View>
      </View>
    );
  }
}

export default Link;