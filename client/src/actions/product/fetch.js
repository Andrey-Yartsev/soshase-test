import request from '../../utils/request';

export default async (dispatch, page, category) => {
  if (!page) page = 1;
  const result = await request(dispatch, {
    method: 'get',
    path: 'products?page=' + page + (category ? '&category=' + category : '')
  });
  if (result) {
    dispatch({
      type: 'SET_PRODUCTS',
      data: result.data
    });
  }
};
