import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Video, Button } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtTag } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import Logins from '../../components/login/index'

var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()
const innerAudioContext = wx.createInnerAudioContext();

@withShare()
// @pageInit()
class detail extends Component {
  config = {
    navigationBarTitleText: '实验'
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
      collect:true,
      main:'',
      current: 0, //  tabs下标
      tags:[{},{},{}] // tags标签多选
    }
  }

  componentDidMount() {
    let { cid } = this.$router.params
    API.get('api/v1/samll/courseinfo/detail', {
      userId: Taro.getStorageSync('userid'),
      id: cid
    }).then(res => {
      console.warn(res)
      this.setState({
        main: res,
        collect: res.collect
      })
    })
  }

  // 页面退出
  componentWillUnmount() {
    innerAudioContext.stop()
  }

  componentDidShow() {

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
    // wx.showToast({
    //   title: '点击完毕'
    // })
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  onTagClick (e) {
    console.warn(e)
  }

  linkTo (e, index) {
    Taro.navigateTo({
      url:'/pages/listwraps/index'
    })
  }

  colect(index) {
    const { collect } = this.state
    let { cid } = this.$router.params
    let _this = this
    API.get('api/v1/samll/collectinfo/collect', {
      userId: Taro.getStorageSync('userid'),
      taskId: cid
    }).then(res => {
      console.warn(res)
      if (res) {
        _this.setState({
          collect: collect ? false : true
        })
      }
    })  
  }

  render() {
    const { collect, main } = this.state
    return (
      <View className='wrap'>
        <Video
          src={main.videoUrls}
          controls={true}
          autoplay={false}
          poster={main.imgUrls}
          initialTime='0'
          id='video'
          loop={false}
          muted={false}
        />
        <View className='tits'>
          <View className='titleTxt'>
            {main.title}
          </View>
          <View className='incona' onClick={this.colect}>
            {/** cloected.png **/}
            <Image src={!collect ? 'https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/cloect.png' : 'https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/cloected.png'} />
            <View>收藏</View>      
          </View>
          <View className='inconb'>
            <Image src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/shares.png' />
            <View>分享</View>
            <Button data-id="shareBtn" open-type="share" className='sure'></Button>
          </View>
        </View>
        {/**<View className='detail'>实验详情：</View>**/}
        {
          main.courseInfoDetails.map((e, index) => (
            <View className='main'>
              <View className='play' onClick={this.getVoice.bind(this, e.contentWithoutHtml)}>
                <Image
                  className='voice'
                  src='https://mm-resource.oss-cn-beijing.aliyuncs.com/miniAppResource/voiceb.png'
                />
              </View>
              <RichText className='text' nodes={e.contentSplit} />
            </View>
          ))
        }
      </View>
    )
  }
}

export default detail
