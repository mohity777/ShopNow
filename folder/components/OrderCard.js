import React, { useState } from "react";
import { StyleSheet, View, Text, Button, FlatList } from "react-native"


const OrderCard = (props) => {


    const [show, setShow] = useState(false);
    const { id, items, totalAmount, date } = props.item

    const OrderList = () => {
        return (
            <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => 
                  <View style={styles.list}>
                    <Text style={styles.infoTxt}>{`${item.title} (${item.quantity})`}</Text>
                    <Text style={styles.infoTxt}>{item.price*item.quantity}</Text>  
                </View>}
            />)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.mainTxt}>Total Amount: <Text style={styles.txt}>{`${totalAmount} Rs.`}</Text></Text>
            <Text style={styles.mainTxt}>Date: <Text style={styles.txt}>{date}</Text></Text>
            {show ? (OrderList()) : null}
            <View style={styles.button}>
                <Button title={show ? "Show Less" : "Show Details"} color="green" onPress={() => setShow(!show)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
        padding: 15,
        backgroundColor: "white",
        elevation: 5,
    },
    mainTxt: {
        fontSize: 18,
        fontWeight: "bold",
        color: "green"
    },
    txt: {
        color: "grey",
        fontWeight: "normal",
        fontSize: 18
    },
    button: {
        alignSelf: "center",
        marginTop: 15
    },
    list: {
        width: "100%",
        flexDirection: "row",
        marginTop: 5,
        justifyContent: "space-between"
    },
   infoTxt: {
       fontSize: 15
   }
})

export default OrderCard;