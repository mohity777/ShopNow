import { ADD_ORDER } from "./../../action/orderActions/actionTypes"

const initialState = {
    orders: []
};

const oReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const order = {
                id: new Date().getTime(),
                items: action.cartItems,
                totalAmount: action.sum,
                date: new Date().toLocaleString()
            };
            return {
                ...state,
                orders: [order,...state.orders]
            };
        default: return state;
    }
}

export default oReducer;