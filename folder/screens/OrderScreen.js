import React from 'react';
import OrderCard from "../components/OrderCard"
import {FlatList, Text} from "react-native"
import { useSelector } from "react-redux"

const OrderScreen = () => {
    const orders= useSelector( state => state.order.orders)
    return(
    <FlatList data={orders} 
      renderItem={({item})=><OrderCard item={item} />}
      keyExtractor={(item,index)=>index.toString()}
    />
    )
}

export default OrderScreen;