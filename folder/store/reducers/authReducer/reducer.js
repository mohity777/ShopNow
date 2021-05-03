import {SET_USER} from '../../action/authActions/actionTypes';

const initialState = {
  token: '',
  email: '',
  name: '',
  cartId: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      console.log('red', {...state, ...action.payload});
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export default reducer;
