import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { MenuDiv, UserImg, MobileHeader, Text, TextInput, Input, Button, MenuImg, IconDiv } from './menu/MenuStyled'
import { inputList, menuActions, loadFile } from './menu/MenuActions';
import {
  searchStrokes, handleInput, addCharacter, deleteCharacter, loadData
  , combinationSearch, inputTextChange, cleanAllInput, changeView, triggerMenu
} from '../actions';


class Menu extends PureComponent {
  constructor() {
    super();
    this.fileInputRef = React.createRef();
    this.inputRef = new Array(4);
    for (let i = 0; i < 4; i++)
      this.inputRef[i] = React.createRef();
  }

  focus(index) {
    setTimeout(() => { this.inputRef[index].focus() }, 400);
  }

  render() {
    return (
      <MenuDiv expand={this.props.menuExpand}>

        <MobileHeader>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/shinenic/strokes-operation-react">
            <UserImg />
          </a>
        </MobileHeader>
        <MenuImg onClick={() => this.props.changeView('')} />

        {inputList.map((value, index) => {
          return (
            <div key={index}
              style={value['isRender'] ? {} : { display: 'none' }} >
              <Text
                picked={this.props.inputTextSelect === index && index < 6}
                onClick={() => {
                  // 切換目前選取的 options
                  this.props.inputTextChange(index);
                  // 若 option 有 textBox 則 focus 反之則直接進入動作
                  index <= 3 ? this.focus(index) : menuActions(null, index, this.props, this.inputRef, this.fileInputRef);
                }
                }><IconDiv icon={value['icon']} />{value['option']}</Text>
              {index < 4 &&
                <TextInput expand={this.props.menuClassName[index]}>
                  <Input type="text"
                    single={index !== 2}
                    placeholder={value['hint']}
                    ref={(input) => { this.inputRef[index] = input }}
                    value={this.props.menuInput[index]}
                    onKeyPress={e => menuActions(e, index, this.props, this.inputRef)}
                    onChange={e => this.props.handleInput(e.target.value, index)} />
                  {index === 2 &&
                    <Input type="text"
                      single={index !== 2}
                      placeholder={value['hintcont']}
                      value={this.props.menuInput[index + 2]}
                      onKeyPress={e => menuActions(e, index, this.props, this.inputRef)}
                      onChange={e => this.props.handleInput(e.target.value, index + 2)} />}
                  <Button onClick={() => menuActions(null, index, this.props, this.inputRef)}>{value['buttonName']}</Button>
                </TextInput>}
            </div>
          )
        })}
        {/* 上傳檔案使用之隱藏 input */}
        <input type="file" style={{ display: 'none' }} onChange={() => loadFile(this.props)} ref={(fileInput) => this.fileInputRef = fileInput} />
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
    character: state.defaultReducer.character,
    pickedComb: state.defaultReducer.pickedComb
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