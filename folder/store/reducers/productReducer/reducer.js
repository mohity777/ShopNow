import PRODUCTS from "../../../data/dummy-data"; 
import { DELETE_PRODUCT, EDIT_PRODUCT, ADD_PRODUCT } from "../../action/productActions/actionTypes"

const initialState={
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((product)=>product.ownerId=="u1")
}

const pReducer = (state=initialState,action) => {
    switch(action.type){

        case DELETE_PRODUCT: return {
            ...state,
            availableProducts: state.availableProducts.filter( product => product.id !== action.pid),
            userProducts: state.userProducts.filter( product => product.id !== action.pid)
        }

        case ADD_PRODUCT: return {
            ...state,
            availableProducts: [action.prod, ...state.availableProducts],
            userProducts: [action.prod, ...state.userProducts]
        }

        case EDIT_PRODUCT: 
            const editedAvailableProducts= state.availableProducts.map( item =>{
                if(item.id === action.prod.id)
                 return {
                     ...item,
                     title: action.prod.title,
                     imageUrl: action.prod.imgUrl,
                     description: action.prod.description
                 }
                else
                return item
            })
            const editedUserProducts= state.userProducts.map( item =>{
                if(item.id === action.prod.id)
                 return {
                     ...item,
                     title: action.prod.title,
                     imageUrl: action.prod.imgUrl,
                     description: action.prod.description
                 }
                else
                return item
            })
            return {
                ...state,
                availableProducts: editedAvailableProducts,
                userProducts: editedUserProducts
            }
        default : return state
    }
}

export default pReducer;