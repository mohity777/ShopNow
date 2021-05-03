import {SET_ORDER, ADD_ORDER} from './actionTypes';
import Api from '../../../utils/Api';
import {PATH} from '../../../utils/apiPath';
import {checkError} from '../../../utils/functions';

const set_orders = payload => ({
  type: SET_ORDER,
  payload,
});

const add_order = payload => ({
  type: ADD_ORDER,
  payload,
});

const fetchOrders = () => async dispatch => {
  try {
    const result = await Api.get(
      `${PATH.getOrders}/5110360c-0d34-4c16-a3ec-419708aec320`,
    );
    dispatch(set_orders(result));
  } catch (error) {
    console.log('error at fetch orders', error);
    checkError(error);
    throw error;
  }
};

const postOrder = (cartItems, totalAmount) => async dispatch => {
  try {
    const result = await Api.post(
      `${PATH.postOrder}/5110360c-0d34-4c16-a3ec-419708aec320`,
      {
        totalAmount,
        cartItems,
      },
    );

    // dispatch(add_order(result));
    await dispatch(fetchOrders());
  } catch (error) {
    console.log('error at post order77777777', error);
    checkError(error);
    throw error;
  }
};

export {fetchOrders, postOrder};
