import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';

const store = createStore(reducers);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <div>client</div>
      </Provider>
    )
  }
}