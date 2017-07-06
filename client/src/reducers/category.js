export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return Object.assign({}, state, {
        items: action.data
      });
    default:
      return state;
  }
};