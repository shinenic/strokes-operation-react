import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components';
import "../styles/MenuAnimation.css";
import menuIcon from '../image/menuIcon.png';
import { connect } from 'react-redux';
import { searchStrokes, handleInput, addCharacter, combinationSearch, inputTextChange, cleanAllInput } from '../actions';

const MenuDiv = styled.div`
  position:absolute;
  left:0;
  top:0;
  height:100vh;
  /* width:20vw; */
  width:250px;
  background-color:rgb(49,54,66);
`;

const Text = styled.div`
  box-sizing: border-box;
  width:100%;
  height:50px;
  padding-left:10%;
  font-size:16px;
  color:rgb(255,255,255,0.9);
  line-height:50px;
  cursor: pointer;
  background:${props => props.picked ? '#E44C70' : '#313642'};
  &:hover{
    background:${props => props.picked ? '#E44C70' : '#783E55'};
    transition:background-color 170ms;
  }
`;
const TextInput = styled.div`
  height:0;
  width:100%;
  line-height:50px;
  padding-left:9%;
  box-sizing: border-box;
  overflow: hidden;
  color:rgb(255,255,255,0.9);
`;
const Input = styled.input`
  padding: 5px 15px;
  background: #EEE;
  border: 0 none;
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
  background: #EEE;
  font-size:13px;
  color:rgb(0,0,0,0.9);
  padding-left:5px;
  padding-right:5px;
  cursor: pointer;
  box-sizing: border-box;
  vertical-align: middle;
  display:inline-block;
`;
const MenuImg = styled.img`
  content:url(${menuIcon});
  height:60px;
  width:60px;
  padding:27px 95px 27px 95px;
  filter:invert(1);
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
          this.props.combinationSearch(this.props.menuInput[2], this.props.menuInput[3]);
          break;
        case 3:
          // this.props.searchStrokes(this.props.searchInput);
          break;
      }
      this.props.cleanAllInput();
    }
  }
  focus(index) {
    setTimeout(() => { this.inputFocus[index].focus() }, 500);
  }

  render() {
    const inputList = [
      { option: "查詢筆畫", hint: "請輸入中文字(可多筆)", buttonName: "查詢" },
      { option: "增加單字", hint: "請輸入中文字(可多筆)", buttonName: "增加" },
      { option: "查詢筆劃組合", hint: "總筆劃數", hintcont: "單字", buttonName: "查詢" },
      { option: "移除單字", hint: "欲刪除之文字", buttonName: "移除" },
      { option: "查看所有單字" },
      { option: "儲存" },
      { option: "讀取" },
      { option: "匯出" },
      { option: "載入範本" },
      { option: "軟體介紹" },
    ];
    return (
      <MenuDiv>
        <MenuImg />
        {inputList.map((value, index) => {
          return (
            <div>
              <Text
                key={index}
                picked={this.props.inputTextSelect === index}
                onClick={() => { this.props.inputTextChange(index); this.focus(index); }}>◆  {value['option']}</Text>
              {
                index < 4 &&
                <TextInput className={this.props.menuClassName[index]}>
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
                      value={this.props.menuInput[index + 1]}
                      onKeyPress={e => this.handleKeyPress(e, index)}
                      onChange={e => this.props.handleInput(e.target.value, index + 1)} />}
                  <Button onClick={() => this.handleKeyPress(null, index)}>{value['buttonName']}</Button>
                </TextInput>
              }
            </div>
          )
        })}
      </MenuDiv >
    )
  }
}
const mapStatetoProps = state => {
  return {
    inputTextSelect: state.inputTextSelect,
    menuClassName: state.menuClassName,
    menuInput: state.menuInput
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