import dataStrokes from '../data/dataStrokes';
import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

const initState = {
  character: {},
  combinationResult: [],
  pickedComb: {},
  dataStoreState: 0,
  latestStorageTime: null,
  searchResult: {},//單純搜尋筆劃的結果
  groupChar: {},

  menuInput: ['', '', '', '', ''],
  combinationFilter: { count: null, filter: "" },

  //資料更新
  notification: false,
  notiState: 0,//1新增成功,幾個字 2移除成功,幾個字 3.讀取成功 4.儲存成功 5.? 6.?
  notiChange: null,

  //MENU選單
  inputTextSelect: -1,
  menuClassName: ["", "", "", ""],

  //頁面控制
  maxPage: null,
  currentPage: 1,
  currentPageResult: [""],

  //畫面控制
  view: "",

  //test
  test: true
};

String.prototype.getStrokes = function () {
  let unicodeHan = (this[0].charCodeAt(0).toString(16)).toUpperCase();
  var result = dataStrokes[unicodeHan];
  return result;
};

const handleInputString = str => {
  let result = [];
  const reg = /[\u4e00-\u9fa5]/;
  for (let i = 0; i < str.length; i++) {
    reg.test(str[i]) && result.push(str[i])
  }
  return result;
}

const getAllStrokes = arr => {
  let obj = {};
  arr.map(char => {
    obj[char] = char.getStrokes();
  })
  return obj;
}

const removeChar = (stateCharacter, charArr) => {
  let result = Object.assign({}, stateCharacter);
  charArr.map(char => {
    delete result[char];
  })
  return result;
}

const removeCharFromPickedName = (pickedComb, charArr) => {
  if (pickedComb === {})
    return {};
  let result = Object.assign({}, pickedComb);
  charArr.map(char => {
    Object.keys(result).map(stroke => {
      result[stroke] = result[stroke].filter(name => {
        return !name.includes(char)
      })
    })
  })
  return result;
}

const groupChar = obj => {
  let result = {};
  for (let i = 0; i < Object.keys(obj).length; i++) {
    if (obj[Object.keys(obj)[i]].toString() in result) {
      result[obj[Object.keys(obj)[i]].toString()]
        = [...result[obj[Object.keys(obj)[i]].toString()], Object.keys(obj)[i]]
    }
    else {
      let arr = [Object.keys(obj)[i]]
      result[obj[Object.keys(obj)[i]].toString()] = arr;
    }
  }
  return result;
}

const getCombination = (num, groupChar, filterChrArr) => {
  let result = [];
  for (let i = 1; i < num; i++) {
    if (i.toString() in groupChar && (num - i).toString() in groupChar) {
      //如果有該兩種筆劃的單字時
      for (let x = 0; x < groupChar[i.toString()].length; x++) {
        for (let y = 0; y < groupChar[(num - i).toString()].length; y++) {
          let name = groupChar[i.toString()][x] + groupChar[(num - i).toString()][y];
          if (filterChrArr.length > 0) {
            //如果有加上查詢條件的話
            if (filterChrArr.indexOf(groupChar[i.toString()][x]) !== -1 || filterChrArr.indexOf(groupChar[(num - i).toString()][y]) !== -1)
              result.push(name);
          }
          else {
            result.push(name)
          }

        }
      }
    }
  }
  return result;
};
const getMenuClassName = (num, pre, currentClassName) => {
  let list = ["", "", "", ""];
  if (pre != -1) {
    list[pre] = "closeDiv";
  }
  if (currentClassName === "closeDiv" || currentClassName === "") {
    list[num] = "openDiv";
  }
  return list;
}

const handlePickedName = (obj, count, name) => {
  if (Object.keys(obj).includes(count)) {
    if (obj[count].includes(name)) {
      let index = obj[count].indexOf(name);
      obj[count].splice(index, 1);
    }
    else {
      obj[count] = [...obj[count], name];
    }
  }
  else {
    obj[count] = [name];
  }
  return Object.assign({}, obj);
}
const PAGE_DATA_COUNT = 210;

const defaultReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SEARCH_STROKES':
      return Object.assign({}, state, {
        searchResult: getAllStrokes(handleInputString(action.str))
      });
    case 'ADD_CHARACTER':
      const character = getAllStrokes(handleInputString(action.str + Object.keys(state.character).join()));
      return Object.assign({}, state, {
        character: character,
        groupChar: groupChar(character)
      });
    case 'DELETE_CHARACTER':
      const deletedCharacter = removeChar(state.character, handleInputString(action.str));
      return Object.assign({}, state, {
        character: deletedCharacter,
        groupChar: groupChar(deletedCharacter),
        pickedComb: removeCharFromPickedName(state.pickedComb, handleInputString(action.str)),
        view: ""
      });
    case 'COMBINATION_SEARCH':
      const result = getCombination(action.num, state.groupChar, handleInputString(action.str));
      const partOfResult = result.slice(0, PAGE_DATA_COUNT);
      return Object.assign({}, state, {
        combinationResult: result,
        combinationFilter: { count: state.menuInput[2], filter: state.menuInput[4] },
        maxPage: Math.floor(result.length / PAGE_DATA_COUNT) + 1,
        currentPage: 1,
        currentPageResult: partOfResult,
        view: "SEARCH_COMBINATION"
      });
    case 'CHANGE_PAGE':
      let page;
      if (action.double) {
        if (action.next)
          page = state.maxPage - state.currentPage < 10 ? state.maxPage : state.currentPage + 10;
        else
          page = state.currentPage <= 10 ? 1 : state.currentPage - 10;
      }
      else {
        page = action.next ? state.currentPage + 1 : state.currentPage - 1;
      }
      return Object.assign({}, state, {
        currentPage: page,
        currentPageResult: state.combinationResult.slice((page - 1) * PAGE_DATA_COUNT, (page) * PAGE_DATA_COUNT),
      });
    case 'CHANGE_VIEW':
      return Object.assign({}, state, {
        view: action.str
      });
    case 'PICK_NAME':
      return Object.assign({}, state, {
        pickedComb: handlePickedName(state.pickedComb, state.combinationFilter.count, action.str)
      });
    case 'INPUT_TEXT_CHANGE':
      return Object.assign({}, state, {
        menuClassName: getMenuClassName(action.num, state.inputTextSelect, state.menuClassName[action.num]),
        inputTextSelect: state.inputTextSelect === action.num ? -1 : action.num
      });
    case 'CLEAN_ALL_INPUT':
      return Object.assign({}, state, {
        menuInput: ['', '', '', '', '']
      });
    case 'HANDLE_INPUT':
      let inputArrTemp = state.menuInput;
      inputArrTemp[action.inputOption] = action.value;
      return Object.assign({}, state, {
        menuInput: [...inputArrTemp]
      });
    case 'TEST_TRIGGER':
      return Object.assign({}, state, {
        test: action.tf
      });
    default:
      return state;
  }
}

const reducers = {
  defaultReducer,// ... other reducers ...
  toastr: toastrReducer // <- Mounted at toastr.
}
const reducer = combineReducers(reducers)

export default reducer;