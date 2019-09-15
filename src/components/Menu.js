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
  padding-left:10%;
  box-sizing: border-box;
  overflow: hidden;
  color:rgb(255,255,255,0.9);
`;
const Input = styled.input`
  padding: 5px 15px;
  background: #EEE;
  border: 0 none;
  border-right:1px solid black;
  width:75%;
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
    const optionList = ["查詢筆劃", "增加單字", "查詢筆劃組合", "移除單字", "查看所有單字", "儲存", "讀取", "匯出", "載入範本", "軟體介紹"];
    const hintList = ["請輸入", "請輸入中文字(可多筆)", "test", "", "", "", "", "", "", "", ""];
    const inputList = [
      { option: "查詢筆畫", hint: "請輸入中文字(可多筆)", name: "searchInput" },
      { option: "增加單字", hint: "請輸入中文字(可多筆)", name: "searchInput" },
      { option: "查詢筆劃組合", hint: "總筆劃數", hintcont: "單字", name: "searchInput" },
      { option: "移除單字", hint: "欲刪除之文字", name: "searchInput" },
      { option: "查看所有單字", name: "searchInput" },
      { option: "儲存", name: "searchInput" },
      { option: "讀取", name: "searchInput" },
      { option: "匯出", name: "searchInput" },
      { option: "載入範本", name: "searchInput" },
      { option: "軟體介紹", name: "searchInput" },
    ];
    return (
      <MenuDiv>
        <MenuImg />
        {inputList.map((value, index) => {
          return (
            <div>
              <Text
                picked={this.props.inputTextSelect === index}
                onClick={() => this.props.inputTextChange(index)}>◆  {inputList[index]['option']}</Text>
              {
                index < 4 &&
                <TextInput className={this.props.menuClassName[index]}>
                  <Input type="text"
                    placeholder={inputList[index]['hint']}
                    value={this.props.menuInput[index]}
                    onKeyPress={e => this.handleKeyPress(e, 0)}
                    onChange={e => this.props.handleInput(e.target.value, index)} />
                  <Button onClick={() => { this.props.searchStrokes(this.props.searchInput); this.props.cleanAllInput(); }}>查詢</Button>
                </TextInput>
              }
            </div>
          )
        })}



        {/* <Text onClick={() => this.props.inputTextChange(0)}>◆  查詢筆劃</Text>
        <TextInput className={this.props.menuClassName[0]}>
          <Input type="text"
            value={this.props.searchInput}
            onKeyPress={e => this.handleKeyPress(e, 0)}
            onChange={e => this.props.handleInput(e.target.value, 'searchInput')} />
          <Button onClick={() => { this.props.searchStrokes(this.props.searchInput); this.props.cleanAllInput(); }}>GO</Button>
        </TextInput>

        <TextSel onClick={() => this.props.inputTextChange(1)}>◆  增加單字</TextSel>
        <TextInput className={this.props.menuClassName[1]}>
          <Input type="text"
            value={this.props.addInput}
            onKeyPress={e => this.handleKeyPress(e, 1)}
            onChange={e => this.props.handleInput(e.target.value, 'addInput')} />
          <Button onClick={() => { this.props.addCharacter(this.props.addInput); this.props.cleanAllInput(); }}>GO</Button>
        </TextInput>

        <Text onClick={() => this.props.inputTextChange(2)}>◆  查詢筆劃組合</Text>
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

        <Text onClick={() => this.props.inputTextChange(3)}>◆  移除單字</Text>
        <TextInput className={this.props.menuClassName[3]}>
          <Input type="text"
            value={this.props.removeInput}
            onKeyPress={e => this.handleKeyPress(e, 3)}
            onChange={e => this.props.handleInput(e.target.value, 'removeInput')} />
          <Button>GO</Button>
        </TextInput>

        <Text>◆  查看所有單字</Text>
        <Text>◆  儲存</Text>
        <Text>◆  讀取</Text>
        <Text>◆  匯出</Text> */}
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