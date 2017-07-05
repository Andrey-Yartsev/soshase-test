import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

export default componentClass => {
  componentClass.contextTypes = {
    store: PropTypes.object
  };
  const mapStateToProps = state => (state);
  componentClass = connect(
    mapStateToProps
  )(componentClass);
  return componentClass;
}