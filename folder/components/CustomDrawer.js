import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, FlatList } from "react-native";
import { IMAGES } from "./../images/images"
import { DrawerItemList } from "@react-navigation/drawer"



const CustomDrawer = props => {

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Image source={IMAGES.shopIcon} style={styles.image} />
                <Text style={styles.txt}>ShopNow</Text>
            </View>
            <DrawerItemList {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    top: {
        backgroundColor: "green",
        height: 200,
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        height: 140,
        width: 140,
        borderRadius: 70,
    },
    txt: {
        fontSize: 23,
        color: "white",
        fontWeight: "bold",
        marginTop: 5
    },
})

export default CustomDrawer;