import request from '../../utils/request';
import fetch from './fetch';

export default async (dispatch, id) => {
  await request({
    method: 'delete',
    path: 'category/' + id
  });
  fetch(dispatch);
};
