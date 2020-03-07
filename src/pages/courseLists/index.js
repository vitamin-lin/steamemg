import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtTag } from 'taro-ui'
import './index.scss'
import API from '../../service/api'
import withShare from '../../utils/withSare'

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
        // { title: '科学', tags:[{type:''}] },
        // { title: '物理', tags:[{type:''},{type:''}] },
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
      // console.warn(arr[0], '初始数据')
      let datas = arr[0].childs
      _this.getListData(datas)
      this.setState({
        tabsBars: arr
      })
      // console.warn(a)
    })
  }

  componentDidShow() {

  }

  // 获取列表数据
  getListData (e, tags) {
    console.warn(e)
    let brr = []
    if(tags) {
      for(let k in e) {
        if(e[k].type == "primary") {
          brr.push(
            e[k].id
          )
        }
      }
    } else {
      for(let k in e) {
        brr.push(
          e[k].id
        )
      }
    }

    let _this = this
    API.get('api/v1/samll/courseinfo/data',{
      cid: brr.length == 1 ? brr[0]: brr.join(',')
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
    const { tabsBars } = this.state
    this.setState({
      current: value
    },()=> {
      _this.getListData(tabsBars[value].childs)
    })
  }

  onTagClick (k, e) {
    console.warn(k, e)
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
    console.warn(tabsBars[current])
    this.setState({
      tabsBars: lists
    }, k => {
      _this.getListData(tabsBars[current].tags, 'tags')
    })
  }
  // 跳转详情
  goToDetail(e) {
    Taro.navigateTo({
      url:`/pages/detail/index?cid=${e.id}`
    })
  }


  render() {
    const { listAll, tabsBars, current, tags } = this.state
    // console.warn(listAll, '你说呢')
    let arr = []
    let brr = []
    for (let k in listAll) {
      if( k%2 == 1 ){
        brr.push(listAll[k])  
      }else{
        arr.push(listAll[k])
      }
    }
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
                            onClick={this.onTagClick.bind(this, k, index)}
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
                    {
                      arr.length === 0 && (
                        <View className='none'>---暂无数据---</View>
                      )
                    }
                    {(
                        <View className='listBox'>
                          <View className='Boxs'>
                            {
                              arr.map((e, index) => (
                                <View className='wrapBoxs' onClick={this.goToDetail.bind(this, e)} key={index}>
                                  <View
                                    style={`background:url(${e.imgUrls});background-size: 100% auto;`}
                                    className='box_pic'
                                  ></View>
                                  <View className='txta'>{e.title}</View>
                                  <View className='txtb'>{e.summary}</View>
                                </View>
                              ))
                            }
                          </View>
                          <View className='Boxs'>
                            {
                              brr.map((e, index) => (
                                <View className='wrapBoxs' onClick={this.goToDetail.bind(this, e)} key={index}>
                                  <View
                                    style={`background:url(${e.imgUrls});background-size: 100% auto;`}
                                    className='box_pic'
                                  ></View>
                                  <View className='txta'>{e.title}</View>
                                  <View className='txtb'>{e.summary}</View>
                                </View>
                              ))
                            }
                          </View>
                        </View>
                      )
                    }
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
