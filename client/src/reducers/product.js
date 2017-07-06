export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return Object.assign({}, state, {
        data: action.data
      });
    default:
      return state;
  }
};