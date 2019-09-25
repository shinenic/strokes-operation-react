import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { ShowDivAni } from '../styles/AnimationStyled';
import { connect } from 'react-redux';
import PageCtrl from './PageCtrl';
import { pickName } from '../actions';


const MainDiv = styled.div`
  padding:40px;
  height:100%;
  width:100%;
  box-sizing:border-box;
  position:relative;
  animation: ${ShowDivAni} 0.7s 1 both 0.4s;
`;

//目前顯示個數14*15
const Button = styled.div`
  width:7.13%;
  box-sizing:border-box;
  display:inline-block;
  padding-top:3.5px;
  padding-bottom:3.5px;
  text-align:center;
  cursor: pointer;
  color:${props => props.picked ? 'white' : '#212B35'};
  font-weight:${props => props.picked ? 'bold' : 'normal'};
  background: ${props => props.picked ? 'black' : ''};
  user-select: none;
  -webkit-touch-callout: none;
  &:hover{
    background: ${props => props.picked ? '#666' : '#DDD'};
  }
`;


class Combination extends PureComponent {
  render() {
    return (
      <MainDiv key={this.props.combinationFilter.count}>
        {this.props.currentPageResult.map((value, index) => {
          return (
            <Button
              onClick={() => this.props.pickName(value)}
              key={index}
              picked={Object.keys(this.props.pickedComb).includes(this.props.combinationFilter.count)
                ? this.props.pickedComb[this.props.combinationFilter.count].includes(value) : false}>
              {value}
            </Button>
          )
        })}
        <PageCtrl />

      </MainDiv >
    )
  }
}

const mapStatetoProps = state => {
  return {
    currentPageResult: state.currentPageResult,
    pickedComb: state.pickedComb,
    combinationResult: state.combinationResult,
    combinationFilter: state.combinationFilter,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    pickName: (str) => dispatch(pickName(str)),
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Combination);
