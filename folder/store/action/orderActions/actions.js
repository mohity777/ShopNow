import { ADD_ORDER } from "./actionTypes"

export const add_order = (cartItems,sum) => ({
    type: ADD_ORDER,
    cartItems,
    sum
});