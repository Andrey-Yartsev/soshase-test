import axios from 'axios';
import server from './server';

export default async (data) => {
  data.url = server.apiUrl() + data.path;
  return await axios(data);
}