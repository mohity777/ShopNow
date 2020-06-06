import {SET_ORDER, ADD_ORDER} from './actionTypes';
import Api from '../../../utils/Api';
import {PATH} from '../../../utils/apiPath';

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
    console.log('getorders************');
    const result = await Api.get(
      `${PATH.getOrders}/5110360c-0d34-4c16-a3ec-419708aec320`,
    );
    console.log('getorders************', result);
    dispatch(set_orders(result));
  } catch (error) {
    console.log('error at fetch orders', error);
    throw error;
  }
};

const postOrder = (cartItems, totalAmount) => async dispatch => {
  try {
    console.log('addorders$$$$$$$$$$');
    const result = await Api.post(
      `${PATH.postOrder}/5110360c-0d34-4c16-a3ec-419708aec320`,
      {
        totalAmount,
        cartItems: cartItems.map((item, index) => ({
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    );
    console.log('addorders$$$$$$$$$$', result);
    dispatch(add_order(result));
  } catch (error) {
    console.log('error at post order77777777', error);
    throw error;
  }
};

export {fetchOrders, postOrder};
