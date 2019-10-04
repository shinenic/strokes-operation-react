import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { changeView } from '../actions'
import { ShowDivAni } from '../styles/AnimationStyled'

// 著手撰寫RWD中
const PickedOutputDiv = styled.div`
  /* height:calc(100vh - 150px);
  width:calc(100vw - 260px); */
  height:${props=>'calc('+props.height+'px - 150px)'};
  width:${props=>'calc('+props.width+'px - 260px)'};
  box-sizing:border-box;
  padding:40px;
  overflow: scroll;
  animation: ${ShowDivAni} 0.7s 1 both 0.4s;
  @media (max-width: 480px) {
    /* height:calc(100vh - 90px);
    width:calc(100vw - 260px); */
  }
`
const Cell = styled.div`
  box-sizing:border-box;
  display:inline-block;
  padding:10px;
  font-size:18px;
  @media (max-width: 480px) {
  font-size:16px;
  }
`

class PickedOutput extends PureComponent {
  render() {
    const { count, filter } = this.props.combinationFilter
    return (
      <PickedOutputDiv width={this.props.width} height={this.props.windowHeight}>
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
