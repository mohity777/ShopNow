import {
  ADD_TO_CART,
  SET_QTY,
  REM_ITEM,
  SET_CART,
} from './../../action/cartActions/actionTypes';
import {ADD_ORDER} from './../../action/orderActions/actionTypes';
import {
  DELETE_PRODUCT,
  EDIT_PRODUCT,
} from '../../action/productActions/actionTypes';

const initialState = {
  cartItems: [],
  totalSum: 0,
};

const cReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const cid = action.item.cid;
      const id = action.product.id;
      const url = action.product.imageUrl;
      const title = action.product.title;
      const price = action.product.price;
      const quantity = action.item.quantity;
      let temp = 0;
      const newArray = state.cartItems.map(item => {
        if (item.cid === cid) {
          temp = 1;
          return {
            ...item,
            quantity: quantity,
          };
        } else {
          console.log(item.cid);
          return item;
        }
      });
      if (temp) {
        return {
          ...state,
          cartItems: newArray,
          totalSum: state.totalSum + price,
        };
      } else {
        return {
          ...state,
          cartItems: [
            {
              cid,
              id,
              url,
              title,
              price,
              quantity,
            },
            ...state.cartItems,
          ],
          totalSum: state.totalSum + price,
        };
      }

    case SET_QTY:
      let newSum = 0;
      let tempAry = state.cartItems.map(item => {
        if (item.cid === action.cid) {
          newSum = newSum + action.qty * item.price;
          return {
            ...item,
            quantity: action.qty,
          };
        } else {
          newSum = newSum + item.quantity * item.price;
          return item;
        }
      });
      return {
        ...state,
        cartItems: tempAry,
        totalSum: newSum,
      };

    case REM_ITEM:
      const ar = state.cartItems.filter(item => item.cid !== action.cid);
      let Tsum = 0;
      ar.map(item => {
        Tsum = Tsum + item.quantity * item.price;
      });
      return {
        ...state,
        cartItems: ar,
        totalSum: Tsum,
      };

    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      const prod = state.cartItems.find(prod => prod.id === action.pid);
      if (prod)
        return {
          ...state,
          cartItems: state.cartItems.filter(prod => prod.id !== action.pid),
          totalSum: state.totalSum - prod.price * prod.quantity,
        };
      else return state;

    case EDIT_PRODUCT:
      const nar = state.cartItems.map(item => {
        if (item.id === action.id) {
          return {
            ...item,
            title: action.prod.title,
            imageUrl: action.prod.imageU + rl,
          };
        } else return item;
      });
      return {
        ...state,
        cartItems: nar,
      };

    case SET_CART:
      let amount = 0;
      const newCartItems = action.payload.map(item => {
        const cid = item.cid;
        const quantity = item.quantity;
        const id = item.product.id;
        const price = item.product.price;
        const url = item.product.imageUrl;
        const title = item.product.title;
        amount = amount + quantity * price;
        return {
          cid,
          quantity,
          id,
          price,
          url,
          title,
        };
      });
      return {
        ...state,
        cartItems: newCartItems,
        totalSum: amount,
      };

    default:
      return state;
  }
};

export default cReducer;
