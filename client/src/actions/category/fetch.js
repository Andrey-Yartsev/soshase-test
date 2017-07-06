import request from '../../utils/request';

export default async (dispatch, page) => {
  if (!page) page = 1;

  const result = await request(dispatch, {
    method: 'get',
    path: 'category'
  });
  if (result) {
    dispatch({
      type: 'SET_CATEGORIES',
      data: result.data
    });
  }
};
