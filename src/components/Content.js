import React, { PureComponent } from 'react';
import Combination from './Combination';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import Pusheen from '../image/Pusheen3.png';

const MainDiv = styled.div`
  position:absolute;
  right:0;
  top:0;
  width:70vw;
  height:100vh;
  background-color:white;
`;

const Info = styled(MainDiv)`
  height:20vh;
  background:#AFEAAE;
`;



class Content extends PureComponent {
  render() {
    return (
      <MainDiv>
        <Info>
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
    character: state.character
  }
}
const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Content);
