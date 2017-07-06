import request from '../../utils/request';
import fetch from './fetch';

export default async (store, id, data) => {
  await request({
    method: 'put',
    path: 'product/' + id,
    data: data
  });
  const state = store.getState().products;
  let category = state.category || false;
  fetch(
    store.dispatch,
    state.page,
    category
  );
};
