import {
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  ADD_PRODUCT,
  SET_PRODUCTS,
  SET_LOADING,
} from '../../action/productActions/actionTypes';

const initialState = {
  availableProducts: [],
  userProducts: [],
  loading: false,
};

const pReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.pid,
        ),
        userProducts: state.userProducts.filter(
          product => product.id !== action.pid,
        ),
      };

    case ADD_PRODUCT:
      return {
        ...state,
        availableProducts: [action.prod, ...state.availableProducts],
        userProducts: [action.prod, ...state.userProducts],
      };

    case EDIT_PRODUCT:
      const editedAvailableProducts = state.availableProducts.map(item => {
        if (item.id === action.id)
          return {
            ...item,
            title: action.prod.title,
            imageUrl: action.prod.imageUrl,
            description: action.prod.description,
          };
        else return item;
      });
      const editedUserProducts = state.userProducts.map(item => {
        if (item.id === action.id)
          return {
            ...item,
            title: action.prod.title,
            imageUrl: action.prod.imageUrl,
            description: action.prod.description,
          };
        else return item;
      });
      return {
        ...state,
        availableProducts: editedAvailableProducts,
        userProducts: editedUserProducts,
      };

    case SET_PRODUCTS:
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.products.filter(
          product => product.ownerId == 'u1',
        ),
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.val,
      };
    default:
      return state;
  }
};

export default pReducer;
