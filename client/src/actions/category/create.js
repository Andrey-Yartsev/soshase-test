import request from '../../utils/request';
import fetch from './fetch';

export default async (dispatch, title) => {
  await request(dispatch, {
    method: 'post',
    path: 'category',
    data: {title}
  });
  fetch(dispatch);
};
