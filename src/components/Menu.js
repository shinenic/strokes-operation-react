import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components';
import "../styles/MenuAnimation.css"
import { connect } from 'react-redux';
import { searchStrokes, handleInput, addCharacter, combinationSearch, inputTextChange } from '../actions';

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
  font-size:20px;
  line-height:50px;
  cursor: pointer;
`;
const TextInput = styled(Text)`
  overflow: hidden;
  animation:${showDiv} 1s 1 both;
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


class Menu extends PureComponent {
  render() {
    return (
      <MenuDiv>
        <Text onClick={() => { this.props.inputTextChange(1); }}>{this.props.inputTextSelect === 1 ? `查詢筆劃 ▼` : `查詢筆劃 ▶`}</Text>
        {this.props.inputTextSelect === 1 ? <TextInput>
          <Input type="text"
            value={this.props.searchInput}
            onKeyPress={e => {
              if (e.key === 'Enter')
                this.props.searchStrokes(this.props.searchInput)
            }}
            onChange={e => {
              this.props.handleInput(e.target.value, 'searchInput');
            }} />
          <Button onClick={() => { this.props.searchStrokes(this.props.searchInput) }}>GO</Button>
        </TextInput> : null}

        <Border><BlackLine /></Border>
        <Text>增加單字 ▶</Text>
        <Input type="text"
          value={this.props.addInput}
          onChange={e => {
            this.props.handleInput(e.target.value, 'addInput');
          }} />
        <Button onClick={() => { this.props.addCharacter(this.props.addInput) }}>GO</Button>
        <Border><BlackLine /></Border>
        <Text>查詢筆劃組合 ▶</Text>
        <Input type="text"
          value={this.props.combinationInput}
          onChange={e => {
            this.props.handleInput(e.target.value, 'combinationInput');
          }} />
        <Input type="text"
          value={this.props.filterCharInput}
          onChange={e => {
            this.props.handleInput(e.target.value, 'filterCharInput');
          }} />
        <Button onClick={() => { this.props.combinationSearch(this.props.combinationInput, this.props.filterCharInput) }}>GO</Button>
        <Border><BlackLine /></Border>
        <Text>移除單字 ▶</Text>
        <Input type="text"
          value={this.props.removeInput}
          onChange={e => {
            this.props.handleInput(e.target.value, 'removeInput');
          }} />
        <Button>GO</Button>
        <Border><BlackLine /></Border>
        <Text>查看所有單字 ▶</Text>
        <Border><BlackLine /></Border>
        <Text>儲存 ▶</Text>
        <Border><BlackLine /></Border>
        <Text>讀取 ▶</Text>
        <Border><BlackLine /></Border>
        <Text>匯出 ▶</Text>
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
    menuOption: state.menuOption
  }
}
const mapDispatchToProps = dispatch => {
  return {
    searchStrokes: str => dispatch(searchStrokes(str)),
    combinationSearch: (num, str) => dispatch(combinationSearch(num, str)),
    addCharacter: str => dispatch(addCharacter(str)),
    handleInput: (value, inputOption) => dispatch(handleInput(value, inputOption)),
    inputTextChange: num => dispatch(inputTextChange(num)),
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Menu);