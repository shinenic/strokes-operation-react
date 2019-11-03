import React, { Component } from 'react';
import Index from './components/Index';

import { createStore, applyMiddleware, compose } from 'redux'
import Reducer from './reducers/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// import { logger, crashReporter } from './middlewares';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(Reducer, composeEnhancers(applyMiddleware(thunk)))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

export default App;
