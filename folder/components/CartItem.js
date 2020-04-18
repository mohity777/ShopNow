import React, { useState} from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity} from "react-native"
import Icon from "react-native-vector-icons/AntDesign"
import MyModal from "./MyModal"

const CartItem = (props) => {
  const item = props.item
  const cost = (item.quantity) * (item.price)
  const [visible,setV] = useState(false);

  const closeModal = () =>{
    setV(false)
  }
  const pressOk = () => {
    props.rem(item.id)
  }
  return (
    <View style={styles.container}>
      <MyModal visible={visible} closeModal={closeModal} pressOk={pressOk} />
      <View style={styles.imgView}>
        <Image style={styles.image} source={{ uri: item.url }} />
      </View>
      <View style={styles.txtView}>
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.cost}>{cost} Rs.</Text>
        </View>
        <View style={styles.chgQty}>
          <TouchableOpacity onPress={() => props.setQty(item.id, item.quantity - 1)} disabled={item.quantity === 1} >
            <Icon name="minuscircleo" size={23} color={item.quantity === 1 ? "grey" : "black"} />
          </TouchableOpacity>
          <TextInput keyboardType="numeric" value={item.quantity ? (item.quantity).toString() : ""} style={styles.input} onChangeText={(val) => { if (val.length) { props.setQty(item.id, parseInt(val)) } else { props.setQty(item.id, 0) } }} />
          <TouchableOpacity onPress={() => props.setQty(item.id, item.quantity + 1)}>
            <Icon name="pluscircleo" size={23} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.icView}>
         <TouchableOpacity onPress={()=> setV(true)}>
           <Icon name="delete" size={23} color="black"/>
         </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    margin: 20,
    elevation: 5,
    backgroundColor: "white",
    flexDirection: "row",
  },
  imgView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1.5,
  },
  image: {
    height: 150,
    width: 110
  },
  txtView: {
    flex: 1,
    justifyContent: "center"
  },
  title: {
    color: "green",
    fontWeight: "bold",
    fontSize: 17
  },
  cost: {
    color: "grey"
  },
  info: {
    flex: 1,
    justifyContent: "center"
  },
  chgQty: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  input: {
    borderColor: "black",
    borderWidth: 0.5,
    marginHorizontal: 10,
    padding: 5
  },
  icView: {
    flex:1,
    alignItems: "flex-end",
    padding: 15
  }
})

export default CartItem;