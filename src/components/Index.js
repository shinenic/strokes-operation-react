import React, { PureComponent } from 'react'

import Menu from './Menu';
import Content from './Content';
import styled, { keyframes } from 'styled-components';

import { connect } from 'react-redux';
// import { setTopCard, updateWindowSize } from '../actions';
import { Route } from 'react-router-dom';





class Index extends PureComponent {
  render() {
    return (
      <div>
        {/* <Route exact path="/"
          render={() => {
            return (
              <List />
            );
          }} />
        <Route exact path="/search"
          render={() => {
            return (
              <ResultCard />
            );
          }} /> */}
        <Menu />
        {/* <Content /> */}
      </div>
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
