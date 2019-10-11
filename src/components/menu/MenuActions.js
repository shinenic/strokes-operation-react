
import { toastr } from 'react-redux-toastr';
import demoData from '../../data/demoData';
import msgpack from 'msgpack-lite';
import dateFormat from '../../data/date_format';


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
export const loadFile = (props) => {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    let file = document.querySelector('input[type=file]').files[0];
    let reader = new FileReader()
    let textFile = /text.*/;
    if (file.type.match(textFile)) {
      reader.onload = (event) => {
        try {
          const data = msgpack.decode(event.target.result.split(','))
          props.loadData(data['character'], data['pickedComb'])
          props.changeView('INDEX')
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

export const inputList = [
  { option: '查詢筆劃', hint: '請輸入中文字(可多筆)', buttonName: '查詢', icon: 'search', isRender: false },
  { option: '增加單字', hint: '請輸入中文字(可多筆)', buttonName: '增加', icon: 'add', isRender: true },
  { option: '查詢筆劃組合', hint: '總筆劃數', hintcont: '單字(選填)', buttonName: '查詢', icon: 'search', isRender: true },
  { option: '移除單字', hint: '欲刪除之文字', buttonName: '移除', icon: 'delete', isRender: true },
  { option: '查看所有單字', icon: 'overview', isRender: true },
  { option: '查看已選組合', icon: 'checklist', isRender: true },
  { option: '儲存', icon: 'download', isRender: true },
  { option: '讀取', icon: 'import', isRender: true },
  { option: '匯出', icon: 'excel', isRender: true },
  { option: '載入範本', icon: 'demo', isRender: true },
  { option: '軟體介紹', icon: 'search', isRender: false },
];

export const menuActions = (e, index, props, inputRef, fileInputRef) => {
  if (!e || e.key === 'Enter') {
    switch (index) {
      case 0:
        props.searchStrokes(props.menuInput[0]);
        break;
      case 1:
        props.addCharacter(props.menuInput[1]);
        props.changeView('INDEX')
        const newCharCount = arrayUnique(handleInputString(props.menuInput[1])).reduce((acc, value) =>
          Object.keys(props.character).includes(value) ? acc : ++acc, 0)
        newCharCount !== 0
          ? toastr.success('新增成功', `成功新增了 ${newCharCount} 個中文單字`)
          : toastr.info('沒有新增任何單字', `請查詢是否單字已存在或者輸入為中文`)
        break;
      case 2:
        Number(props.menuInput[2]) > 0 && props.combinationSearch(props.menuInput[2], props.menuInput[4]);
        break;
      case 3:
        props.deleteCharacter(props.menuInput[3]);
        props.changeView('INDEX')
        const deleteCharCount = arrayUnique(handleInputString(props.menuInput[3])).reduce((acc, value) =>
          Object.keys(props.character).includes(value) ? ++acc : acc, 0)
        deleteCharCount !== 0
          ? toastr.success('刪除成功', `成功刪除了 ${deleteCharCount} 個中文單字及其所有組合`)
          : toastr.info('沒有刪除任何單字', `請查詢是否單字不存在或者輸入為中文`)
        break;
      case 4:
        props.changeView('OVERVIEW')
        break;
      case 5:
        props.changeView('OVERVIEW_PICKED')
        break;
      case 6: //download & save
        const saveCharacters = Object.keys(props.character).join('')
        const savePickedComb = props.pickedComb
        downloadTxtFile(
          Array.from(msgpack.encode({ character: saveCharacters, pickedComb: savePickedComb }))
          , 'log_' + dateFormat(Date.now(), "yyyyMMdd_hhmmss"))
        break;
      case 7: //load 觸發input(file) click
        fileInputRef.click()
        break;
      case 8: // 匯出 excel
        const jsonExport = {
          date: dateFormat(Date.now(), "yyyy/MM/dd hh:mm:ss"),
          totalName: Object.keys(props.pickedComb).reduce((acc, index) => acc + props.pickedComb[index].length, 0),
          totalCharacter: Object.keys(props.character).length,
          pickedComb: props.pickedComb,
          groupChar: props.groupChar
        };
          (async () => {
            const rawResponse = await fetch('http://localhost:3000/getExcel', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ a: 1, b: 'Textual content' })
            });
            const content = await rawResponse.json();

            console.log(content);
          })();
        // let url = 'https://hexschool-tutorial.herokuapp.com/api/signup';
        // fetch(url, {
        //   method: 'POST',
        //   // headers 加入 json 格式
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   // body 將 json 轉字串送出
        //   body: JSON.stringify({
        //     email: 'lovef1232e@hexschool.com',
        //     password: '12345678'
        //   })
        // }).then((response) => {
        //   return response.json();
        // }).then((jsonData) => {
        //   console.log(jsonData);
        // }).catch((err) => {
        //   console.log('錯誤:', err);
        // })
        break;
      case 9:
        props.loadData(demoData.character, demoData.pickedComb)
        props.changeView('INDEX')
        const demoCharCount = arrayUnique(handleInputString(demoData.character)).reduce((acc, value) =>
          Object.keys(props.character).includes(value) ? acc : ++acc, 0)
        demoCharCount !== 0 && setTimeout(() => {
          toastr.success('新增成功', `成功新增了 ${demoCharCount} 個中文單字`)
        }, 650)
        toastr.success('載入成功', '成功載入範本')
        break;
      default:
        break;
    }
    (props.menuInput[index] !== '' && e !== null) && inputRef[index].blur()
    props.cleanAllInput()
    props.triggerMenu(false)
  }
}


