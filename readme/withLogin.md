## 采用JWT授权登陆
## 参考文档
  https://www.jianshu.com/p/c2e712609c7b

# login
  1.初进页面获取后端token值登录状态存储storage
  2.业务接口统一加上token,通过错误码统一判断是否过期，未登录，登录状态等...做出统一处理跳转到登陆页统一登录授权
  3.页面进来就是获取token; 头像，nick等用户信息，统一存入storage或者redux
    token加到统一接口处理，请求接口未登录，登录过期的跳转登录授权页面

  登录，分享的统一封装

