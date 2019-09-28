import React, { PureComponent } from 'react'
import styled from 'styled-components';
import demoData from '../data/demoData';
import menuIcon from '../image/menuIcon.png';
import Color from '../styles/ThemeColor';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import {
  searchStrokes, handleInput, addCharacter, deleteCharacter
  , combinationSearch, inputTextChange, cleanAllInput, changeView, triggerMenu
} from '../actions';

const MenuDiv = styled.div`
  grid-area: menu;
  background:${Color.black[0]};
  @media (max-width: 480px){
    grid-area: null;
    position:fixed;
    z-index:100;
    top:0;
    right:${props => props.expand ? '0' : '-300px'};
    transition:0.5s;
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
  height:50px;
  padding-left:10%;
  font-size:16px;
  color:${Color.text[0]};
  line-height:50px;
  cursor: pointer;
  transition: 0.17s;
  background:${props => props.picked ? Color.redActive : Color.black[0]};
  &:hover{
    background:${props => props.picked ? Color.redActive : Color.redHover};
  }
`;
const TextInput = styled.div`
  transition:0.5s;
  height:${props => props.expand === '' || props.expand === 'closeDiv' ? '0' : '50px'};
  width:100%;
  line-height:50px;
  padding-left:9%;
  box-sizing: border-box;
  overflow: hidden;
  color:${Color.inputBg};
`;
const Input = styled.input`
  padding: 5px 15px;
  background: ${Color.inputBg};
  border: 0 none;
  border-radius:0;
  border-right:1px solid black;
  width:${props => props.single ? '75%' : '37.5%'};
  height:30px;
  box-sizing: border-box;
  display:inline-block;
  vertical-align: middle;
`;
const Button = styled.div`
  height:30px;
  line-height:30px;
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
  filter:invert(0.8);
  cursor:pointer;
  &:hover{
    filter:invert(1);
  }
  @media (max-width: 480px){
    display:none;
  }
`;


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
          break;
        case 2:
          Number(this.props.menuInput[2]) > 0 && this.props.combinationSearch(this.props.menuInput[2], this.props.menuInput[4]);
          break;
        case 3:
          this.props.deleteCharacter(this.props.menuInput[3]);
          this.props.changeView('INDEX')
          break;
        case 4:
          this.props.changeView('OVERVIEW')
          break;
        case 8:
          this.props.addCharacter(demoData);
          break;
      }
      this.props.cleanAllInput();
      this.props.triggerMenu(false);
    }
  }
  focus(index) {
    setTimeout(() => { this.inputFocus[index].focus() }, 500);
  }

  render() {
    const inputList = [
      { option: '查詢筆劃', hint: '請輸入中文字(可多筆)', buttonName: '查詢' },
      { option: '增加單字', hint: '請輸入中文字(可多筆)', buttonName: '增加' },
      { option: '查詢筆劃組合', hint: '總筆劃數', hintcont: '單字', buttonName: '查詢' },
      { option: '移除單字', hint: '欲刪除之文字', buttonName: '移除' },
      { option: '查看所有單字' },
      { option: '儲存' },
      { option: '讀取' },
      { option: '匯出' },
      { option: '載入範本' },
      { option: '軟體介紹' },
    ];
    return (
      <MenuDiv expand={this.props.menuExpand}>
        <MobileHeader />
        <MenuImg onClick={() => this.props.changeView('')} />
        {inputList.map((value, index) => {
          return (
            <div key={index}>
              <Text
                key={index}
                picked={this.props.inputTextSelect === index}
                onClick={() => {
                  this.props.inputTextChange(index);
                  index <= 3 ? this.focus(index) : this.handleKeyPress(null, index);
                }
                }>◆  {value['option']}</Text>
              {index < 4 &&
                <TextInput expand={this.props.menuClassName[index]}>
                  <Input type='text'
                    single={index !== 2}
                    placeholder={value['hint']}
                    ref={(input) => { this.inputFocus[index] = input }}
                    value={this.props.menuInput[index]}
                    onKeyPress={e => this.handleKeyPress(e, index)}
                    onChange={e => this.props.handleInput(e.target.value, index)} />
                  {index === 2 &&
                    <Input type='text'
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
    menuExpand: state.defaultReducer.menuExpand
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
    triggerMenu: (bool) => dispatch(triggerMenu(bool))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);