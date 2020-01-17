import * as GOOD from './action-type'

const initialState = {
  addCardStatus: 'complete', // 'request', complete
  typeTags: [
    { tit: 'NB-1片', id: 1, goodInfo: {} },
    { tit: 'NB-66片', id: 8, goodInfo: {} }
  ],
  curTag: { tit: 'NB-1片', id: 1, goodInfo: {} },
  actionType: 'self', // self 单人买； createTeam 发起组团买；  joinTeam 加入别人的组队
  groupList: [], // 正在发起的组团
  totalGroup: 1 // 正在发起的总的组团人数
}

function getTypesByTier(gList, gid) {
  if (!gList || gList.length == 0) {
    return []
  }
  let curGItem
  let types = gList.map(g => {
    if (gid == g.id) {
      curGItem = g
    }
    return {
      tit: g.size + '-' + g.piece + '片',
      id: g.id,
      goodInfo: g
    }
  })

  const curType = {
    tit: curGItem.size + '-' + curGItem.piece + '片',
    id: curGItem.id,
    goodInfo: curGItem
  }

  return {
    types,
    curType
  }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GOOD.SHOW_GOOD_DETAIL:
      var gtInfo = getTypesByTier(payload.goods, payload.gid)
      const { types, curType } = gtInfo
      // console.log(types)
      return {
        ...state,
        goodDetail: payload.goods[0],
        typeTags: types,
        curTag: curType
      }

    case GOOD.ADD_CARD_STATUS:
      return { ...state, toastMsg: payload.msg }

    case GOOD.CHANGE_GOOD_TYPE:
      return { ...state, curTag: payload.curType }

    case GOOD.CHAGNE_ACTION_TYPE:
      return { ...state, actionType: payload.aType }

    case GOOD.CHANGE_GROUP_LIST:
      return { ...state, groupList: payload.arrGroup, totalGroup: payload.tg }

    default:
      return state
  }
}
