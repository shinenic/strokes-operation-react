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
`
const Row = styled.div`
  box-sizing:border-box;
  margin:20px 40px;
  display:grid;
  grid-template-columns:60px 1fr;
  grid-template-areas:'index character';
  animation: ${ShowDivAni} 0.4s 1 both ${props => (Number(props.index) * 0.05 + 0.2).toString() + 's'};
`

const OverviewDiv = styled.div`
  height:calc(100vh - 140px);
  width:calc(100vw - 250px);
  box-sizing:border-box;
  overflow: scroll;
  /* ${Row}:nth-child(odd) ${ColumnIndex}{
    border:2px solid black;
  } */
  &::-webkit-scrollbar {
    width: 10px;
  }
  @media (max-width: 480px) {
    height:auto;
    width:100%;
    overflow:hidden;
  }
`

class Overview extends PureComponent {
  render() {
    const data = this.props.groupChar
    return (
      <OverviewDiv>
        {Object.keys(data).length===0 && <NoDataHit/>}
        {Object.keys(data).map((value, index) => {
          return (
            <Row index={index} key={'Row' + index}>
              <ColumnIndex key={'Index' + index}>{value}</ColumnIndex>
              <ColumnChar key={'Char' + index}>
                {data[value].map((value, index) => {
                  return (
                    <span key={'Chars' + index}>
                      {value + ' '}
                    </span>
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
    groupChar: state.defaultReducer.groupChar
  }
}
export default connect(mapStateToProps, null)(Overview)
