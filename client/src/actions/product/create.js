import request from '../../utils/request';
import fetch from './fetch';

export default async (dispatch, data) => {
  await request(dispatch, {
    method: 'post',
    path: 'product',
    data: data
  });
  fetch(dispatch);
};
