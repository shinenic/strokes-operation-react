import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components';
// import CatImage from '../image/Pusheen1.png';
import CatImage from '../image/cat.png';
import { connect } from 'react-redux';
import { cleanAllInput } from '../actions';

const MainInfoDiv = styled.div`
  grid-area: mainInfo;
  box-sizing:border-box;
  padding:0 40px 0 40px;
  color:rgb(138,143,153);
  /* color:rgb(168,173,183); */
  font-size:14px;
`;
const TextDiv = styled.div`
  height:100%;
  width:100%;
  display: block;
  line-height:60px;
  border-bottom:1px solid rgb(209,215,222);
  box-sizing:border-box;
`;
const HighLight = styled.span`
  color:rgb(63,73,83);
  font-size:16px;
`;
const CheckBtn = styled.label`
  /* display:inline-block; */
  margin:auto 5px auto 5px;
  cursor:pointer;
  color:rgb(45,95,255);
`;



class MainInfo extends PureComponent {
  render() {
    return (
      <MainInfoDiv>
        <TextDiv>
          {`查詢筆劃組合    >>    `}
          {`總筆畫: `}<HighLight>{this.props.combinationFilter.count}畫</HighLight>
          {this.props.combinationFilter.filter !== "" && `, 包含 '`}
          <HighLight>{this.props.combinationFilter.filter !== "" && this.props.combinationFilter.filter}</HighLight>
          {this.props.combinationFilter.filter !== "" && `'`}
          {`, 的結果共有`} <HighLight>{this.props.combinationResult.length} 筆</HighLight>結果
          {this.props.pickedComb[this.props.combinationFilter.count] && `, 目前已選擇 ${this.props.pickedComb[this.props.combinationFilter.count].length} 筆組合`}
          <CheckBtn>輸出</CheckBtn>
        </TextDiv>
      </MainInfoDiv >
    )
  }
}
const mapStatetoProps = state => {
  return {
    pickedComb: state.pickedComb,
    combinationResult: state.combinationResult,
    combinationFilter: state.combinationFilter,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    cleanAllInput: () => dispatch(cleanAllInput())
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(MainInfo);