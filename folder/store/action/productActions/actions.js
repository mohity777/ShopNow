import {
  DELETE_PRODUCT,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  SET_PRODUCTS,
  SET_LOADING,
} from './actionTypes';
import axios from 'axios';

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

// const set_error = error = ({
//     type: SET_ERROR,
//     error
// })

const postProduct = prod => {
  return async dispatch => {
    try {
      // const response = await fetch('http://56568d8f.ngrok.io/api/products',{
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json'
      //         // 'Content-Type': 'application/x-www-form-urlencoded',
      //       },
      //     body: JSON.stringify(prod)
      // })
      // const product = await response.json();
      // console.log(product)
      dispatch(set_loading(true));
      const response = await axios.post(
        'http://6abe96f3.ngrok.io/api/products',
        prod,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch(add_prod(response.data));
      dispatch(set_loading(false));
    } catch (error) {
      dispatch(set_loading(false));
      throw error;
    }
  };
};

const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await axios.get(
        'http://6abe96f3.ngrok.io/api/products',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response);
      dispatch(set_prods(response.data));
    } catch (error) {
      throw error;
    }
  };
};

const deleteProduct = id => {
  return async dispatch => {
    try {
      dispatch(set_loading(true));
      await axios.delete(`http://6abe96f3.ngrok.io/api/products/${id}`);
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
      await axios.put(`http://6abe96f3.ngrok.io/api/products/${id}`, prod);
      dispatch(edit_prod(id, prod));
      dispatch(set_loading(false));
    } catch (error) {
      dispatch(set_loading(false));
      throw error;
    }
  };
};

export {postProduct, fetchProducts, deleteProduct, putProduct};
