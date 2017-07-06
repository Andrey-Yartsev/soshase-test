import request from '../../utils/request';
import fetch from './fetch';

export default async (dispatch, id) => {
  await request(dispatch, {
    method: 'delete',
    path: 'product/' + id
  });
  fetch(dispatch);
};
