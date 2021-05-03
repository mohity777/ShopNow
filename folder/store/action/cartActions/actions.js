import {ADD_TO_CART, SET_ITEM, REM_ITEM, SET_CART} from './actionTypes';
import Api from '../../../utils/Api';
import {PATH} from '../../../utils/apiPath';
import {checkError} from '../../../utils/functions';

const addToCart = (product, item) => ({
  type: ADD_TO_CART,
  product,
  item,
});

const set_item = payload => ({
  type: SET_ITEM,
  payload,
});

const rem_item = cid => ({
  type: REM_ITEM,
  cid,
});

const set_cart = payload => ({
  type: SET_CART,
  payload,
});

const postCart = prod => async (dispatch, getState) => {
  try {
    console.log('postcart');
    const cartId = await getState().user.cartId;
    console.log('Ffff', cartId);
    console.log(PATH.addToCart + cartId + 'kkjj');
    const result = await Api.post(PATH.addToCart + cartId, {
      id: prod.id,
    });
  } catch (error) {
    console.log('**postCart error\n', error);
    checkError(error);
    throw error;
  }
};

const fetchCart = () => {
  return async dispatch => {
    try {
      const result = await Api.get(PATH.getCart);
      console.log('fetchcart', result);
      dispatch(set_cart(result));
    } catch (error) {
      console.log('**fetchCart error**\n', error);
      checkError(error);
      throw error;
    }
  };
};

const putCart = (cid, qty) => async dispatch => {
  try {
    console.log('putCart', qty);
    const res = await Api.put(PATH.editCart + cid, {
      quantity: qty,
    });
    console.log(res);
    dispatch(set_item(res));
  } catch (error) {
    console.log('**putCart error**\n', error);
    checkError(error);
    throw error;
  }
};

const deleteCart = cid => async dispatch => {
  try {
    console.log('deletecart start');
    await Api.delete(`${PATH.deleteCartItem}${cid}`);
    console.log('del2');
    await dispatch(fetchCart());
  } catch (error) {
    console.log('**deleteCart error**\n', error);
    checkError(error);
    throw error;
  }
};
export {postCart, fetchCart, putCart, deleteCart};
