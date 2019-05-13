import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import { View, Text, ScrollView } from '@tarojs/components'
import { Provider } from "@tarojs/redux";

import Index from "./pages/index";

import configStore from "./store";

import "./app.scss";
import "./assets/fonts/iconfont.css";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {
  config = {
    pages: [
      "pages/home/index",
      "pages/book-list/index",
      "pages/search/index",
      "pages/book-detail/index",
      "pages/index/index",
      "pages/user/index",
      "pages/cart/index",
      "pages/userInfo/index"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black",
      backgroundColor: "#FAFBFC"
    },
    tabBar: {
      list: [
        {
          pagePath: "pages/index/index",
          text: "团购资讯",
          iconPath: "./assets/cate.png",
          selectedIconPath: "./assets/cate-active.png"
        },
        {
          pagePath: "pages/home/index",
          text: "首页",
          iconPath: "./assets/home.png",
          selectedIconPath: "./assets/home-active.png"
        },
        {
          pagePath: "pages/cart/index",
          text: "购物车",
          iconPath: "./assets/cart.png",
          selectedIconPath: "./assets/cart-active.png"
        },
        {
          pagePath: "pages/user/index",
          text: "我的",
          iconPath: "./assets/user.png",
          selectedIconPath: "./assets/user-active.png"
        }
      ],
      color: "#a6a6a6",
      selectedColor: "#000",
      backgroundColor: "#ffffff",
      borderStyle: "black"
    }
    // debug: true
  };

  componentDidMount() {
    //将redux状态挂载到 Taro 对象上，Taro.$store直接获取操作
    Taro.$store = store;
  }

  componentDidShow() {}

  componentDidHide() {}

  componentCatchError() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
