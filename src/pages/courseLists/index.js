import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtTag } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'
import llistPic from '../../components/llistPic/index'

@withShare()
// @pageInit()
class courseLists extends Component {
  config = {
    navigationBarTitleText: '课程列表'
    // disableScroll: true
  }

  constructor() {
    super(...arguments)
    this.state = {
      listAll: [],
      tabsBars:[
        { title: '科学', tags:[{type:''}] },
        { title: '物理', tags:[{type:''},{type:''}] },
      ], // tabs标题
      current: 0, //  tabs下标
      tags:[] // tags标签多选
    }
  }

  componentDidMount() {
    // const { list, tabsBars, current, tags } = this.state
    // this.setState({
    //   tags:tabsBars[current]
    // })
    let _this = this
    API.get('api/v1/samll/coursecata/data').then(res => {
      let arr = []
      for(let k in res) {
        let data = res[k].childs;
        data = data.map(e => {
          return {
            type:'',
            ...e
          }
        })
        arr.push({ 
          title: res[k].name,
          tags: data,
          ...res[k]
        })
      }
      // console.warn(arr)
      _this.getListData(arr[0].id)
      this.setState({
        tabsBars: arr
      })
      // console.warn(a)
    })
  }

  componentDidShow() {

  }

  // 获取列表数据
  getListData (e) {
    let arr = []
    arr.push(e)
    let { current, tabsBars } = this.state
    let tages = tabsBars[current].tags// tabs下的标签
    for(let k in tages) {
      if(tages[k].type == 'primary') {
        arr.push(tages[k].id)
      }
    }
    let _this = this
    API.get('api/v1/samll/courseinfo/data',{
      cid: arr.length == 1 ? arr[0]: arr.join(',')
    }).then(res => {
      _this.setState({
        listAll: res
      }, () => {
        Taro.setStorageSync('listAll', res)
      })

    })
  }

  handleClick (value) {
    let _this = this
    this.setState({
      current: value
    },()=> {
      const { tabsBars } = this.state
      this.getListData(tabsBars[value].id)
    })
  }

  onTagClick (e) {
    const { list, tabsBars, current, tags } = this.state
    let _this = this
    let lists = tabsBars;
    let tabBox = lists[current].tags; // 点击的第几个
    let tagsLa = tabBox[e].type;
    if(tagsLa == '') {
      tabBox[e].type = 'primary';
    } else {
      tabBox[e].type = ''
    }
    this.setState({
      tabsBars: lists
    }, k => {
      _this.getListData(tabsBars[current].id)
    })
  }

  render() {
    const { listAll, tabsBars, current, tags } = this.state
    console.warn(listAll, '你说呢')
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
                           {k.name}
                          </AtTag>
                        )
                      })
                    }
                  </View>      
                  <View style='font-size:18px;text-align:center;height:100px;'>
                    <llistPic list={listAll} />
                  </View>
                </AtTabsPane>
              ))
            }
          </AtTabs>
      </View>
    )
  }
}

export default courseLists
