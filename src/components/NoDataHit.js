import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import { connect } from 'react-redux'
import { ShowDivAni } from '../styles/AnimationStyled'
import { triggerMenu } from '../actions';

const NoDataDiv = styled.div`
    width:100%;
    text-align:center;
    height:50px;
    line-height:50px;
    font-size:18px
    margin:180px auto;
    animation: ${ShowDivAni} 0.7s 1 both 0.2s;
    @media (max-width: 480px) {
      margin: 90px auto 0 auto;
    }
`;


class NoDataHit extends PureComponent {
  render() {
    const text = (view) => {
      switch(view){
        case 'OVERVIEW':
          return '資料庫尚無任何中文單字，請先新增單字'
        case 'SEARCH_COMBINATION':
          return '您所輸入的查詢條件沒有任何搜尋結果'
        case 'PICKED_OUTPUT':
          return '目前該搜尋條件下沒有任何被選中的組合'
        default :
          return ''
      }
    }
    return (
      <NoDataDiv>
        {text(this.props.view)}
      </NoDataDiv>
    )
  }
}

const mapStateToProps = state => {
  return {
    view: state.defaultReducer.view
  }
}
export default connect(mapStateToProps, null)(NoDataHit)
