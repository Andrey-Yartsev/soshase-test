import request from '../../utils/request';

export default async (dispatch, page, category) => {
  if (!page) page = 1;

  const result = await request({
    method: 'get',
    path: 'products?page=' + page + (category ? '&category=' + category : '')
  });
  dispatch({
    type: 'SET_PRODUCTS',
    data: result.data
  });
};
