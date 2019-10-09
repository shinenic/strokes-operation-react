import React, { PureComponent } from 'react'
import styled from 'styled-components'
import NoDataHit from './NoDataHit'
import { connect } from 'react-redux'
import { changeView } from '../actions'
import { ShowDivAni } from '../styles/AnimationStyled'

const PickedOutputDiv = styled.div`
  height:${props => 'calc(' + props.height + 'px - 150px)'};
  width:${props => 'calc(' + props.width + 'px - 260px)'};
  box-sizing:border-box;
  padding:40px;
  overflow: auto;
  animation: ${ShowDivAni} 0.7s 1 both 0.4s;
  @media (max-width: 480px) {
    height:auto;
    width:100%;
    padding:20px;
  }
`
const Cell = styled.div`
  box-sizing:border-box;
  display:inline-block;
  padding:10px;
  font-size:18px;
  @media (max-width: 480px) {
    font-size:20px;
  }
`

class PickedOutput extends PureComponent {
  render() {
    const { count, filter } = this.props.combinationFilter
    const hasData = (obj) => {
      if (!Object.keys(obj).includes(count)) return false
      if (filter === '' && obj[count].length !== 0) return true
      let result = false
      obj[count].map(value => result = value.includes(filter) ? true : false)
      return result
    }
    return (
      <PickedOutputDiv width={this.props.width} height={this.props.windowHeight}>
        {!hasData(this.props.pickedComb) && <NoDataHit />}
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
    combinationFilter: state.defaultReducer.combinationFilter,
    windowHeight: state.defaultReducer.windowHeight,
    windowWidth: state.defaultReducer.windowWidth
  }
}
const mapDispatchToProps = dispatch => {
  return {
    changeView: str => dispatch(changeView(str))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PickedOutput)
