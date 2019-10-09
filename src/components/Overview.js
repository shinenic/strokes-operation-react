import React, { PureComponent } from 'react'
import styled from 'styled-components'
import NoDataHit from './NoDataHit'
import { connect } from 'react-redux'
import { ShowDivAni } from '../styles/AnimationStyled'

const ColumnIndex = styled.div`
  grid-area:index;
  width:50px;
  display: grid;
  justify-content: center;
  align-items: center;
  
  box-sizing:border-box;
  padding:5px;
  font-weight:bold;
  font-size:18px;
`

const ColumnChar = styled.div`
  box-sizing:border-box;
  padding:5px;
  grid-area:character;
  border-bottom:1px solid rgb(209,215,222);
  font-size:18px;
`
const Row = styled.div`
  box-sizing:border-box;
  margin:20px 40px;
  display:grid;
  grid-template-columns:60px 1fr;
  grid-template-areas:'index character';
  animation: ${ShowDivAni} 0.4s 1 both ${props => (Number(props.index) * 0.05 + 0.2).toString() + 's'};
  @media (max-width: 480px) {
    grid-template-columns:50px 1fr;
    margin:0 20px 40px 10px;
  }
`

const OverviewDiv = styled.div`
  height:calc(100vh - 140px);
  width:calc(100vw - 250px);
  box-sizing:border-box;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  @media (max-width: 480px) {
    height:auto;
    width:100%;
    overflow:hidden;
  }
`
const NameDiv = styled.div`
  display:inline-block;
  margin:6px;
  width:40px;
`;

class Overview extends PureComponent {
  render() {
    const data = this.props.view === 'OVERVIEW' ? this.props.groupChar : this.props.pickedComb
    return (
      <OverviewDiv>
        {Object.keys(data).length === 0 && <NoDataHit />}
        {Object.keys(data).map((value, index) => {
          return (
            // 已選擇組合畫面中, 若有 key(筆劃總和)之 value(組合)為空的則不顯示該 row
            !(this.props.view === 'OVERVIEW_PICKED' && data[value].length === 0) &&
            <Row index={index} key={'Row' + index}>
              <ColumnIndex key={'Index' + index}>{value}</ColumnIndex>
              <ColumnChar key={'Char' + index}>
                {data[value].map((value, index) => {
                  return (
                    this.props.view === 'OVERVIEW'
                      ? <span key={'Chars' + index}>
                        {value + ' '}
                      </span>
                      : <NameDiv key={'Names' + index} >
                        {value}
                      </NameDiv>
                  )
                })}
              </ColumnChar>
            </Row>
          )
        })}

      </OverviewDiv>
    )
  }
}

const mapStateToProps = state => {
  return {
    pickedComb: state.defaultReducer.pickedComb,
    groupChar: state.defaultReducer.groupChar,
    view: state.defaultReducer.view,
  }
}
export default connect(mapStateToProps, null)(Overview)
