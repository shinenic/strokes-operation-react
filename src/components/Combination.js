import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { pickName, changePage } from '../actions';
import arrowImg from '../image/arrow2.png';
import arrowDisableImg from '../image/arrow-disable2.png';


const MainDiv = styled.div`
  position:absolute;
  right:0;
  top:20vh;
  width:calc(100vw - 250px);
  /* height:85vh; */
  background-color:white;
  padding:10px;
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

`;

const PageCtrlDiv = styled.div`
  height:60px;
  width:240px;
  border:1px solid black;
  display:inline-block;
  /* background:black; */
`;

const Arrow = styled.img`
  content:url(${props => props.enable ? arrowImg : arrowDisableImg});
  height:40px;
  width:40px;
  transform:${props => props.dir ? 'rotate(180deg)' : 'rotate(0)'};
  cursor: pointer;
  &:hover{
    filter:${props => props.enable ? 'invert(0.2)' : 'invert(0)'};
    transition:filter 200ms;
  }
`;

const PageInfo = styled.div`
  border:1px solid black;
  display:inline-block;
  margin-left:10px;
  margin-right:10px;
`;



class Combination extends PureComponent {
  render() {
    const infoText = [`查詢總筆畫: ${this.props.combinationFilter.count}`, `, 包含 '${this.props.combinationFilter.filter}' `]
    const infoTextCont = this.props.combinationFilter.filter !== "" ? `, 包含 '${this.props.combinationFilter.filter}' ` : `` + `的結果共有`;
    return (
      <MainDiv>
        <InfoDiv>{infoText}{infoTextCont}</InfoDiv>
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
          <Arrow
            dir={true}
            enable={this.props.currentPage !== 1}
            onClick={() => this.props.currentPage !== 1 && this.props.changePage(false)} />
          <PageInfo>
            {`Page ${this.props.currentPage} of ${this.props.maxPage}`}
          </PageInfo>
          <Arrow
            dir={false}
            enable={this.props.currentPage !== this.props.maxPage}
            onClick={() => this.props.currentPage !== this.props.maxPage && this.props.changePage(true)} />
        </PageCtrlDiv>
      </MainDiv >
    )
  }
}

const mapStatetoProps = state => {
  return {
    currentPageResult: state.currentPageResult,
    pickedComb: state.pickedComb,
    combinationFilter: state.combinationFilter,
    maxPage: state.maxPage,
    currentPage: state.currentPage
  }
}
const mapDispatchToProps = dispatch => {
  return {
    pickName: (str) => dispatch(pickName(str)),
    changePage: (next) => dispatch(changePage(next))
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Combination);
