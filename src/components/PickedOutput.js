import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { changeView } from '../actions'
import { ShowDivAni } from '../styles/AnimationStyled'

const PickedOutputDiv = styled.div`
  height:calc(100vh - 150px);
  width:calc(100vw - 260px);
  box-sizing:border-box;
  padding:40px;
  overflow: scroll;
  animation: ${ShowDivAni} 0.7s 1 both 0.4s;
`
const Cell = styled.div`
  box-sizing:border-box;
  display:inline-block;
  padding:10px;
  font-size:18px;
`

class PickedOutput extends PureComponent {
  render() {
    const { count, filter } = this.props.combinationFilter
    return (
      <PickedOutputDiv>
        {this.props.pickedComb[count] &&
          this.props.pickedComb[count].map((value, index) => {
            if (!value.includes(filter)) {
              return null
            } else {
              return (
                <Cell key={index}>
                  {value}
                </Cell>
              )
            }
          })}
      </PickedOutputDiv>
    )
  }
}

const mapStateToProps = state => {
  return {
    pickedComb: state.defaultReducer.pickedComb,
    combinationFilter: state.defaultReducer.combinationFilter
  }
}
const mapDispatchToProps = dispatch => {
  return {
    changeView: str => dispatch(changeView(str))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PickedOutput)
