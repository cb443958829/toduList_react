import { combineReducers } from 'redux'
import { data } from '../asserts/data'
import { ADDTHINGS, MODIFY, DEL, MODIFYSTATE, HANDLESHOW } from './reaction-types'

const initData = data

// 处理列表内容显示
function Show(state, data) {
  const newState = []
  state.forEach((item, index) => {
    newState[index] = Object.assign({}, item)
  })
  // switch (data) {
  //   case 'all':
  //     return newState
  //   case 'undone':
  //     return newState.filter((item) => !item.isDone)
  //   case 'done':
  //     return newState.filter((item) => item.isDone)
  //   case 'del':
  //     return state.filter((item) => !item.isDone)
  //   default:
  //     return state
  // }
  return newState
}
const typeData = function( state=[], action) {
  switch(action.type) {
    case HANDLESHOW:
      return action.data
    default:
      return 'all'
  }
}
const storeData = function (state = initData, action) {
  switch (action.type) {
    case ADDTHINGS:
      const length = state.length
      const newActonData = Object.assign(action.data, {id: length + 1})
      return [...state, newActonData]
    case MODIFY:
      const { flagId } = action.data
      const index = state.findIndex((item) => item.id === flagId)
      return [...state.slice(0, index), action.data, ...state.slice(index + 1)]
    case DEL:
      const i = state.findIndex((item) => item.id === action.data)
      return [...state.slice(0, i), ...state.slice(i + 1)]
    case MODIFYSTATE:
      const ii = state.findIndex((item) => item.id === action.data.flagId)
      const item = state.find((item) => item.id === action.data.flagId)
      var newItem = JSON.parse(JSON.stringify(item))
      newItem.isDone = action.data.isDone
      return [...state.slice(0, ii), newItem, ...state.slice(ii + 1)]
    case HANDLESHOW:
      if(action.data === 'del') {
        const newData = state.filter(item => !item.isDone)
        console.log(state, newData)
        return newData
      }
      const showData = Show(state, action.data)
      return showData
    default:
      return [...state]
  }
}

export default combineReducers({ storeData, typeData })
