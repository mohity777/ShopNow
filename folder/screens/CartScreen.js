import React from 'react';
import { Text, View, StyleSheet, FlatList } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { TouchableOpacity } from 'react-native-gesture-handler';
import CartItem from "../components/CartItem"
import { set_qty, rem_item } from "../store/action/cartActions/actions"
import { add_order } from "../store/action/orderActions/actions"

const CartScreen = () => {
    const totalSum = useSelector(state => state.cart.totalSum);
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    const cartHeader = () =>{
        return(
            <View style={styles.header}>
                <Text style={styles.sum}>TOTAL SUM: <Text style={styles.value}>{`${totalSum}`}</Text></Text>
                <TouchableOpacity onPress={()=> dispatch(add_order(cartItems,totalSum))} disabled={totalSum===0}>{ totalSum ? (<Text style={styles.order}>Order Now</Text>) : (<Text style={styles.disabled}>Order Now</Text>) }
                </TouchableOpacity>
            </View>
        )
    }
    const setQty = (id,qty) => {
        dispatch(set_qty(id,qty))
    }
    const rem = (id) => {
        dispatch(rem_item(id))
    }
    return (
        <FlatList 
          data={cartItems} 
          ListHeaderComponent={cartHeader} 
          keyExtractor={(item, index) => index.toString()} 
          renderItem={({ item })=> <CartItem setQty={setQty} item={item} rem={rem}/>} 
        />
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        elevation: 3,
        backgroundColor: "white",
        margin: 10,
        padding: 10,
    },
    sum: {
       color: "green",
       fontWeight: "bold"
    },
    value: {
        color: "grey"
    },
    order: {
        color: "green",
        fontWeight: "bold"
    },
    disabled: {
        color: "grey",
        fontWeight: "bold"
    }
})

export default CartScreen;