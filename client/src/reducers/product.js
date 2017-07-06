export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return Object.assign({}, state, {
        data: action.data
      });
    case 'SET_PAGE':
      return Object.assign({}, state, {
        page: action.page
      });
    default:
      return state;
  }
};