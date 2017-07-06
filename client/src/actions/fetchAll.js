import fetchCategories from './category/fetch';
import fetchProducs from './product/fetch';

export default async (dispatch) => {
  await fetchCategories(dispatch);
  await fetchProducs(dispatch);
};
