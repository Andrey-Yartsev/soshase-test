import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';
import Layout from './components/Layout';

import './bootstrap/css/bootstrap.css';

const store = createStore(reducers);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <Layout/>
      </Provider>
    )
  }
}