import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtTag } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import llistPic from '../../components/llistPic/index'

@withShare()
// @pageInit()
class Coupons extends Component {
  config = {
    navigationBarTitleText: '课程列表'
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
      list: [],
      tabsBars:[
        { title: '科学', tags:[{type:''}] },
        { title: '物理', tags:[{type:''},{type:''}] },
        { title: '化学', tags:[{type:''}] },
        { title: '标签页4', tags:[{type:''},{type:''}] },
        { title: '标签页5', tags:[{type:''}] },
        { title: '标签页6' , tags:[{type:''},{type:''}]}
      ], // tabs标题
      current: 0, //  tabs下标
      tags:[] // tags标签多选
    }
  }

  componentDidMount() {
    const { list, tabsBars, current, tags } = this.state
    this.setState({
      tags:tabsBars[current]
    })
  }

  componentDidShow() {
    // API.get('api/group_list').then(res => {
    //   this.setState({
    //     list: res.data.items
    //   })
    // })
    // var _this = this;
    // // 允许从相机和相册扫码
    // wx.scanCode({
    //   success: (res) => {
    //     var result = res.result;

    //     _this.setData({
    //       result: result,

    //     })
    //   }
    // })
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  onTagClick (e) {
    const { list, tabsBars, current, tags } = this.state
    let lists = tabsBars;
    let tabBox = lists[current].tags; // 点击的第几个
    let tagsLa = tabBox[e].type;
    if(tagsLa == '') {
      tabBox[e].type = 'primary';
    } else {
      tabBox[e].type = ''
    }
    console.warn(lists)
    this.setState({
      tabsBars: lists
    })
  }

  render() {
    const { list, tabsBars, current, tags } = this.state
    return (
      <View className='wrap'>
          <AtTabs
            current={this.state.current}
            scroll
            animated={false}
            tabList={tabsBars}
            onClick={this.handleClick.bind(this)}>
            {
              tabsBars.map((e, index) => (
                <AtTabsPane current={current} index={index}>   
                  <View className='tags'>
                    { 
                      e.tags.map((k, index) => {
                        return (
                          <AtTag 
                            name='tag-1' 
                            size='normal'
                            type={k.type} 
                            circle 
                            active={true}
                            onClick={this.onTagClick.bind(this, index)}
                            index={index}
                            className='icons'
                          >
                            tag-1
                          </AtTag>
                        )
                      })
                    }
                  </View>      
                  <View style='font-size:18px;text-align:center;height:100px;'>
                    <llistPic />
                  </View>
                </AtTabsPane>
              ))
            }
          </AtTabs>
      </View>
    )
  }
}

export default Coupons
