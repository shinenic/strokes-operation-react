import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';

const MainDiv = styled.div`
  position:absolute;
  right:0;
  top:15vh;
  width:70vw;
  height:85vh;
  background-color:white;
  padding:10px;
  box-sizing:border-box;
`;

const Button = styled.div`
  width:10%;
  /* border:1px solid black; */
  box-sizing:border-box;
  display:inline-block;
  padding-top:3px;
  padding-bottom:3px;
  text-align:center;
  cursor: pointer;
  &:hover{
    background:#DDD;
  }
  background: ${props => props.picked ? 'gray' : 'white'};
  /* @media (max-width: 700px) {
        background: green;
    } */
`;



class Combination extends PureComponent {
  render() {
    return (
      <MainDiv>
        <Button>測試</Button>
        <Button picked={true}>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
        <Button>測試</Button>
      </MainDiv>
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
export default connect(mapStatetoProps, mapDispatchToProps)(Combination);
