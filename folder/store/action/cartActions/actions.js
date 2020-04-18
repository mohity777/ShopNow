import { ADD_TO_CART, SET_QTY, REM_ITEM } from "./actionTypes";

const addToCart = product => ({
    type: ADD_TO_CART,
    product
});

const set_qty = (id,qty) => ({
    type: SET_QTY,
    id,
    qty
})

const rem_item = (id) => ({
    type: REM_ITEM,
    id
}) 


export { addToCart, set_qty, rem_item } ;
