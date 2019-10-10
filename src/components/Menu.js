import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { MenuDiv, UserImg, MobileHeader, Text, TextInput, Input, Button, MenuImg, IconDiv } from './menu/MenuStyled'
import MenuActions from './menu/MenuActions';
import {
  searchStrokes, handleInput, addCharacter, deleteCharacter, loadData
  , combinationSearch, inputTextChange, cleanAllInput, changeView, triggerMenu
} from '../actions';

const inputList = MenuActions.inputList

class Menu extends PureComponent {
  constructor() {
    super();
    this.fileInput = React.createRef();
    this.inputFocus = new Array(4);
    for (let i = 0; i < 4; i++)
      this.inputFocus[i] = React.createRef();
  }
  
  focus(index) {
    setTimeout(() => { this.inputFocus[index].focus() }, 400);
  }
  blur(index) {
    this.inputFocus[index].blur()
  }

  render() {
    return (
      <MenuDiv expand={this.props.menuExpand}>
        <MobileHeader>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/shinenic/strokes-operation-react">
            <UserImg />
          </a>
        </MobileHeader>
        <input type="file" style={{ display: 'none' }} onChange={this.loadFile} ref={(fileInput) => this.fileInput = fileInput} />
        <MenuImg onClick={() => this.props.changeView('')} />
        {inputList.map((value, index) => {
          return (
            <div key={index}
              style={value['isRender'] ? {} : { display: 'none' }} >
              <Text
                picked={this.props.inputTextSelect === index}
                onClick={() => {
                  this.props.inputTextChange(index);
                  index <= 3 ? this.focus(index) : this.menuActions(null, index);
                }
                }><IconDiv icon={value['icon']} />{value['option']}</Text>
              {index < 4 &&
                <TextInput expand={this.props.menuClassName[index]}>
                  <Input type="text"
                    single={index !== 2}
                    placeholder={value['hint']}
                    ref={(input) => { this.inputFocus[index] = input }}
                    value={this.props.menuInput[index]}
                    onKeyPress={e => this.menuActions(e, index)}
                    onChange={e => this.props.handleInput(e.target.value, index)} />
                  {index === 2 &&
                    <Input type="text"
                      single={index !== 2}
                      placeholder={value['hintcont']}
                      value={this.props.menuInput[index + 2]}
                      onKeyPress={e => this.menuActions(e, index)}
                      onChange={e => this.props.handleInput(e.target.value, index + 2)} />}
                  <Button onClick={() => this.menuActions(null, index)}>{value['buttonName']}</Button>
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