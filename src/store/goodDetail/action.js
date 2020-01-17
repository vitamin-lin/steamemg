import Taro from '@tarojs/taro'
import * as GOOD from './action-type'
import API from '../../service/api'

const isSecKillProduct = (limitedSaleType) => (
  limitedSaleType === 1
);

// 获取商品信息详情
export function getGoodById(id) {
  return async dispatch => {
    const res = await API.get('api/goods_info?id=' + id);
    const rd = res.data;

    if (res.code === 20000) {
      dispatch(updateGoodDetail(rd, id));
      !isSecKillProduct(rd[0].is_limited_sale);

      // 判断是否有团购
      let k_index = 0;
      rd.map((e, k) => {
        if(e.id == id) {
          k_index = k;
        }
      })

      if(rd[k_index].is_group == 1) {
        dispatch(getBuyGroupList(id))
      }
    } else {
      Taro.navigateBack({
        delta: 2
      })
    }
  }
}

// 更新 UI 商品信息
export function updateGoodDetail(gInfo, id) {
  return {
    type: GOOD.SHOW_GOOD_DETAIL,
    payload: {
      goods: gInfo,
      gid: id
    }
  }
}

// 加入购物车
export function addGoodToCard(gid, num) {
  return async dispatch => {
    dispatch(changeAddCardStatus('request'))
    const res = await API.post('api/cart', {
      goods_id: gid,
      increase: num
    })
    dispatch(changeAddCardStatus('complete'))
    if (res.code === 20000) {
      Taro.showToast({
        title: '成功加入购物车!',
        icon: 'success'
      })
    }
  }
}

export function changeAddCardStatus(s) {
  return {
    type: GOOD.ADD_CARD_STATUS,
    payload: {
      status: s
    }
  }
}

export function changeTypeTag(tag) {
  console.log(tag)

  return {
    type: GOOD.CHANGE_GOOD_TYPE,
    payload: {
      curType: tag
    }
  }
}

// 通过actionType 标记用户是单买，发起组队，加入组队
export function changeUserActionType(ationType) {
  return {
    type: GOOD.CHAGNE_ACTION_TYPE,
    payload: {
      aType: ationType
    }
  }
}

// 获取当前商品的组队列表
export function getBuyGroupList(gid) {
  return async dispatch => {
    const res = await API.get('api/group?good_id=' + gid)
    if (res.code === 20000) {
      dispatch(changeGroupList(res.data.items, res.data.total))
    }
  }
}

export function changeGroupList(groupList, tg) {
  console.log(groupList)
  return {
    type: GOOD.CHANGE_GROUP_LIST,
    payload: {
      arrGroup: groupList,
      tg
    }
  }
}
