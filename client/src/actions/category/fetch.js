import request from '../../utils/request';

export default async (dispatch, page) => {
  if (!page) page = 1;
  const result = await request({
    method: 'get',
    path: 'category'
  });
  dispatch({
    type: 'SET_CATEGORIES',
    data: result.data
  });
};
