import matchSorter from 'match-sorter';
import dataStrokes from '../data/dataStrokes';
// import demoData from '../data/demoData';

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
const getMenuClassName = (num, pre, curClassName) => {
  let list = ["", "", "", ""];
  if (pre != -1) {
    list[pre] = "closeDiv";
  }
  if (curClassName === "closeDiv" || curClassName === "") {
    list[num] = "openDiv";
  }
  return list;
}

const getNewPickList = (name, arr) => {
  if (arr.includes(name)) {
    let index = arr.indexOf(name);
    arr.splice(index, 1);
    return [...arr];
  }
  else {
    return [...arr, name]
  }
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
const pageDataCount = 210;

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
      const result = getCombination(action.num, state.groupChar, handleInputString(action.str));
      const partOfResult = result.slice(0, pageDataCount);
      return Object.assign({}, state, {
        combinationResult: result,
        combinationFilter: { count: state.menuInput[2], filter: state.menuInput[3] },
        maxPage: Math.floor(result.length / pageDataCount) + 1,
        currentPage: 1,
        currentPageResult: partOfResult,
      });
    case 'CHANGE_PAGE':
      const page = action.next ? state.currentPage + 1 : state.currentPage - 1;
      return Object.assign({}, state, {
        currentPage: page,
        currentPageResult: state.combinationResult.slice((page - 1) * pageDataCount, (page) * pageDataCount),
      });
    case 'PICK_NAME':
      return Object.assign({}, state, {
        // pickedComb: [...state.pickedComb, action.str]
        // pickedComb: getNewPickList(action.str, state.pickedComb),
        pickedComb: handlePickedName(state.pickedComb, state.combinationFilter.count, action.str)
      });
    case 'INPUT_TEXT_CHANGE':
      return Object.assign({}, state, {
        menuClassName: getMenuClassName(action.num, state.inputTextSelect, state.menuClassName[action.num]),
        inputTextSelect: action.num
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

export default soReducer;