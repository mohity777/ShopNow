import axios from 'axios';
import {baseUrl} from './apiPath';
import store from '../store';

axios.defaults.baseURL = baseUrl;

axios.interceptors.request.use(
  config => {
    const token = store.getState().user.token;
    config.headers['Content-Type'] = 'application/json';
    if (token != '') {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
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
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  static post = async (url, data) => {
    try {
      const response = await axios.post(url, data);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.response);
      throw error;
    }
  };
  static put = async (url, data) => {
    try {
      const response = await axios.put(url, data);
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  static delete = async url => {
    try {
      const response = await axios.delete(url);
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}
