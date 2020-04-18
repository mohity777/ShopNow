import React from 'react';
import {FlatList,Text} from "react-native"
import  {useSelector, useDispatch} from "react-redux"
import ProductCard from "../components/ProductCard"
import { addToCart } from "../store/action/cartActions/actions"

const ProductOverviewScreen = (props) => {

  const products=useSelector(state=>state.product.availableProducts)
  const dispatch = useDispatch()
    
    return(
     <FlatList 
       data={products} 
       keyExtractor={(item,index)=>index.toString()} 
       renderItem={({item})=><ProductCard 
                               titleRight="Add To Cart"
                               titleLeft="View Details"
                               title={item.title} 
                               price={item.price} 
                               url={item.imageUrl}
                               onPressRight={()=>dispatch(addToCart(item))} 
                               onPressLeft={()=>props.navigation.navigate("ProductDetail",{
                                 id:item.id,
                                 title: item.title
                               })}
                            />}
      />
    )
}

export default ProductOverviewScreen;