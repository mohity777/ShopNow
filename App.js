import React from 'react';
import { combineReducers, createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import pReducer from "./folder/store/reducers/productReducer/reducer"
import cReducer from "./folder/store/reducers/cartReducer/reducer"
import StackScreen from "./folder/navigation/ShopNavigator"
import oReducer from './folder/store/reducers/orderReducer/reducer';
import thunk from "redux-thunk"

const rootReducer = combineReducers({
  product: pReducer,
  cart: cReducer,
  order: oReducer,
})

const store = createStore(rootReducer,applyMiddleware(thunk))

const App = () => {
  return (
    <Provider store={store}>
      <StackScreen />
    </Provider>
  )
}

export default App;