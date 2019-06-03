// 首页
import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import PropTypes from "prop-types"
import { connect } from "@tarojs/redux"
import Datas from "../../constants/datas"
import { AtCheckbox, AtProgress, AtButton, AtMessage, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import API from '../../service/api'
import "./index.scss"

class Link extends Component {
  static options = {
    addGlobalClass: true
  }
  config = {
    navigationBarTitleText: "ARCHETYPE"
  };

  state = {
    defaults: 0,
    checkedList: [],
    resultData: [],
    resultName: [],
    isOpened: false,
    percent: 0
  };


  constructor() {
    super(...arguments);
  } 

  componentWillMount () {
    const { question, answer } = Datas;
    let arr = [];
    for(let i=1;i <=72;i++) {
      arr.push({
        key: i,
        val: []
      })
    }
    this.setState({
      resultData: arr
    })
  }

  // 返回数据
  backResult = () => {
    // Rebel	破坏者 2 4 21 52 61 66
    // Innocent	天真者 5 13 34 49 63 65
    // Creator	创造者 8 19 31 60 64 69
    // Regular Guy	草根  14 22 27 30 50 71
    // Magician	魔术师 3 23 37 42 48 58
    // Hero	英雄 6 39 40 44 57 59
    // Ruler	统治者 26 32 35 38 46 67
    // Caregiver	照顾者 7 10 15 24 55 68
    // Sage	智 者 1 18 20 36 41 56
    // Explorer	追寻者 33 47 51 62 70 72
    // Jester	娱乐家 9 11 28 43 53 54
    // Lover	万人迷 12 16 17 25 29 45
    const { professional } = Datas;
    const { defaults, resultData, checkedList } = this.state;
    let arr = [];
    let rebel = this.mathTotal([2, 4, 21, 52, 61, 66]);
    let Innocent = this.mathTotal([5, 13, 34, 49, 63, 65]);
    let Creator = this.mathTotal([8, 19, 31, 60, 64, 69]);
    let Regular = this.mathTotal([14, 22, 27, 30, 50, 71]);
    let Magician = this.mathTotal([3, 23, 37, 42, 48, 58]);
    let Hero = this.mathTotal([6, 39, 40, 44, 57, 59]);
    let Ruler = this.mathTotal([26, 32, 35, 38, 46, 67]);
    let Caregiver = this.mathTotal([7, 10, 15, 24, 55, 68]);
    let Sage = this.mathTotal([1, 18, 20, 36, 41, 56]);
    let Explorer = this.mathTotal([33, 47, 51, 62, 70, 72]);
    let Jester = this.mathTotal([9, 11, 28, 43, 53, 54]);
    let Lover = this.mathTotal([12, 16, 17, 25, 29, 45]);
    arr.push(rebel, Innocent, Creator, Regular, Magician, Hero, Ruler, Caregiver, Sage, Explorer, Jester, Lover)
    let max = Math.max.apply(null,arr);
    let max_index = arr.indexOf(max);
    return professional[max_index]; // 已经获得下标，匹配对应的展示，存储到后台
  }

  mathTotal = data => {
    const { defaults, resultData, checkedList } = this.state;
    let num = [];
    for(let k in data) {
      let datas = 0;
      if(resultData[data[k] - 1].val.length !== 0) {
        datas = resultData[data[k] - 1].val[0] ? resultData[data[k] - 1].val[0] : 0;
      }

      num.push(
        datas
      )
    }
    return this.sum(num);
  }

  sum = (arr) => {
    var s = 0;
    arr.forEach(function(val, idx, arr) {
        s += val;
    }, 0);
    return s;
  };

  // 下一题
  nextQuestion = e => {
    let { defaults, resultData, checkedList } = this.state;
    console.warn(defaults + 1)
    if(checkedList.length === 0) {
      this.alert();
    } else {
      this.setState({
        defaults: defaults + 1,
        checkedList: resultData[defaults + 1].val
      }) 
    }
  }  

  alert = () => {
    Taro.showToast({
      title : '请选择后再下一题' ,
      icon : 'none' ,
      mask : true
    })
  }

  // 上一题
  prevQuestion = e => {
    const { defaults, resultData, checkedList } = this.state;
    this.setState({
      defaults: defaults - 1,
      checkedList: resultData[defaults - 1].val
    }) 
  }

  GetPercent = (num, total) => {
    /// <summary>
    /// 求百分比
    /// </summary>
    /// <param name="num">当前数</param>
    /// <param name="total">总数</param>
    num = parseFloat(num);
    total = parseFloat(total);
    if (isNaN(num) || isNaN(total)) {
        return "-";
    }
    return total <= 0 ? "0" : (Math.round(num / total * 10000) / 100);
  }

  handleChange (value) {
    const { checkedList, defaults, resultData } = this.state;
    let arr = checkedList.concat(value);
    const Unique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
    let datas = resultData;
    let checked = value.length === 0 ? [] : Unique(arr);
    datas[defaults].val = checked;
    console.warn(this.GetPercent(defaults, 72))
    this.setState({
      checkedList: checked,
      resultData: datas,
      percent: this.GetPercent(defaults, 72)
    }) 
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
      url: '/pages/home/index'
    })
  }

  cancel = e => {
    this.setState({
      isOpened: false
    })
  }



  render() {
    const { question, answer } = Datas;
    return (
      <View className='wrap'>
        <AtModal isOpened={this.state.isOpened}>
          <AtModalContent>
            <View className='modalText'>
              恭喜你通过了所有测验哦！
              你的ARCHUETYPE TEST 结果是
              <View className='name'>{`${this.state.resultName.name}`}</View>
            </View>
          </AtModalContent>
          <AtModalAction>
          <Button onClick={this.cancel}>取消</Button>
          <Button onClick={this.control}>再玩一次</Button>
          </AtModalAction>
        </AtModal>

        <View className='percent'>
          <AtProgress
          isHidePercent={true}
          percent={this.state.percent}
          strokeWidth={4}
          status='progress' />
        </View>
        
        <View className='tit'>
          <Text>{question[`${this.state.defaults}`]}</Text>
        </View>
        <AtCheckbox
          options={answer}
          selectedList={this.state.checkedList}
          onChange={this.handleChange.bind(this)}
          className='wrapTxt'
        />
        <View className='botm'>
          {
            this.state.defaults > 0 &&
            <View>
              <View className='prev' onClick={this.prevQuestion}>
                上一题
              </View>
              <View className='nums'>{`${this.state.defaults + 1}/72`}</View>
            </View>
          }
          <View className='next' onClick={this.nextQuestion}>
            下一题
          </View>
          {
            this.state.defaults === 71 &&
            <View className='submit' onClick={this.submit}>
              提交
            </View>
          }
        </View>
      </View>
    );
  }
}

export default Link;

