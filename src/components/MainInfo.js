import React, { PureComponent } from 'react'
import styled from 'styled-components';
import { ShowDivAni } from '../styles/AnimationStyled';
import { connect } from 'react-redux';
import { changeView } from '../actions';


const MainInfoDiv = styled.div`
  grid-area: mainInfo;
  box-sizing:border-box;
  padding:0 40px;
  line-height:60px;
  color:rgb(138,143,153);
  font-size:14px;
  @media (max-width: 480px) {
    padding:0 20px;
  }
`;
const TextDiv = styled.div`
  height:100%;
  width:100%;
  display: block;
  line-height:60px;
  border-bottom:1px solid rgb(209,215,222);
  box-sizing:border-box;
  @media (max-width: 480px) {
    line-height:30px;
  }
`;
const Text = styled.div`
  animation: ${ShowDivAni} 0.7s 1 both 0.1s;
`;
const HighLight = styled.span`
  color:rgb(63,73,83);
  font-size:16px;
`;
const CheckBtn = styled.label`
  margin:auto 5px auto 5px;
  cursor:pointer;
  color:rgb(45,95,255);
`;



class MainInfo extends PureComponent {
  render() {
    const TextOutput = (view) => {
      const { count, filter } = this.props.combinationFilter;
      const { combinationResult, pickedComb } = this.props;

      switch (view) {
        case "PICKED_OUTPUT":
        case "SEARCH_COMBINATION":
          return (<Text key={1}>
            {`查詢筆劃組合    >>    `}
            {`總筆劃: `}<HighLight>{count}劃</HighLight>
            {filter !== "" && `, 包含 '`}
            <HighLight>{filter !== "" && filter}</HighLight>
            {filter !== "" && `'`}
            {`, 的結果共有`} <HighLight>{combinationResult.length} 筆</HighLight>結果
            {pickedComb[count] && `, 目前已選擇 `}
            <HighLight>
              {pickedComb[count]
                && `${pickedComb[count]
                  ? pickedComb[count].filter(value => value.includes(filter)).length : 0} 筆`}
            </HighLight>
            {pickedComb[count] && `組合`}
            <CheckBtn onClick={() => this.props.changeView(view === "SEARCH_COMBINATION" ? "PICKED_OUTPUT" : "SEARCH_COMBINATION")}>
              {view === "SEARCH_COMBINATION" ? `輸出` : `編輯`}
            </CheckBtn>
          </Text>)
        case "INDEX":
          return (
            <Text key={2}>
              {`首頁    >>    `}
            </Text>
          )
        case "OVERVIEW":
          return (
            <Text key={3}>
              {`單字總覽    >>    `}
            </Text>
          )
        default:
          return (
            <Text key={2}>
              {`首頁    >>    `}
            </Text>
          )
      }
    }
    return (
      <MainInfoDiv>
        <TextDiv>
          {TextOutput(this.props.view)}
        </TextDiv>
      </MainInfoDiv >
    )
  }
}
const mapStateToProps = state => {
  return {
    pickedComb: state.defaultReducer.pickedComb,
    combinationResult: state.defaultReducer.combinationResult,
    combinationFilter: state.defaultReducer.combinationFilter,
    view: state.defaultReducer.view
  }
}
const mapDispatchToProps = dispatch => {
  return {
    changeView: str => dispatch(changeView(str))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainInfo);