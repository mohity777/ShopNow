import { DELETE_PRODUCT, ADD_PRODUCT, EDIT_PRODUCT, SET_PRODUCTS, SET_LOADING } from "./actionTypes";

const del_prod = pid => ({
    type: DELETE_PRODUCT,
    pid,
})

const add_prod = prod => ({
    type: ADD_PRODUCT,
    prod
})

const edit_prod = (id,prod) => ({
    type: EDIT_PRODUCT,
    id,
    prod
})

const set_prods = (products) => ({
    type: SET_PRODUCTS,
    products
})

const set_load = (val) => ({
    type: SET_LOADING,
    val
})
const postProduct = (prod) => {
    return async dispatch => {
        try{
            const response = await fetch('http://56568d8f.ngrok.io/api/products',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                body: JSON.stringify(prod)
            })
            const product = await response.json();
            console.log(product)
            dispatch(add_prod(product))
        }catch(error){
            console.log(error)
        }
    }
}

const fetchProducts = () => {
    return async dispatch => {
        try{  
              dispatch(set_load(true))
              const response = await fetch('http://56568d8f.ngrok.io/api/products')
              console.log("$$%%%%%%%%%%",response)
              const products = await response.json()
              console.log("@@@",products)
              dispatch(set_prods(products))
              dispatch(set_load(false))
        }catch(error){
              console.log(error)
        }
    }
}

export { del_prod, add_prod, edit_prod, postProduct, fetchProducts } ;