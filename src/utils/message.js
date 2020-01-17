import Taro from '@tarojs/taro'
import API from '../service/api'


export const makeSes = (e) => {
  console.warn(e)
  const app = getApp()
  app.km.track(`Window-dysz${e}`, null)
  Taro.showModal({
    title: '信息授权提示',
    content:
      '点击“去设置”开启订阅，时刻向妈妈汇报订单近况~',
    confirmText: '去设置'
  }).then(resModal => {
    console.log(resModal.confirm, resModal.cancel)
    if (resModal.confirm) {
      // 确定
      wx.openSetting({
        success(resSetting) {
          /* eslint-enable */
          app.km.track('sz', null)
        }
      })
    } else {
      const app = getApp()
      /* eslint-enable */
      app.km.track('qxsz', null)
      // console.warn(app)

    }
  })
}
