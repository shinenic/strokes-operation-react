import React, { PureComponent } from 'react'

import Menu from './Menu';
import Header from './Header';
import MainInfo from './MainInfo';
import Combination from './Combination';
import styled, { keyframes } from 'styled-components';

import { connect } from 'react-redux';
// import { setTopCard, updateWindowSize } from '../actions';
import { Route } from 'react-router-dom';

const GridContainer = styled.div`
  height:100%;
  width:100%;
  display:grid;
  box-sizing:border-box;
  grid-template-columns:250px 1fr;
  grid-template-rows:80px 60px 1fr;
  grid-template-areas:"menu header"
                      "menu mainInfo"
                      "menu main";
`;
const Main = styled.div`
  grid-area: main;
`;





class Index extends PureComponent {
  render() {
    return (
      <GridContainer>
        <Header />
        <Menu />
        <MainInfo />
        <Main>
          <Combination />
        </Main>
        {/* <Menu />
        <Content /> */}
      </GridContainer>
    )
  }
}

const mapStatetoProps = state => {
  return {
    windowHeight: state.windowHeight,
    windowWidth: state.windowWidth,
    menuState: state.menuState,
    isFetchingNewest: state.isFetchingNewest,
    listDisplay: state.listDisplay
  }
}
const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Index);
