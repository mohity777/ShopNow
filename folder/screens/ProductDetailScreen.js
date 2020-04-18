import React from 'react';
import { Text, View, Button, StyleSheet, ScrollView, Image } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from '../store/action/cartActions/actions';

const ProductDetailScreen = (props) => {

    const id = props.route.params.id;
    const product = useSelector(state => state.product.availableProducts.find(item => item.id === id))
    const dispatch = useDispatch()

    return (

        <ScrollView>
            <View style={styles.container}>
            <Image style={styles.image} source={{ uri: product.imageUrl }} />
            <Text style={styles.title}>{product.title}</Text>
            <View style={styles.button}>
              <Button title="Add to Cart" color="green" onPress={() => dispatch(addToCart(product))} />
            </View>
            <Text style={styles.details}>Price: <Text style={styles.value}>{`${product.price}`} Rs.</Text></Text>
            <Text style={styles.details}>Description: <Text style={[{ margin: 20 }, styles.value]}>{product.description}</Text> </Text>
            </View></ScrollView>

    )
}

export default ProductDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    image: {
        height: 280,
        resizeMode: "contain"
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "green",
        alignSelf: "center",
        marginTop: 10
    },
    button: {
       marginTop: 10,
       alignSelf: "center"
    },
    details: {
        fontWeight: "bold",
        fontSize: 20,
        color: "green",
        marginTop: 20
    },
    value: {
        fontSize: 18,
        color: "grey",
    }
})