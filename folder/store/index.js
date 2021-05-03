import pReducer from './reducers/productReducer/reducer';
import cReducer from './reducers/cartReducer/reducer';
import oReducer from './reducers/orderReducer/reducer';
import userReducer from './reducers/authReducer/reducer';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';

const rootReducer = combineReducers({
  product: pReducer,
  cart: cReducer,
  order: oReducer,
  user: userReducer,
});

const clearStorage = async () => {
  await AsyncStorage.clear();
};
const Reducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    clearStorage();
    state = undefined;
  }
  return rootReducer(state, action);
};

const store = createStore(Reducer, applyMiddleware(thunk));

export default store;
