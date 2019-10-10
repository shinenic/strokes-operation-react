
import { toastr } from 'react-redux-toastr';

import demoData from '../data/demoData';
import msgpack from 'msgpack-lite';
import dateFormat from '../data/date_format';


const arrayUnique = (a) => {
  for (var i = 0; i < a.length; i++) {
    for (var j = i + 1; j < a.length; j++) {
      a[i] === a[j] && a.splice(j--, 1)
    }
  }
  return a
}
const handleInputString = str => {
  const result = []
  const reg = /[\u4e00-\u9fa5]/
  for (let i = 0; i < str.length; i++) {
    reg.test(str[i]) && result.push(str[i])
  }
  return result
}
const checkFileFormat = obj => {
  if (Object.keys(obj).length === 2) {
    if (Object.keys(obj).includes('character') && Object.keys(obj).includes('pickedComb')) {
      return true;
    }
  }
  return false;
}

const downloadTxtFile = (content = '', filename = 'log') => {
  const element = document.createElement("a");
  const file = new Blob([content], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = filename + ".txt";
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}
const loadFile = () => {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    let file = document.querySelector('input[type=file]').files[0];
    let reader = new FileReader()
    let textFile = /text.*/;
    if (file.type.match(textFile)) {
      reader.onload = (event) => {
        try {
          const data = msgpack.decode(event.target.result.split(','))
          this.props.loadData(data['character'], data['pickedComb'])
          this.props.changeView('INDEX')
          if (checkFileFormat(data)) {
            toastr.success('載入成功', '成功載入檔案')
          } else {
            toastr.error('讀取失敗', '請檢察檔案是否被修改')
          }
        } catch (error) {
          toastr.error('讀取失敗', '請重新檢查')
        }
      }
    } else {
      toastr.error('讀取失敗', '檔案格式錯誤')
    }
    reader.readAsText(file);
  } else {
    toastr.error('讀取失敗', '瀏覽器不支援此功能')
  }
}

const inputList = [
  { option: '查詢筆劃', hint: '請輸入中文字(可多筆)', buttonName: '查詢', icon: 'search', isRender: false },
  { option: '增加單字', hint: '請輸入中文字(可多筆)', buttonName: '增加', icon: 'add', isRender: true },
  { option: '查詢筆劃組合', hint: '總筆劃數', hintcont: '單字(選填)', buttonName: '查詢', icon: 'search', isRender: true },
  { option: '移除單字', hint: '欲刪除之文字', buttonName: '移除', icon: 'delete', isRender: true },
  { option: '查看所有單字', icon: 'overview', isRender: true },
  { option: '查看已選組合', icon: 'checklist', isRender: true },
  { option: '儲存', icon: 'download', isRender: true },
  { option: '讀取', icon: 'import', isRender: true },
  { option: '匯出', icon: 'excel', isRender: false },
  { option: '載入範本', icon: 'demo', isRender: true },
  { option: '軟體介紹', icon: 'search', isRender: false },
];

const menuActions = (e, index, actions) => {
  console.log(e, index, actions)
  if (!e || e.key === 'Enter') {
    switch (index) {
      case 0:
        this.props.searchStrokes(this.props.menuInput[0]);
        break;
      case 1:
        this.props.addCharacter(this.props.menuInput[1]);
        this.props.changeView('INDEX')
        const newCharCount = arrayUnique(handleInputString(this.props.menuInput[1])).reduce((acc, value) =>
          Object.keys(this.props.character).includes(value) ? acc : ++acc, 0)
        newCharCount !== 0
          ? toastr.success('新增成功', `成功新增了 ${newCharCount} 個中文單字`)
          : toastr.info('沒有新增任何單字', `請查詢是否單字已存在或者輸入為中文`)
        break;
      case 2:
        Number(this.props.menuInput[2]) > 0 && this.props.combinationSearch(this.props.menuInput[2], this.props.menuInput[4]);
        break;
      case 3:
        this.props.deleteCharacter(this.props.menuInput[3]);
        this.props.changeView('INDEX')
        const deleteCharCount = arrayUnique(handleInputString(this.props.menuInput[3])).reduce((acc, value) =>
          Object.keys(this.props.character).includes(value) ? ++acc : acc, 0)
        deleteCharCount !== 0
          ? toastr.success('刪除成功', `成功刪除了 ${deleteCharCount} 個中文單字及其所有組合`)
          : toastr.info('沒有刪除任何單字', `請查詢是否單字不存在或者輸入為中文`)
        break;
      case 4:
        this.props.changeView('OVERVIEW')
        break;
      case 5:
        this.props.changeView('OVERVIEW_PICKED')
        break;
      case 6: //download & save
        const saveCharacters = Object.keys(this.props.character).join('')
        const savePickedComb = this.props.pickedComb
        this.downloadTxtFile(
          Array.from(msgpack.encode({ character: saveCharacters, pickedComb: savePickedComb }))
          , 'log_' + dateFormat(Date.now(), "yyyyMMdd_hhmmss"))
        break;
      case 7: //load 觸發input(file) click
        this.fileInput.click()
        break;
      case 9:
        this.props.loadData(demoData.character, demoData.pickedComb)
        this.props.changeView('INDEX')
        const demoCharCount = arrayUnique(handleInputString(demoData.character)).reduce((acc, value) =>
          Object.keys(this.props.character).includes(value) ? acc : ++acc, 0)
        demoCharCount !== 0 && setTimeout(() => {
          toastr.success('新增成功', `成功新增了 ${demoCharCount} 個中文單字`)
        }, 650)
        toastr.success('載入成功', '成功載入範本')
        break;
      default:
        break;
    }
    (this.props.menuInput[index] !== '' && e !== null) && this.blur(index)
    this.props.cleanAllInput()
    this.props.triggerMenu(false)
  }
}

exports = {inputList, menuActions}

