import {ADD_TO_CART, SET_QTY, REM_ITEM, SET_CART} from './actionTypes';
import Api from '../../../utils/Api';
import {PATH} from '../../../utils/apiPath';

const addToCart = (product, item) => ({
  type: ADD_TO_CART,
  product,
  item,
});

const set_qty = (cid, qty) => ({
  type: SET_QTY,
  cid,
  qty,
});

const rem_item = cid => ({
  type: REM_ITEM,
  cid,
});

const set_cart = payload => ({
  type: SET_CART,
  payload,
});

const postCart = prod => async dispatch => {
  try {
    console.log('postcart');
    const result = await Api.post(
      `${PATH.addToCart}/5110360c-0d34-4c16-a3ec-419708aec320`,
      {
        id: prod.id,
      },
    );
    console.log('postcart##############', result);
    dispatch(addToCart(prod, result));
  } catch (error) {
    console.log('**postCart error\n', error);
    throw error;
  }
};

const fetchCart = () => {
  return async dispatch => {
    try {
      const result = await Api.get(
        `${PATH.getCart}/5110360c-0d34-4c16-a3ec-419708aec320`,
      );
      console.log('fetchcart', result);
      dispatch(set_cart(result));
    } catch (error) {
      console.log('**fetchCart error**\n', error);
      throw error;
    }
  };
};

const putCart = (cid, qty) => async dispatch => {
  try {
    console.log('putCart', qty);
    await Api.put(`${PATH.editCart}${cid}`, {
      quantity: qty,
    });
    dispatch(set_qty(cid, qty));
  } catch (error) {
    console.log('**putCart error**\n', error);
    throw error;
  }
};

const deleteCart = cid => async dispatch => {
  try {
    console.log('deletecart start');
    await Api.delete(`${PATH.deleteCartItem}${cid}`);
    console.log('del2');
    dispatch(rem_item(cid));
  } catch (error) {
    console.log('**deleteCart error**\n', error);
    throw error;
  }
};
export {postCart, fetchCart, putCart, deleteCart, set_qty};
