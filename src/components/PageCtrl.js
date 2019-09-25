import React, { PureComponent } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { changePage } from '../actions';
import arrowImg from '../image/pageCtrl/arrow2.png';
import doubleArrowImg from '../image/pageCtrl/arrow3.png';


const PageCtrlDiv = styled.div`
  height:60px;
  width:400px;
  position:absolute;
  bottom:40px;
  left:50%;
  transform: translateX(-50%);
  display:grid;
  grid-template-columns:45px 45px 1fr 45px 45px;
  grid-template-rows:0.5fr 0,5fr;
  grid-template-areas:"doubleArrow arrow pageInfo arrowNext doubleArrowNext"
                      "doubleArrow arrow dataInfo arrowNext doubleArrowNext";
`;
const GridDiv = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-area:${props => props.dir};
`;
const Arrow = styled.img`
  content:url(${arrowImg});
  height:32px;
  width:32px;
  cursor: pointer;
  filter:${props => props.enable ? 'invert(0)' : 'invert(0.7)'};
  transform:${props => props.dir === "next" ? 'scaleX(-1)' : ''};
  display: grid;
  justify-content: center;
  align-items: center;
  &:hover{
    filter:${props => props.enable ? 'invert(0.35)' : 'invert(0.7)'};
    transition:filter 200ms;
  }
`;
const DoubleArrow = styled(Arrow)`
  content:url(${doubleArrowImg});
`;

const PageInfo = styled.div`
  display: grid;
  grid-area:pageInfo;
  justify-content: center;
  align-items: center;
`;
const DataInfo = styled(PageInfo)`
  grid-area:dataInfo;
`;




class PageCtrl extends PureComponent {
  render() {
    return (
      <PageCtrlDiv>
        <GridDiv dir={'doubleArrow'}>
          <DoubleArrow
            dir={"next"}
            enable={this.props.currentPage !== 1}
            onClick={() => this.props.currentPage !== 1 && this.props.changePage(false, true)} />
        </GridDiv>

        <GridDiv dir={'arrow'}>
          <Arrow
            dir={"next"}
            enable={this.props.currentPage !== 1}
            onClick={() => this.props.currentPage !== 1 && this.props.changePage(false, false)} />
        </GridDiv>

        <GridDiv dir={'arrowNext'}>
          <Arrow
            dir={"pre"}
            enable={this.props.currentPage !== this.props.maxPage}
            onClick={() => this.props.currentPage !== this.props.maxPage && this.props.changePage(true, false)} />
        </GridDiv>

        <GridDiv dir={'doubleArrowNext'}>
          <DoubleArrow
            dir={"pre"}
            enable={this.props.currentPage !== this.props.maxPage}
            onClick={() => this.props.currentPage !== this.props.maxPage && this.props.changePage(true, true)} />
        </GridDiv>


        <PageInfo>
          {`Page ${this.props.currentPage} of ${this.props.maxPage}`}
        </PageInfo>
        <DataInfo>
          {`Result ${(this.props.currentPage - 1) * 14 * 15 + 1} - 
          ${this.props.maxPage === this.props.currentPage ?
              this.props.combinationResult.length : this.props.currentPage * 14 * 15}`}
        </DataInfo>



      </PageCtrlDiv>
    )
  }
}
const mapStatetoProps = state => {
  return {
    maxPage: state.maxPage,
    currentPage: state.currentPage,
    combinationResult: state.combinationResult,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    changePage: (next, double) => dispatch(changePage(next, double))
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(PageCtrl);