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
    case 'SET_PAGE_CATEGORY':
      return Object.assign({}, state, {
        category: action.category
      });
    default:
      return state;
  }
};