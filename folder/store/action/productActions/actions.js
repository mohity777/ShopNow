import {
  DELETE_PRODUCT,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  SET_PRODUCTS,
  SET_LOADING,
  SET_USER_PRODUCTS,
} from './actionTypes';
import Api from '../../../utils/Api';
import {PATH} from '../../../utils/apiPath';
import Toast from 'react-native-simple-toast';
import {checkError} from '../../../utils/functions';

const set_prods = products => ({
  // get req
  type: SET_PRODUCTS,
  products,
});

const set_loading = val => ({
  type: SET_LOADING,
  val,
});

const set_user_prods = products => ({
  type: SET_USER_PRODUCTS,
  products,
});

const postProduct = prod => {
  return async dispatch => {
    try {
      dispatch(set_loading(true));
      const response = await Api.post(PATH.createProduct, prod);
      console.log('postproduct', response);
      await dispatch(fetchUserProducts());
      await dispatch(fetchProducts());
      dispatch(set_loading(false));
    } catch (error) {
      console.log(error);
      dispatch(set_loading(false));
      checkError(error);
      throw error;
    }
  };
};

const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await Api.get(PATH.getAllProducts);
      console.log('fetchproducts', response);
      dispatch(set_prods(response));
    } catch (error) {
      console.log(error.response);
      checkError(error);
      throw error;
    }
  };
};

const deleteProduct = id => {
  return async dispatch => {
    try {
      dispatch(set_loading(true));
      await Api.delete(`${PATH.deleteProduct}${id}`);
      await dispatch(fetchUserProducts());
      await dispatch(fetchProducts());
      dispatch(set_loading(false));
    } catch (error) {
      dispatch(set_loading(false));
      checkError(error);
      console.log(error);
      throw error;
    }
  };
};

const putProduct = (id, prod) => {
  return async dispatch => {
    try {
      dispatch(set_loading(true));
      const res = await Api.put(`${PATH.editProduct}${id}`, prod);
      console.log(res);
      await dispatch(fetchUserProducts());
      await dispatch(fetchProducts());
      dispatch(set_loading(false));
    } catch (error) {
      dispatch(set_loading(false));
      checkError(error);
      throw error;
    }
  };
};

const fetchUserProducts = () => async dispatch => {
  try {
    dispatch(set_loading(true));
    const response = await Api.get(PATH.getUserProducts);
    console.log('@@@@@', response);
    dispatch(set_user_prods(response));
    dispatch(set_loading(false));
  } catch (error) {
    dispatch(set_loading(false));
    checkError(error);
    throw error;
  }
};

export {
  postProduct,
  fetchProducts,
  deleteProduct,
  putProduct,
  fetchUserProducts,
};
