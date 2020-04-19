import React, { useEffect } from 'react';
import { FlatList, ActivityIndicator, Image, StyleSheet, View, Text} from "react-native"
import  {useSelector, useDispatch} from "react-redux"
import ProductCard from "../components/ProductCard"
import { addToCart } from "../store/action/cartActions/actions"
import { fetchProducts } from "../store/action/productActions/actions"
import { IMAGES } from "../images/images"

const ProductOverviewScreen = (props) => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchProducts())
  }, [])

  const products=useSelector(state=>state.product.availableProducts)
  
  const loading = useSelector( state=> state.product.loading)
    
    return( loading ? 
      ( <ActivityIndicator size="large" color="grey"/> ) :
      ( products.length ? (<FlatList 
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
      />) : ( <View style={styles.cont}><Image source={IMAGES.noProducts} style={styles.img}/><Text style={styles.txt}>Sorry, no products for now</Text></View>)
    ))
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  img: {
    height: 100,
    width: 100,
  },
  txt: {
    marginTop: 20,
    color: "grey",
    fontSize: 20
  }
})
export default ProductOverviewScreen;