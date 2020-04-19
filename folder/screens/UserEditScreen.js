import React, { useState, useLayoutEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { useSelector, useDispatch } from "react-redux";
import { postProduct, edit_prod } from "../store/action/productActions/actions"
import Micon from "react-native-vector-icons/MaterialIcons"
import Toast from 'react-native-simple-toast';


const UserEditScreen = (props) => {

    const id = props.route.params.id;
    const product = useSelector(state => state.product.userProducts.find(prod => prod.id === id))
    const dispatch = useDispatch()
    const [title, setTitle] = useState(product ? product.title : "")
    const [imgUrl, setImgUrl] = useState(product ? product.imageUrl : "")
    const [price, setprice] = useState("")
    const [description, setDescription] = useState(product ? product.description : "")

    const onSubmitPressed = () => {
        if (product) {
            const prod = {
                title,
                imageUrl: imgUrl,
                description
            }
            dispatch(edit_prod(id,prod))
            Toast.showWithGravity('Product Edited!', Toast.SHORT, Toast.TOP);
        } else {
            const prod = {
                ownerId: 'u1',
                imageUrl: imgUrl,
                title,
                description,
                price: parseInt(price)
            }
            dispatch(postProduct(prod))
            Toast.showWithGravity('Product Created!', Toast.SHORT, Toast.TOP);
        }
        props.navigation.goBack();
        
    }

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => <TouchableOpacity onPress={() => onSubmitPressed()}><Micon
                style={{ marginRight: 15 }}
                size={25}
                color="white"
                name="done"
            /></TouchableOpacity>
        })
    }, [title, imgUrl, description, price])


    return (
        <ScrollView >
            <View style={styles.conatiner}>
                <Text style={styles.txt}>Title</Text>
                <TextInput style={styles.input} value={title} onChangeText={(val) => setTitle(val)} />
                {product ? null : (<><Text style={styles.txt}>Price</Text>
                    <TextInput style={styles.input} value={price} onChangeText={(val) => setprice(val)} /></>)}
                <Text style={styles.txt}>Image Url</Text>
                <TextInput style={styles.input} value={imgUrl} onChangeText={(val) => setImgUrl(val)} />
                <Text style={styles.txt}>Description</Text>
                <TextInput style={styles.input} value={description} onChangeText={(val) => setDescription(val)} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        padding: 10
    },
    txt: {
        fontSize: 18,
        color: "green"
    },
    input: {
        marginVertical: 10,
        padding: 5,
        width: "100%",
        borderWidth: 0.5,
        borderColor: "grey"
    }
})

export default UserEditScreen;