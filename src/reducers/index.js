import dataStrokes from '../data/dataStrokes'
import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'

const initState = {
  character: {},
  combinationResult: [],
  pickedComb: {},
  dataStoreState: 0,
  latestStorageTime: null,
  searchResult: {}, // 單純搜尋筆劃的結果
  groupChar: {},
  windowHeight: window.innerHeight,
  windowWidth: window.innerWidth,

  menuInput: ['', '', '', '', ''],
  combinationFilter: { count: null, filter: '' },

  // 資料更新
  notification: false,
  notiState: 0, // 1新增成功,幾個字 2移除成功,幾個字 3.讀取成功 4.儲存成功 5.? 6.?
  notiChange: null,

  // MENU選單
  inputTextSelect: -1,
  menuClassName: ['', '', '', ''],

  // 頁面控制
  maxPage: null,
  currentPage: 1,
  currentPageResult: [''],
  pageDataCount: 210,

  // 畫面控制
  view: '',
  menuExpand: false,

  // test
  test: true
}

const getStrokes = (str) => {
  const unicodeHan = (str[0].charCodeAt(0).toString(16)).toUpperCase()
  return dataStrokes[unicodeHan]
}

const handleInputString = str => {
  const result = []
  const reg = /[\u4e00-\u9fa5]/
  for (let i = 0; i < str.length; i++) {
    reg.test(str[i]) && result.push(str[i])
  }
  return result
}

const getAllStrokes = arr => {
  const obj = {}
  arr.map(char => {
    return (obj[char] = getStrokes(char))
  })
  return obj
}

const removeChar = (stateCharacter, charArr) => {
  const result = Object.assign({}, stateCharacter)
  charArr.map(char => {
    return delete result[char]
  })
  return result
}

const removeCharFromPickedName = (pickedComb, charArr) => {
  if (pickedComb === {}) { return {} }
  const result = Object.assign({}, pickedComb)
  charArr.map(char => {
    return Object.keys(result).map(stroke => {
      return result[stroke] = result[stroke].filter(name => {
        return !name.includes(char)
      })
    })
  })
  return result
}

const groupChar = obj => {
  const result = {}
  for (let i = 0; i < Object.keys(obj).length; i++) {
    if (obj[Object.keys(obj)[i]].toString() in result) {
      result[obj[Object.keys(obj)[i]].toString()] =
        [...result[obj[Object.keys(obj)[i]].toString()], Object.keys(obj)[i]]
    } else {
      const arr = [Object.keys(obj)[i]]
      result[obj[Object.keys(obj)[i]].toString()] = arr
    }
  }
  return result
}

const getCombination = (num, groupChar, filterChrArr) => {
  const result = []
  for (let i = 1; i < num; i++) {
    if (i.toString() in groupChar && (num - i).toString() in groupChar) {
      // 如果有該兩種筆劃的單字時
      for (let x = 0; x < groupChar[i.toString()].length; x++) {
        for (let y = 0; y < groupChar[(num - i).toString()].length; y++) {
          const name = groupChar[i.toString()][x] + groupChar[(num - i).toString()][y]
          if (filterChrArr.length > 0) {
            // 如果有加上查詢條件的話
            if (filterChrArr.indexOf(groupChar[i.toString()][x]) !== -1 || filterChrArr.indexOf(groupChar[(num - i).toString()][y]) !== -1) { result.push(name) }
          } else {
            result.push(name)
          }
        }
      }
    }
  }
  return result
}
const getMenuClassName = (num, pre, currentClassName) => {
  const list = ['', '', '', '']
  if (pre !== -1) {
    list[pre] = 'closeDiv'
  }
  if (currentClassName === 'closeDiv' || currentClassName === '') {
    list[num] = 'openDiv'
  }
  return list
}

const handlePickedName = (obj, count, name) => {
  if (Object.keys(obj).includes(count)) {
    if (obj[count].includes(name)) {
      const index = obj[count].indexOf(name)
      obj[count].splice(index, 1)
    } else {
      obj[count] = [...obj[count], name]
    }
  } else {
    obj[count] = [name]
  }
  return Object.assign({}, obj)
}
const arrayUnique = (a) => {
  for (var i = 0; i < a.length; i++) {
    for (var j = i + 1; j < a.length; j++) {
      a[i] === a[j] && a.splice(j--, 1)
    }
  }
  return a
}
const mergePickedName = (loadObj, stateObj) => {
  let result = {}
  let repeatCount = []
  Object.keys(loadObj).map(value => {
    return Object.keys(stateObj).includes(value) ? repeatCount.push(value) : result[value] = loadObj[value]
  })
  Object.keys(stateObj).map(value => {
    return !repeatCount.includes(value) ? result[value] = stateObj[value] : null
  })
  repeatCount.map(value => {
    return result[value] = arrayUnique([...loadObj[value], ...stateObj[value]])
  })
  return result
}

const defaultReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SEARCH_STROKES':
      return Object.assign({}, state, {
        searchResult: getAllStrokes(handleInputString(action.str))
      })
    case 'ADD_CHARACTER':
      const character = getAllStrokes(handleInputString(action.str + Object.keys(state.character).join()))
      return Object.assign({}, state, {
        character: character,
        groupChar: groupChar(character)
      })
    case 'DELETE_CHARACTER':
      const deletedCharacter = removeChar(state.character, handleInputString(action.str))
      return Object.assign({}, state, {
        character: deletedCharacter,
        groupChar: groupChar(deletedCharacter),
        pickedComb: removeCharFromPickedName(state.pickedComb, handleInputString(action.str)),
        view: ''
      })
    case 'COMBINATION_SEARCH':
      const result = getCombination(action.num, state.groupChar, handleInputString(action.str))
      // const pageDataCount = Math.floor((state.windowHeight - (state.windowWidth < 480 ? 180 : 290)) / 36) * (state.windowWidth < 480 ? 6 : 14)
      const pageDataCount = state.windowWidth < 480 ? 11 * 5 : Math.floor((state.windowHeight - 290) / 36) * 14
      const partOfResult = result.slice(0, pageDataCount)
      return Object.assign({}, state, {
        combinationResult: result,
        combinationFilter: { count: state.menuInput[2], filter: state.menuInput[4] },
        maxPage: Math.floor(result.length / pageDataCount) + 1,
        pageDataCount,
        currentPage: 1,
        currentPageResult: partOfResult,
        view: 'SEARCH_COMBINATION'
      })
    case 'CHANGE_PAGE':
      let page
      if (action.double) {
        if (action.next) { page = state.maxPage - state.currentPage < 10 ? state.maxPage : state.currentPage + 10 } else { page = state.currentPage <= 10 ? 1 : state.currentPage - 10 }
      } else {
        page = action.next ? state.currentPage + 1 : state.currentPage - 1
      }
      return Object.assign({}, state, {
        currentPage: page,
        currentPageResult: state.combinationResult.slice((page - 1) * state.pageDataCount, (page) * state.pageDataCount)
      })
    case 'CHANGE_VIEW':
      return Object.assign({}, state, {
        view: action.str
      })
    case 'TRIGGER_MENU':
      return Object.assign({}, state, {
        menuExpand: action.bool || !state.menuExpand
      })
    case 'PICK_NAME':
      return Object.assign({}, state, {
        pickedComb: handlePickedName(state.pickedComb, state.combinationFilter.count, action.str)
      })
    case 'INPUT_TEXT_CHANGE':
      return Object.assign({}, state, {
        menuClassName: action.num === -1 ? ['', '', '', ''] : getMenuClassName(action.num, state.inputTextSelect, state.menuClassName[action.num]),
        inputTextSelect: action.num === -1 ? -1 : (state.inputTextSelect === action.num ? -1 : action.num)
      })
    case 'CLEAN_ALL_INPUT':
      return Object.assign({}, state, {
        menuInput: ['', '', '', '', '']
      })
    case 'LOAD_DATA':
      const loadCharacter = getAllStrokes(handleInputString(action.character + Object.keys(state.character).join()))
      return Object.assign({}, state, {
        character: loadCharacter,
        groupChar: groupChar(loadCharacter),
        pickedComb: mergePickedName(state.pickedComb, action.pickedComb)
      })
    case 'HANDLE_INPUT':
      const inputArrTemp = state.menuInput
      inputArrTemp[action.inputOption] = action.value
      return Object.assign({}, state, {
        menuInput: [...inputArrTemp]
      })
    case 'UPDATE_WINDOW_SIZE':
      return Object.assign({}, state, {
        windowHeight: action.height,
        windowWidth: action.width
      })
    case 'TEST_TRIGGER':
      return Object.assign({}, state, {
        test: action.tf
      })
    default:
      return state
  }
}

const reducers = {
  defaultReducer, // ... other reducers ...
  toastr: toastrReducer // <- Mounted at toastr.
}
const reducer = combineReducers(reducers)

export default reducer
