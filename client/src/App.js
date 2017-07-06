import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { modelReducer, formReducer } from 'react-redux-form';
import { combineForms } from 'react-redux-form';

import reducers from './reducers';
import Layout from './components/Layout';

import './bootstrap/css/bootstrap.css';

const store = createStore(combineReducers(
  Object.assign(reducers, {
    product: modelReducer('product'),
    productForm: formReducer('product'),
    category: modelReducer('category'),
    categoryForm: formReducer('category'),
  })
), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <Layout/>
      </Provider>
    )
  }
}