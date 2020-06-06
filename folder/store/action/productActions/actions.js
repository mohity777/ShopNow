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

const del_prod = pid => ({
  // delete req
  type: DELETE_PRODUCT,
  pid,
});

const add_prod = prod => ({
  // post req
  type: ADD_PRODUCT,
  prod,
});

const edit_prod = (id, prod) => ({
  // put req
  type: EDIT_PRODUCT,
  id,
  prod,
});

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
      dispatch(add_prod(response));
      dispatch(set_loading(false));
    } catch (error) {
      console.log(error);
      dispatch(set_loading(false));
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
      throw error;
    }
  };
};

const deleteProduct = id => {
  return async dispatch => {
    try {
      dispatch(set_loading(true));
      await Api.delete(`${PATH.deleteProduct}${id}`);
      dispatch(del_prod(id));
      dispatch(set_loading(false));
    } catch (error) {
      dispatch(set_loading(false));
      throw error;
    }
  };
};

const putProduct = (id, prod) => {
  return async dispatch => {
    try {
      dispatch(set_loading(true));
      await Api.put(`${PATH.editProduct}${id}`, prod);
      dispatch(edit_prod(id, prod));
      dispatch(set_loading(false));
    } catch (error) {
      dispatch(set_loading(false));
      throw error;
    }
  };
};

const fetchUserProducts = () => async dispatch => {
  try {
    dispatch(set_loading(true));
    const response = await Api.get(
      `${PATH.getUserProducts}/5110360c-0d34-4c16-a3ec-419708aec320`,
    );
    console.log('@@@@@', response);
    dispatch(set_user_prods(response));
    dispatch(set_loading(false));
  } catch (error) {
    dispatch(set_loading(false));
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
