import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { pickName } from '../actions';


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
  box-sizing:border-box;
  display:inline-block;
  padding-top:3px;
  padding-bottom:3px;
  text-align:center;
  cursor: pointer;
  color:${props => props.picked ? 'white' : 'black'};
  font-weight:${props => props.picked ? 'bold' : 'normal'};
  &:hover{
    background: ${props => props.picked ? '#666' : '#DDD'};
  }
  background: ${props => props.picked ? 'black' : 'white'};
  /* @media (max-width: 700px) {
        background: green;
    } */
`;



class Combination extends PureComponent {
  render() {
    return (
      <MainDiv>
        {this.props.combinationResult.map((value, index) => {
          return (
            <Button
              onClick={() => this.props.pickName(value)}
              key={index}
              picked={this.props.pickedComb.includes(value)} >
              {value}
            </Button>
          )
        })
        }
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
      </MainDiv >
    )
  }
}

const mapStatetoProps = state => {
  return {
    combinationResult: state.combinationResult,
    pickedComb: state.pickedComb
  }
}
const mapDispatchToProps = dispatch => {
  return {
    pickName: (str) => dispatch(pickName(str))
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Combination);
