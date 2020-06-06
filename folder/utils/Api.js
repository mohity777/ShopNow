import axios from 'axios';
import {baseUrl, PATH} from './apiPath';

axios.defaults.baseURL = baseUrl;

axios.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    console.log(error);
  },
);

export default class Api {
  static get = async url => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  static post = async (url, data) => {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  static put = async (url, data) => {
    try {
      const response = await axios.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  static delete = async url => {
    try {
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}
