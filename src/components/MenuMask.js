import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import { connect } from 'react-redux'
import { ShowDivAni } from '../styles/AnimationStyled'
import { triggerMenu } from '../actions';

export const FadeInDiv = keyframes`
  from{
    opacity:0;
    }
  to{
    opacity:0.3;
  }
`;
const MenuMaskDiv = styled.div`
  width:100vw;
  height:100vh;
  background:black;
  opacity:0.3;
  z-index:100;
  animation: ${FadeInDiv} 0.4s 1 both ;
`;

class MenuMask extends PureComponent {
  render() {
    return (
      <MenuMaskDiv onClick={() => this.props.triggerMenu()} />
    )
  }
}

const mapStateToProps = state => {
  return {
    groupChar: state.defaultReducer.groupChar
  }
}
const mapDispatchToProps = dispatch => {
  return {
    triggerMenu: (bool) => dispatch(triggerMenu(bool))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuMask)
