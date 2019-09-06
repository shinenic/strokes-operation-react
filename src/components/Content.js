import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import Pusheen from '../image/Pusheen3.png';

const MenuDiv = styled.div`
  position:absolute;
  right:0;
  top:0;
  width:70vw;
  height:100vh;
  background-color:white;
`;



class Content extends PureComponent {
  render() {
    return (
      <MenuDiv>
        總單字數:0
                <br />
        已選擇組合數:0
                <br />
        儲存狀態:有變更未儲存
                {/* 0.沒有任何資料 1.有變更未儲存 2.所有變更皆已儲存 3.讀取成功 */}
        <br />
        儲存時間:2000/01/01
                <br />
                {JSON.stringify(this.props.searchResult)}
      </MenuDiv>
    )
  }
}

const mapStatetoProps = state => {
  return {
    searchResult: state.searchResult
  }
}
const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Content);
