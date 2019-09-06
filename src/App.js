import React, { Component } from 'react';
import Index from './components/Index';

import { createStore, applyMiddleware, compose } from 'redux'
import Reducer from './reducers/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// import { logger, crashReporter } from './middlewares';

import { HashRouter as Router, Switch } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// let store = createStore(Reducer,applyMiddleware(thunk))
let store = createStore(Reducer, composeEnhancers(applyMiddleware(thunk)))
// let store = createStore(Reducer, composeEnhancers(applyMiddleware(thunk, logger, crashReporter)))



const Title = styled.div`
  background:white;
  border:2px solid black;
  width:100vw;
  height:100px;
`;

const showText = keyframes`
  0%{
  height:0;
    }
  100%{
  height:100px;
  }
`
const Content = styled.div`
  background:blue;
  width:100vw;
  height:100px;
  animation:${showText} 0.4s 1 both;
`;
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Provider store={store}>
            <Index />
          </Provider>
        </Switch>
      </Router>
        // <Title onClick={() => this.open()}></Title>
        // {this.state.open ? <Content><input></input></Content> : null}
        // <Title></Title>
        // <Content></Content>
        // <Title></Title>
        // <Content></Content>
    );
  }
}

export default App;
