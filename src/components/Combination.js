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
  /* width:7.13%; */
  /* width:13.33%; */
  width:${props => props.width < 480 ? '13.33%' : '7.13%'};
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
              width={this.props.windowWidth}
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

const mapStateToProps = state => {
  return {
    currentPageResult: state.defaultReducer.currentPageResult,
    pickedComb: state.defaultReducer.pickedComb,
    combinationResult: state.defaultReducer.combinationResult,
    combinationFilter: state.defaultReducer.combinationFilter,
    windowHeight: state.defaultReducer.windowHeight,
    windowWidth: state.defaultReducer.windowWidth,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    pickName: (str) => dispatch(pickName(str)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Combination);
