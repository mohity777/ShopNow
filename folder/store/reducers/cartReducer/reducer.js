import { ADD_TO_CART, SET_QTY, REM_ITEM } from "./../../action/cartActions/actionTypes";
import { ADD_ORDER } from "./../../action/orderActions/actionTypes"
import { DELETE_PRODUCT, EDIT_PRODUCT } from "../../action/productActions/actionTypes"

const initialState = {
    cartItems: [],
    totalSum: 0
}

const cReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_TO_CART:
            const id = action.product.id
            const url = action.product.imageUrl
            const title = action.product.title
            const price = action.product.price
            let temp = 0;
            const newArray = state.cartItems.map(item => {
                if (item.id === id) {
                    temp = 1
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                }
                else
                    return item
            })
            if (temp) {
                return {
                    ...state,
                    cartItems: newArray,
                    totalSum: state.totalSum + price
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [{
                        id,
                        url,
                        title,
                        price,
                        quantity: 1
                    },
                    ...state.cartItems],
                    totalSum: state.totalSum + price
                }
            }

        case SET_QTY:
            let newSum = 0;
            let tempAry = state.cartItems.map((item) => {
                if (item.id === action.id) {
                    newSum = newSum + action.qty * item.price;
                    return {
                        ...item,
                        quantity: action.qty
                    }
                }
                else {
                    newSum = newSum + item.quantity * item.price
                    return item;
                }
            })
            return {
                ...state,
                cartItems: tempAry,
                totalSum: newSum
            }


        case REM_ITEM:
            const ar = state.cartItems.filter((item) => item.id !== action.id);
            let Tsum = 0;
            ar.map((item) => { Tsum = Tsum + (item.quantity * item.price) })
            return {
                ...state,
                cartItems: ar,
                totalSum: Tsum
            }


        case ADD_ORDER: return initialState;


        case DELETE_PRODUCT:
            const prod = state.cartItems.find(prod => prod.id === action.pid)
            if (prod)
                return {
                    ...state,
                    cartItems: state.cartItems.filter(prod => prod.id !== action.pid),
                    totalSum: state.totalSum - (prod.price * prod.quantity)
                }
            else
                return state

        case EDIT_PRODUCT:
            const nar = state.cartItems.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        title: action.prod.title,
                        imageUrl: action.prod.imageUrl,
                    }
                }
                else
                    return item
            })
            return {
                ...state,
                cartItems: nar
            }

        default: return state
    }
}

export default cReducer;