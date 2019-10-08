import React, { PureComponent } from 'react'
import styled from 'styled-components';
import demoData from '../data/demoData';
import menuIcon from '../image/menuIcon.png';
import Color from '../styles/ThemeColor';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import {
  searchStrokes, handleInput, addCharacter, deleteCharacter, loadData
  , combinationSearch, inputTextChange, cleanAllInput, changeView, triggerMenu
} from '../actions';

const getImgSrc = name => {
  return require(`../image/menu/${name}.png`);
}
const MenuDiv = styled.div`
  grid-area: menu;
  background:${Color.black[0]};
  @media (max-width: 480px){
    grid-area: null;
    position:fixed;
    z-index:101;
    top:0;
    right:${props => props.expand ? '0' : '-300px'};
    transition:0.4s;
    opacity:0.9;
    width:300px;
    min-height:100%;
  }
`;
const MobileHeader = styled.div`
  display:none;
  @media (max-width: 480px){
    display:block;
    width:100%;
    height:60px;
  }
`;

const Text = styled.div`
  box-sizing: border-box;
  width:100%;
  height:65px;
  line-height:65px;
  padding-left:10%;
  font-size:17px;
  color:${Color.text[0]};
  cursor: pointer;
  transition: 0.3s;
  background:${props => props.picked ? Color.redActive : Color.black[0]};
  &:hover{
    background:${props => props.picked ? Color.redActive : Color.redHover};
  }
`;
const TextInput = styled.div`
  transition:0.4s;
  height:${props => props.expand === '' || props.expand === 'closeDiv' ? '0' : '65px'};
  width:100%;
  line-height:65px;
  padding-left:9%;
  box-sizing: border-box;
  overflow: hidden;
  color:${Color.inputBg};
`;
const Input = styled.input`
  padding: 5px 7px;
  background: ${Color.inputBg};
  border: 0 none;
  border-radius:0;
  border-right:1px solid black;
  width:${props => props.single ? '75%' : '37.5%'};
  height:35px;
  box-sizing: border-box;
  display:inline-block;
  vertical-align: middle;
`;
const Button = styled.div`
  height:35px;
  line-height:35px;
  border: 0 none;
  border-radius:0;
  background: #EEE;
  font-size:13px;
  color:Black;
  padding-left:5px;
  padding-right:5px;
  cursor: pointer;
  box-sizing: border-box;
  vertical-align: middle;
  display:inline-block;
`;
const MenuImg = styled.img`
  content:url(${menuIcon});
  transition: 0.3s;
  height:60px;
  width:60px;
  padding:27px 95px 27px 95px;
  margin-bottom:15px;
  filter:invert(0.8);
  cursor:pointer;
  &:hover{
    filter:invert(1);
  }
  @media (max-width: 480px){
    display:none;
  }
`;
const IconDiv = styled.div`
  display:inline-block;
  width:15px;
  height:15px;
  margin-right:20px;
  position: relative;
  top:1px;
  background-image: url(${props => props.icon});
  background-size: cover;  
  filter: invert(1);
`;


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

class Menu extends PureComponent {
  constructor() {
    super();
    this.inputFocus = new Array(4);
    for (let i = 0; i < 4; i++)
      this.inputFocus[i] = React.createRef();
  }
  handleKeyPress = (e, index) => {
    if (!e || e.key === 'Enter') {
      switch (index) {
        case 0:
          this.props.searchStrokes(this.props.menuInput[0]);
          break;
        case 1:
          this.props.addCharacter(this.props.menuInput[1]);
          this.props.changeView('INDEX')
          const newCharCount = arrayUnique(handleInputString(this.props.menuInput[1])).reduce((acc, value) => {
            return Object.keys(this.props.character).includes(value) ? acc : ++acc
          }, 0)
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
          const deleteCharCount = arrayUnique(handleInputString(this.props.menuInput[3])).reduce((acc, value) => {
            return Object.keys(this.props.character).includes(value) ? ++acc : acc
          }, 0)
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
        case 9:
          this.props.loadData(demoData.characters, demoData.pickedComb)
          this.props.changeView('INDEX')
          const demoCharCount = arrayUnique(handleInputString(demoData.characters)).reduce((acc, value) => {
            return Object.keys(this.props.character).includes(value) ? acc : ++acc
          }, 0)
          demoCharCount !== 0 && setTimeout(() => {
            toastr.success('新增成功', `成功新增了 ${demoCharCount} 個中文單字`)
          }, 650)
          toastr.success('載入成功', '成功載入範本')
          break;
      }
      (this.props.menuInput[index] !== '' && e !== null) && this.blur(index)
      this.props.cleanAllInput()
      this.props.triggerMenu(false)
    }
  }
  focus(index) {
    setTimeout(() => { this.inputFocus[index].focus() }, 400);
  }
  blur(index) {
    this.inputFocus[index].blur()
  }

  render() {
    const inputList = [
      { option: '查詢筆劃', hint: '請輸入中文字(可多筆)', buttonName: '查詢', icon: 'search', isRender: false },
      { option: '增加單字', hint: '請輸入中文字(可多筆)', buttonName: '增加', icon: 'add', isRender: true },
      { option: '查詢筆劃組合', hint: '總筆劃數', hintcont: '單字(選填)', buttonName: '查詢', icon: 'search', isRender: true },
      { option: '移除單字', hint: '欲刪除之文字', buttonName: '移除', icon: 'delete', isRender: true },
      { option: '查看所有單字', icon: 'overview', isRender: true },
      { option: '查看已選組合', icon: 'checklist', isRender: true },
      { option: '儲存', icon: 'download', isRender: false },
      { option: '讀取', icon: 'import', isRender: false },
      { option: '匯出', icon: 'excel', isRender: false },
      { option: '載入範本', icon: 'demo', isRender: true },
      { option: '軟體介紹', icon: 'search', isRender: false },
    ];
    return (
      <MenuDiv expand={this.props.menuExpand}>
        <MobileHeader />
        <MenuImg onClick={() => this.props.changeView('')} />
        {inputList.map((value, index) => {
          return (
            <div
              key={index}
              style={value['isRender'] ? {} : { display: 'none' }}
            >
              <Text
                picked={this.props.inputTextSelect === index}
                onClick={() => {
                  this.props.inputTextChange(index);
                  index <= 3 ? this.focus(index) : this.handleKeyPress(null, index);
                }
                }><IconDiv icon={getImgSrc(value['icon'])} />{value['option']}</Text>
              {index < 4 &&
                <TextInput expand={this.props.menuClassName[index]}>
                  <Input type="text"
                    single={index !== 2}
                    placeholder={value['hint']}
                    ref={(input) => { this.inputFocus[index] = input }}
                    value={this.props.menuInput[index]}
                    onKeyPress={e => this.handleKeyPress(e, index)}
                    onChange={e => this.props.handleInput(e.target.value, index)} />
                  {index === 2 &&
                    <Input type="text"
                      single={index !== 2}
                      placeholder={value['hintcont']}
                      value={this.props.menuInput[index + 2]}
                      onKeyPress={e => this.handleKeyPress(e, index)}
                      onChange={e => this.props.handleInput(e.target.value, index + 2)} />}
                  <Button onClick={() => this.handleKeyPress(null, index)}>{value['buttonName']}</Button>
                </TextInput>}
            </div>
          )
        })}
      </MenuDiv >
    )
  }
}
const mapStateToProps = state => {
  return {
    inputTextSelect: state.defaultReducer.inputTextSelect,
    menuClassName: state.defaultReducer.menuClassName,
    menuInput: state.defaultReducer.menuInput,
    menuExpand: state.defaultReducer.menuExpand,
    character: state.defaultReducer.character
  }
}
const mapDispatchToProps = dispatch => {
  return {
    searchStrokes: str => dispatch(searchStrokes(str)),
    combinationSearch: (num, str) => dispatch(combinationSearch(num, str)),
    addCharacter: str => dispatch(addCharacter(str)),
    deleteCharacter: str => dispatch(deleteCharacter(str)),
    handleInput: (value, inputOption) => dispatch(handleInput(value, inputOption)),
    inputTextChange: num => dispatch(inputTextChange(num)),
    cleanAllInput: () => dispatch(cleanAllInput()),
    changeView: str => dispatch(changeView(str)),
    triggerMenu: (bool) => dispatch(triggerMenu(bool)),
    loadData: (character, pickedComb) => dispatch(loadData(character, pickedComb))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);