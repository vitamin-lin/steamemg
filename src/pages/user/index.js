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
class User extends Component {
  config = {
    navigationBarTitleText: "我的"
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
    // this.props.dispatchGetNewBooks();
    // this.props.dispatchGetHotBooks();
    // this.props.dispatchGetRecommendBooks();
  }

  onClickSearchBar() {
    Taro.navigateTo({ url: URL.SEARCH });
  }

  render() {
    return (
      <View>
        我的
      </View>
    );
  }
}

export default User;