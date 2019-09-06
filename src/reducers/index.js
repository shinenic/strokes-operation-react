import matchSorter from 'match-sorter';
import dataStrokes from '../data/dataStrokes';

const initState = {
  character: {},
  combinationResult: [],
  pickedComb: [],
  dataStoreState: 0,
  latestStorageTime: null,
  searchResult: {},//單純搜尋筆劃的結果
  groupChar: {},

  searchInput: '',
  addInput: '',
  combinationInput: '',
  removeInput: '',
  filterCharInput: '',

  //資料更新
  notification: false,
  notiState: 0,//1新增成功,幾個字 2移除成功,幾個字 3.讀取成功 4.儲存成功 5.? 6.?
  notiChange: null,

  //MENU選單
  inputTextSelect: 0,
  menuOption: [0, 0, 0, 0]
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
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i]] = arr[i].getStrokes();
  }
  return obj;
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
      //如果有該兩種筆畫的單字時
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


const soReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SEARCH_STROKES':
      return Object.assign({}, state, {
        searchResult: getAllStrokes(handleInputString(action.str))
      });
    case 'ADD_CHARACTER':
      return Object.assign({}, state, {
        character: getAllStrokes(handleInputString(action.str)),
        groupChar: groupChar(getAllStrokes(handleInputString(action.str)))
      });
    case 'COMBINATION_SEARCH':
      return Object.assign({}, state, {
        combinationResult: getCombination(action.num, state.groupChar, handleInputString(action.str))
      });
    case 'INPUT_TEXT_CHANGE':
      return Object.assign({}, state, {
        inputTextSelect: action.num
      });
    case 'HANDLE_INPUT':
      let inputObj = {};
      inputObj[action.inputOption] = action.value
      return Object.assign({}, state, inputObj);
    default:
      return state;
  }
}

export default soReducer;