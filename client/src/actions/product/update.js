import request from '../../utils/request';
import fetch from './fetch';

export default async (dispatch, id, data) => {
  await request({
    method: 'put',
    path: 'product/' + id,
    data: data
  });
  fetch(dispatch);
};
