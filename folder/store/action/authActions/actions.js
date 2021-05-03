import Api from '../../../utils/Api';
import {PATH} from '../../../utils/apiPath';
import {SET_USER} from './actionTypes';
import AsyncStorage from '@react-native-community/async-storage';
import {checkError} from '../../../utils/functions';

const setUser = payload => ({
  type: SET_USER,
  payload,
});

export const getLogin = data => async (dispatch, getState) => {
  try {
    const res = await Api.post(PATH.login, data);
    console.log(res);
    const payload = {
      token: res['access_token'],
      email: res.email,
      name: res.name,
      cartId: res.cartId,
    };
    console.log('pay', payload);
    dispatch(setUser(payload));
    console.log('3333');
    const keys = [
      ['token', JSON.stringify(res['access_token'])],
      ['email', JSON.stringify(res.email)],
      ['name', JSON.stringify(res.name)],
      ['cartId', JSON.stringify(res.cartId)],
    ];
    await AsyncStorage.multiSet(keys);
  } catch (error) {
    console.log(error);
    checkError(error);
    throw error;
  }
};

export const getUserToken = () => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('token');
    const email = await AsyncStorage.getItem('email');
    const name = await AsyncStorage.getItem('name');
    const cartId = await AsyncStorage.getItem('cartId');
    const payload = {
      token: token == null ? '' : JSON.parse(token),
      email: email == null ? '' : JSON.parse(email),
      name: name == null ? '' : JSON.parse(name),
      cartId: cartId == null ? '' : JSON.parse(cartId),
    };
    dispatch(setUser(payload));
  } catch (error) {
    checkError(error);
    throw error;
  }
};
