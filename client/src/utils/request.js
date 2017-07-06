import axios from 'axios';
import server from './server';

export default async (dispatch, data) => {
  data.url = server.apiUrl() + data.path;
  try {
    const result = await axios(data);
    dispatch({
      type: 'CONNECTION_IS_ABSENT',
      isAbsent: false
    });
    return result;
  } catch (e) {
    if (e.message === 'Network Error') {
      dispatch({
        type: 'CONNECTION_IS_ABSENT',
        isAbsent: true
      });
    }
  }
}