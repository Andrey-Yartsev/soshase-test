export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      console.log(action.data.docs);
      return Object.assign({}, state, {
        data: action.data
      });
    default:
      return state;
  }
};