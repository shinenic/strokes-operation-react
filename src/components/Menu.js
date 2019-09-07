import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components';
import "../styles/MenuAnimation.css"
import { connect } from 'react-redux';
import { searchStrokes, handleInput, addCharacter, combinationSearch, inputTextChange, cleanAllInput } from '../actions';

const showDiv = keyframes`
  0%{
  height:0;
  }
  100%{
  height:50px;
  }
`;

const MenuDiv = styled.div`
  position:absolute;
  left:0;
  top:0;
  width:30vw;
  height:100vh;
  background-color:gray;
`;

const Text = styled.div`
  width:100%;
  height:50px;
  padding-left:10%;
  font-size:18px;
  line-height:50px;
  cursor: pointer;
`;
const TextInput = styled(Text)`
  overflow: hidden;
  height:0;
  /* animation:${showDiv} 1s 1 both; */
`;
const Input = styled.input`
  padding:5px 15px; 
  background:#ccc; 
  border:0 none;
  cursor:pointer;
  border-radius: 2px;
  width:70%;
  box-sizing: border-box;
`;
const Button = styled.button`
  border:1px solid black;
  background:white;
`;

const Border = styled(Text)`
  height:2px;
  padding-left:10px;
  padding-right:10px;
  box-sizing: border-box;
`;
const BlackLine = styled.div`
  background:black;
  height:100%;
  width:100%;
`;

const TopPadding = styled.div`
  height:70px;
`;


class Menu extends PureComponent {
  handleKeyPress = (e, inputOption) => {
    if (e.key === 'Enter') {
      switch (inputOption) {
        case 0:
          this.props.searchStrokes(this.props.searchInput);
          break;
        case 1:
          this.props.addCharacter(this.props.addInput);
          break;
        case 2:
          this.props.combinationSearch(this.props.combinationInput, this.props.filterCharInput);
          break;
        case 3:
          // this.props.searchStrokes(this.props.searchInput);
          break;
      }
      this.props.cleanAllInput();
    }
  }
  render() {
    return (
      <MenuDiv>
        <TopPadding />
        <Text onClick={() => this.props.inputTextChange(0)}>查詢筆劃</Text>
        <TextInput className={this.props.menuClassName[0]}>
          <Input type="text"
            value={this.props.searchInput}
            onKeyPress={e => this.handleKeyPress(e, 0)}
            onChange={e => this.props.handleInput(e.target.value, 'searchInput')} />
          <Button onClick={() => { this.props.searchStrokes(this.props.searchInput); this.props.cleanAllInput(); }}>GO</Button>
        </TextInput>
        <Border><BlackLine /></Border>

        <Text onClick={() => this.props.inputTextChange(1)}>增加單字</Text>
        <TextInput className={this.props.menuClassName[1]}>
          <Input type="text"
            value={this.props.addInput}
            onKeyPress={e => this.handleKeyPress(e, 1)}
            onChange={e => this.props.handleInput(e.target.value, 'addInput')} />
          <Button onClick={() => { this.props.addCharacter(this.props.addInput); this.props.cleanAllInput(); }}>GO</Button>
        </TextInput>
        <Border><BlackLine /></Border>

        <Text onClick={() => this.props.inputTextChange(2)}>查詢筆劃組合</Text>
        <TextInput className={this.props.menuClassName[2]}>
          <Input type="text"
            value={this.props.combinationInput}
            onKeyPress={e => this.handleKeyPress(e, 2)}
            onChange={e => this.props.handleInput(e.target.value, 'combinationInput')} />
          <Input type="text"
            onKeyPress={e => this.handleKeyPress(e, 2)}
            value={this.props.filterCharInput}
            onChange={e => {
              this.props.handleInput(e.target.value, 'filterCharInput');
            }} />
          <Button onClick={() => { this.props.combinationSearch(this.props.combinationInput, this.props.filterCharInput); this.props.cleanAllInput(); }}>GO</Button>
        </TextInput>
        <Border><BlackLine /></Border>

        <Text onClick={() => this.props.inputTextChange(3)}>移除單字</Text>
        <TextInput className={this.props.menuClassName[3]}>
          <Input type="text"
            value={this.props.removeInput}
            onKeyPress={e => this.handleKeyPress(e, 3)}
            onChange={e => this.props.handleInput(e.target.value, 'removeInput')} />
          <Button>GO</Button>
        </TextInput>
        <Border><BlackLine /></Border>

        <Text>查看所有單字</Text>
        <Border><BlackLine /></Border>
        <Text>儲存</Text>
        <Border><BlackLine /></Border>
        <Text>讀取</Text>
        <Border><BlackLine /></Border>
        <Text>匯出</Text>
      </MenuDiv >
    )
  }
}
const mapStatetoProps = state => {
  return {
    searchInput: state.searchInput,
    addInput: state.addInput,
    combinationInput: state.combinationInput,
    filterCharInput: state.filterCharInput,
    inputTextSelect: state.inputTextSelect,
    menuClassName: state.menuClassName
  }
}
const mapDispatchToProps = dispatch => {
  return {
    searchStrokes: str => dispatch(searchStrokes(str)),
    combinationSearch: (num, str) => dispatch(combinationSearch(num, str)),
    addCharacter: str => dispatch(addCharacter(str)),
    handleInput: (value, inputOption) => dispatch(handleInput(value, inputOption)),
    inputTextChange: num => dispatch(inputTextChange(num)),
    cleanAllInput: () => dispatch(cleanAllInput())
    // cleanClassName: num => dispatch(cleanClassName(num))
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Menu);