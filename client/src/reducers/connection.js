export default (state = {}, action) => {
  switch (action.type) {
    case 'CONNECTION_IS_ABSENT':
      return Object.assign({}, state, {
        isAbsent: action.isAbsent
      });
    default:
      return state;
  }
};