import { DELETE_PRODUCT, ADD_PRODUCT, EDIT_PRODUCT } from "./actionTypes";

const del_prod = pid => ({
    type: DELETE_PRODUCT,
    pid,
})

const add_prod = prod => ({
    type: ADD_PRODUCT,
    prod
})

const edit_prod = prod => ({
    type: EDIT_PRODUCT,
    prod
})

export { del_prod, add_prod, edit_prod } ;