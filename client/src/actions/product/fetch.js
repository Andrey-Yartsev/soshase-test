import request from '../../utils/request';

export default async (dispatch) => {
  const result = await request({
    method: 'get',
    path: 'products'
  });
  dispatch({
    action: 'SET_PRODUCTS',
    data: result.data
  });
};
