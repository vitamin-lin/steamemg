import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";

import URL from "../../constants/urls";

import "./index.scss";

@connect(
  ({ home }) => ({
  }),

)
class Cart extends Component {
  config = {
    navigationBarTitleText: "购物车"
  };

  static propTypes = {
    // newBooks: PropTypes.arrayOf(PropTypes.object),
    // hotBooks: PropTypes.arrayOf(PropTypes.object),
    // recommendBooks: PropTypes.arrayOf(PropTypes.object)
  };

  constructor() {
    super(...arguments);
  }

  componentDidMount() {
  }

  onClickSearchBar() {
    Taro.navigateTo({ url: URL.SEARCH });
  }

  render() {
    return (
      <View>
        购物车
      </View>
    );
  }
}

export default Cart;