import React, { PureComponent } from 'react';

import Menu from './Menu';
import Header from './Header';
import MainInfo from './MainInfo';
import Overview from './Overview';
import Combination from './Combination';
import PickedOutput from './PickedOutput';
import IndexCard from './IndexCard';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';

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
  @media (max-width: 480px) {
    grid-template-columns:100%;
    grid-template-rows:60px 30px 1fr;
    grid-template-areas:"header"
                      "mainInfo"
                      "main";
  }
`;
const Main = styled.div`
  grid-area: main;
  width:100%;
  height:100%;
  @media (max-width: 480px){
    display:none;
  }
`;





class Index extends PureComponent {
  constructor() {
    super();
  }
  componentDidUpdate = (e) => {
    if (false) {
      window.onbeforeunload = () => true
    } else {
      window.onbeforeunload = undefined
    }
  }
  render() {
    const renderView = (view) => {
      switch (view) {
        case "INDEX":
          return <IndexCard />;
        case "SEARCH_COMBINATION":
          return <Combination />;
        case "OVERVIEW":
          return <Overview />;
        case "PICKED_OUTPUT":
          return <PickedOutput />;
        default:
          return <IndexCard />;
      }
    }
    return (
      <GridContainer>
        <Header />
        <Menu />
        <MainInfo />
        <Main>
          {renderView(this.props.view)}
        </Main>
      </GridContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    menuState: state.defaultReducer.menuState,
    view: state.defaultReducer.view
  }
}
const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
