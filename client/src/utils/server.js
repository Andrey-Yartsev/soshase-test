import config from '../config';

export default {

  apiUrl: () => {
    return 'http://' + config.host + ':' + config.port + '/api/v1/';
  }

}