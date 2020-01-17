import Taro, { getApp } from '@tarojs/taro'
import * as devConfig from './kmConf'
function withShare(opts = {}) {
  let defalutPath = 'pages/home/index?'
  let defalutTitle = '2'
  let defaultImageUrl = '3'

  return function demoComponent(Component) {
    // redux里面的用户数据
    class WithShare extends Component {
      async componentWillMount() {
        Taro.showShareMenu({
          withShareTicket: true
        })

        if (super.componentWillMount) {
          super.componentWillMount()
        }
      }

      // page onshow
      componentDidShow() {

      }

      componentDidHide() {
      }

      componentWillUnmount() {

      }


      // 点击分享的那一刻会进行调用
      onShareAppMessage(res) {
        console.log('onShareAppMessage info: ')
        console.log(res)
        let { title, imageUrl, path = null } = opts

        // 从继承的组件获取配置
        if (this.$setSharePath && typeof this.$setSharePath === 'function') {
          path = this.$setSharePath()
        }

        // 从继承的组件获取配置
        if (this.$setShareTitle && typeof this.$setShareTitle === 'function') {
          title = this.$setShareTitle()
        }

        // 从继承的组件获取配置
        if (
          this.$setShareImageUrl &&
          typeof this.$setShareImageUrl === 'function'
        ) {
          imageUrl = this.$setShareImageUrl()
        }

        if (!path) {
          path = defalutPath
        }
        console.warn(path)

        const reqDataInfo = {
          shareTitle: title,
          sharePath: path,
          shareImageUrl: imageUrl
        }
        console.log(reqDataInfo)
        return reqDataInfo
      }

      render() {
        return super.render()
      }
    }

    return WithShare
  }
}

export default withShare
