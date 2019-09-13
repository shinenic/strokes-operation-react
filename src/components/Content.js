import React, { PureComponent } from 'react';
import Combination from './Combination';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import Pusheen from '../image/Pusheen3.png';
import { testTrigger } from '../actions';

const showDiv = keyframes`
  0%{
  height:0;
  }
  100%{
  height:20vh;
  }
`;

const showDiv2 = keyframes`
  0%{
  height:20vh;
  }
  100%{
  height:40vh;
  }
`;

const MainDiv = styled.div`
  position:absolute;
  right:0;
  top:0;
  width:80vw;
  height:100vh;
  background-color:white;
`;

const Info = styled(MainDiv)`
  height:20vh;
  background:#AFEAAE;
  animation:${props => props.infoani ? showDiv : showDiv2} 1s 1 both 500ms;
`;



class Content extends PureComponent {
  render() {
    return (
      <MainDiv>
        <Info infoani={this.props.test} onClick={() => { this.props.testTrigger(!this.props.test); }}>
          總單字數:{Object.keys(this.props.character).length}
          <br />
          已選擇組合數:0
                <br />
          儲存狀態:有變更未儲存
                {/* 0.沒有任何資料 1.有變更未儲存 2.所有變更皆已儲存 3.讀取成功 */}
          <br />
          儲存時間:2000/01/01
                <br />
          {JSON.stringify(this.props.searchResult)}
          <br />
          查詢筆畫數為"{this.props.searchCombinatinoCount}" 總計 {this.props.combinationResult.length} 筆資料 輸出
        </Info>
        <Combination />
      </MainDiv>
    )
  }
}

const mapStatetoProps = state => {
  return {
    searchResult: state.searchResult,
    combinationInput: state.combinationInput,
    combinationResult: state.combinationResult,
    searchCombinatinoCount: state.searchCombinatinoCount,
    character: state.character,
    test: state.test
  }
}
const mapDispatchToProps = dispatch => {
  return {
    testTrigger: (tf) => dispatch(testTrigger(tf))
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Content);
