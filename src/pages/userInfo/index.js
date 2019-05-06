import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";

import "./index.scss";  

class UserInfo extends Component {
  config = {
    navigationBarTitleText: "登录授权"
  };


  render() {
    return (
      <View>
        <Button>登录授权</Button>
      </View>
    );
  }
}

export default UserInfo;