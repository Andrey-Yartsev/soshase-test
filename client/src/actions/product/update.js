import request from '../../utils/request';
import fetch from './fetch';

export default async (store, id, data) => {
  await request({
    method: 'put',
    path: 'product/' + id,
    data: data
  });
  fetch(store.dispatch, store.getState().products.page);
};
