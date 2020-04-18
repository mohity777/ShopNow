import React, { useState } from "react";
import { FlatList } from "react-native"
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard"
import { del_prod } from "../store/action/productActions/actions"
import MyModal from "../components/MyModal"
const UserProductsScreen = (props) => {

    const items = useSelector(state => state.product.userProducts)
    const dispatch = useDispatch();
    const [visible,setV] = useState(false);
    const [item,setItem] = useState({})

    const closeModal = () =>{
        setV(false)
      }

    const pressOk = () => {
        dispatch(del_prod(item.id))
      }

    return (
        <>
        <MyModal visible={visible} closeModal={closeModal} pressOk={pressOk} />
        <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <ProductCard
                                         titleRight="Delete"
                                         titleLeft="Edit"
                                         title={item.title}
                                         price={item.price}
                                         url={item.imageUrl}
                                         onPressRight={() => { setItem(item);
                                                               setV(true);
                                                            }}
                                         onPressLeft={() => props.navigation.navigate('UserEdit',{ id: item.id}) }
                                      />
                                    
        }/>
        </>
    )
}

export default UserProductsScreen;