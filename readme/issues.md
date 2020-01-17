# 小程序 issues

Taro中，render中避免if else的嵌套

### 已解决

#### 适配

1. [微信小程序适配 iPhone X 总结](https://kangzubin.com/wxapp-iphonex/)  **推荐** 
2. [微信小程序自定义导航栏](https://juejin.im/post/5ca563f8f265da307a16133b)  **推荐** 



####  `chooseAddress` 调用用户地址

1.  报错：`chooseAddress:fail authorize no response` 

   用户未授权使用相应的信息，在小程序设置中打开

2. 报错：`chooseAddress:cancel` 

   取消地址选择



#### 小程序 ： 添加到我的小程序

1. 是微信小程序提供的menu选项，没有提供相应的回调API，或者其他的API
2. [场景值列表](https://developers.weixin.qq.com/miniprogram/dev/reference/scene-list.html) 1104 原来是可以通过我的小程序点击进入来判断是否加入到了我的小程序，现在逐渐废弃了！只有 `1089	微信聊天主界面下拉，「最近使用」栏（基础库2.2.4版本起包含「我的小程序」栏）`  是从下拉界面位置进入的，并不能准确的判断




### 未解决

#### 小程序web-view 中页面和小程序直接的数据交换

1. [关于微信小程序webview的使用](https://segmentfault.com/a/1190000012250564) 

   网页中的服务号支付，在web-view中是无法支付的，要返回小程序支付

2. [小程序| 如何与web-view共享cookie](<https://github.com/huangzilong/blog/issues/3>) 

   > 比较有趣的是，小程序中的web-view和微信中直接打开的h5，因为用的是同一个浏览器内核，所以，它们的cookie、storage是可以共享的。

   wx.request() 可以获取到cookie，在通过url的query参数传递给web-view页面，再设置cookie

   > ##### 为什么小程序与web-view与不能共享cookie
   >
   > 小程序的wx.request()是通过jsCore调用系统原生api发起的请求，即便header里带有`set-cookie`，也不会在web-view对应的'浏览器'中设置cookie，而是由原生应用来处理这个header中的`set-cookie`，至于怎么操作，要看原生应用了。这个可以参考[如何处理 iOS 原生网络请求中的 cookie ？](https://www.jianshu.com/p/d144bd7226b7)。

**思路** 

1. 通过url的query参数给从小程序给web-view中的页面传值 ，

   通过网页中个微信sdk的 `wx.miniProgram.postMessage({ data: 'foo' })`  和小程序web-view的 [bindmessage](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html) 进行传值；或者网页的`wx.miniProgram.navigateBack()`  path路径上加query参数

2. 通过cookie 和localstorage共享数据 ，根据上面的链接说法是无法共享cookie的了



#### 用户授权信息有什么不同，什么时候出弹窗，什么时候不出弹窗

1. [wx.authorize(Object object)](<https://developers.weixin.qq.com/miniprogram/dev/api/open-api/authorize/wx.authorize.html>)   使用信息前提前获取授权弹窗

2. [授权](<https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html>)  弹窗授权那部分授权

3. [小程序登录](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)  不出授权弹窗

4. [wx.login(Object object)](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html)  不出授权弹窗

5. [wx.checkSession(Object object)](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.checkSession.html)  不出授权弹窗

6. [wx.getUserInfo(Object object)](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserInfo.html)  可以不出弹窗授权，也可以弹窗授权

7. [(4)获取用户信息](https://developers.weixin.qq.com/community/develop/doc/000c2424654c40bd9c960e71e5b009)  **推荐**  

   > 1. 而 `login` 行为是静默，不必授权的，用户不会察觉
   > 2. 某些工具类的轻量小程序不需要登录行为，但是也想获取用户信息，那么就可以在 `wx.getUserInfo` 的时候加一个参数 `withCredentials: false` 直接获取到用户信息，可以少一次网络请求。这样可以在不给用户弹窗授权的情况下**直接展示用户的信息** (refer: [open-data](https://developers.weixin.qq.com/miniprogram/dev/component/open-data.html) )

   **最佳实践**

   1.调用 `wx.login` 获取 `code`，然后从微信后端换取到 `session_key`，用于解密 `getUserInfo`返回的敏感数据。

   2.使用 `wx.getSetting` 获取用户的授权情况
    1) 如果用户已经授权，直接调用 API `wx.getUserInfo` 获取用户最新的信息；
    2) 用户未授权，在界面中显示一个按钮提示用户登入，当用户点击并授权后就获取到用户的最新信息。

   3.获取到用户数据后可以进行展示或者发送给自己的后端。

8. [open-data](https://developers.weixin.qq.com/miniprogram/dev/component/open-data.html) 



#### 小程序客服消息，区分不同的咨询类型

​	从不同客服按钮进入的回话回复不同消息

1. [手把手教你开发微信小程序之客服消息](<https://www.jianshu.com/p/3d59ae5e69ab?mType=Group>) 

2. [客服消息使用指南](<https://developers.weixin.qq.com/miniprogram/introduction/custom.html#%E5%8A%9F%E8%83%BD%E4%BB%8B%E7%BB%8D>) **官方** 

3. [客服消息](<https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/customer-message/customer-message.html>) **官方API** 

   开发者服务器接收消息API

4. [客服消息 服务端](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/customer-message/customerServiceMessage.setTyping.html)  **官方** 

   向微信服务器发送消息