import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import { connect } from 'react-redux'
import { ShowDivAni } from '../styles/AnimationStyled'
import { triggerMenu } from '../actions';

const FadeInDiv = keyframes`
  from{
    opacity:0;
    }
  to{
    opacity:0.3;
  }
`;
const MenuMaskDiv = styled.div`
  position:fixed;
  top:0;
  left:0;
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


const mapDispatchToProps = dispatch => {
  return {
    triggerMenu: (bool) => dispatch(triggerMenu(bool))
  }
}
export default connect(null, mapDispatchToProps)(MenuMask)
