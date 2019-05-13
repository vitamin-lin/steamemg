import Taro,{ Component } from '@tarojs/taro'
import {View,Picker} from '@tarojs/components'

import city from './city.js'

// 公用联动picker 在父组件传入
// 例： <cityPicker onChangeCity={this.onChangeCity.bind(this)}>这里可以传入自定义样式</cityPicker>

export default class CityPicker extends Component {

  constructor(props){
    super(props);

    this.state = {
      selector: [],
      selectedArea: '北京北京市东城区',
      columnRecord:'0',
      defaultArea:["0","0","0"]
    }
  }

  componentWillMount(){
    let provinces=[];
    let tmpCities=this.getCity(0);
    let tmpAreas=this.getArea(0,0,0);
    city.forEach((item,index)=>{
      provinces[index]=item.name;
    })
    this.setState({
      selector:[provinces,tmpCities,tmpAreas]
    })

  }

  onColumnchange=e=>{
    // let cities=[];
    switch(e.detail.column)
    {
      case 0:
        this.setState({
          columnRecord:e.detail.value
        })
        this.getCity(e.detail.value);
        this.getArea(e.detail.value,0);
        break;
      case 1:
        this.getArea(this.state.columnRecord,e.detail.value);
    }

  }

  onChange(e){
    let selectedArea='';
    let first=e.detail.value[0];
    let sec=e.detail.value[1];
    let third=e.detail.value[2];
    // let info=city[first].sub[sec].sub[third];
    selectedArea=city[first].name+city[first].sub[sec].name+city[first].sub[sec].sub[third].name;
    this.setState({
      selectedArea:selectedArea
    })
    this.props.onChangeCity(selectedArea);
  }

  getCity(provinces_index){
    let cities=[];
    city[provinces_index].sub.forEach((item,index)=>{
      cities[index]=item.name;
    })
    let tempSelector=this.state.selector;
    tempSelector[1]=cities;
    this.setState({
      selector:tempSelector
    })
    return cities;
  }

  getArea(provinces_index,cities_index){
    let areas=[];
    city[provinces_index].sub[cities_index].sub.forEach((item,index)=>{
      areas[index]=item.name;
    })
    let tempSelector=this.state.selector;
    tempSelector[2]=areas;
    this.setState({
      selector:tempSelector
    })
    return areas;
  }

  render () {
    return (
      <View className='container'>
        <View className='picker-body'>
          <View className='picker-section disFlex Flex-middle'>
            <View>
              <Picker mode='multiSelector' value={this.state.defaultArea} range={this.state.selector} onChange={this.onChange.bind(this)} onColumnchange={this.onColumnchange.bind(this)}>
                {this.props.children}
              </Picker>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
