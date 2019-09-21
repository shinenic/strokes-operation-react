import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { pickName, changePage } from '../actions';
import arrowImg from '../image/arrow2.png';
import doubleArrowImg from '../image/arrow3.png';


const MainDiv = styled.div`
  position:absolute;
  right:0;
  top:20vh;
  width:calc(100vw - 250px);
  height:80vh;
  border:5px solid black;
  background-color:white;
  padding:30px;
  box-sizing:border-box;
`;

//14*15?
const Button = styled.div`
  width:7.13%;
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

const InfoDiv = styled.div`
  margin:10px;
`;

const PageCtrlDiv = styled.div`
  height:60px;
  width:400px;
  /* border:1px solid black; */
  display:inline-block;
  position:absolute;
  bottom:20px;
  left: 50%;
  transform: translateX(-50%);
`;

const Arrow = styled.img`
  content:url(${arrowImg});
  height:40px;
  width:40px;
  
  cursor: pointer;
  filter:${props => props.enable ? 'invert(0)' : 'invert(0.7)'};
  position: absolute;
  top:50%;
  left:${props => props.dir ? '90px' : '260px'};
  transform:${props => props.dir ? 'rotate(180deg) translateY(50%)' : 'rotate(0) translateY(-50%)'};
  &:hover{
    filter:${props => props.enable ? 'invert(0.35)' : 'invert(0.7)'};
    transition:filter 200ms;
  }
`;
const DoubleArrow = styled(Arrow)`
  content:url(${doubleArrowImg});
  left:${props => props.dir ? '20px' : '330px'};
`;

const PageInfo = styled.div`
  /* border:1px solid black; */
  display:inline-block;
  /* margin-left:10px;
  margin-right:10px; */
  /* vertical-align: middle; */
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;



class Combination extends PureComponent {
  render() {
    return (
      <MainDiv>
        <InfoDiv>
          {`查詢總筆畫: ${this.props.combinationFilter.count}`}
          {this.props.combinationFilter.filter !== "" && `, 包含 '${this.props.combinationFilter.filter}'`}
          {` 的結果共有 ${this.props.combinationResult.length} 筆結果`}
        </InfoDiv>
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
        <PageCtrlDiv>
          <DoubleArrow
            dir={true}
            enable={this.props.currentPage !== 1}
            onClick={() => this.props.currentPage !== 1 && this.props.changePage(false, true)} />
          <Arrow
            dir={true}
            enable={this.props.currentPage !== 1}
            onClick={() => this.props.currentPage !== 1 && this.props.changePage(false, false)} />
          <PageInfo>
            {`Page ${this.props.currentPage} of ${this.props.maxPage}`}
          </PageInfo>
          <Arrow
            dir={false}
            enable={this.props.currentPage !== this.props.maxPage}
            onClick={() => this.props.currentPage !== this.props.maxPage && this.props.changePage(true, false)} />
          <DoubleArrow
            dir={false}
            enable={this.props.currentPage !== this.props.maxPage}
            onClick={() => this.props.currentPage !== this.props.maxPage && this.props.changePage(true, true)} />
        </PageCtrlDiv>
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
    maxPage: state.maxPage,
    currentPage: state.currentPage
  }
}
const mapDispatchToProps = dispatch => {
  return {
    pickName: (str) => dispatch(pickName(str)),
    changePage: (next, double) => dispatch(changePage(next, double))
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Combination);
