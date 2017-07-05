import request from '../../utils/request';

export default async (dispatch, page) => {
  if (!page) page = 1;
  const result = await request({
    method: 'get',
    path: 'products?page=' + page
  });
  dispatch({
    type: 'SET_PRODUCTS',
    data: result.data
  });
};
