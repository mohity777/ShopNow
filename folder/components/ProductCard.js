import React from "react"
import {View,StyleSheet,Text,Button,Image,TouchableOpacity} from "react-native"


const ProductCard = (props) => {
    return(
        <TouchableOpacity activeOpacity={0.5} style={styles.container} onPress={()=>props.onPressLeft()}>
            <View style={styles.view}>
            <Image source={{uri: props.url}} style={styles.image}/>
            <View style={styles.detail}>
                <Text style={styles.text}>{props.title}</Text>
                <Text style={styles.price}>{`${props.price} Rs.`}</Text>
            </View>
            <View style={styles.buttons}>
                <Button title={props.titleLeft} color="green" onPress={()=>props.onPressLeft()}/>
                <Button title={props.titleRight} color="green" onPress={()=>props.onPressRight()}/>
            </View>
            </View>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    container: {
        margin: 10,
        elevation: 10,
        backgroundColor: "white",
        borderRadius: 10,
        height: 400
    },
    view: {
        flex:1
    },
    image: {
       height: "60%",
       margin : 5
   },
   detail: {
       width: "100%",
       alignItems: "center"
   },
   text: {
       fontSize: 20,
       fontWeight: "bold",
       color: "green"
   },
   price: {
       fontSize: 16,
       color: "grey"
   },
   buttons: {
       flex:1,
       flexDirection: "row",
       alignItems: "center",
       marginHorizontal:15,
       justifyContent: "space-between"
   }
})

export default ProductCard;