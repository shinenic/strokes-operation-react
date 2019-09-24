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
    );
  }
}

export default App;
