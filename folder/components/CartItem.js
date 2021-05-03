import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MyModal from './MyModal';

const CartItem = props => {
  const item = props.item;
  const cost = item.quantity * item.product.price;
  const [visible, setV] = useState(false);
  const closeModal = () => {
    setV(false);
  };
  const pressOk = () => {
    props.rem(item.cartItemId);
  };
  return (
    <View style={styles.container}>
      <MyModal visible={visible} closeModal={closeModal} pressOk={pressOk} />
      <View style={styles.imgView}>
        <Image style={styles.image} source={{uri: item.product.url}} />
      </View>
      <View style={styles.txtView}>
        <View style={styles.info}>
          <Text style={styles.title}>{item.product.title}</Text>
          <Text style={styles.price}>{`${item.product.price} Rs.`}</Text>
          <Text style={styles.cost}>
            <Text style={styles.costKey}>Total Amount: </Text>
            {`${cost} Rs.`}
          </Text>
        </View>
        <View style={styles.chgQty}>
          <TouchableOpacity
            onPress={() => props.setQty(item.cartItemId, item.quantity - 1)}
            disabled={item.quantity === 1}>
            <Icon
              name="minuscircleo"
              size={20}
              color={item.quantity === 1 ? 'grey' : 'black'}
            />
          </TouchableOpacity>
          <TextInput
            keyboardType="numeric"
            value={item.quantity ? item.quantity.toString() : ''}
            style={styles.input}
            onChangeText={val => props.onChange(val, item.cartItemId)}
            onEndEditing={() => props.setQty(item.cartItemId, item.quantity)}
          />
          <TouchableOpacity
            onPress={() => props.setQty(item.cartItemId, item.quantity + 1)}>
            <Icon name="pluscircleo" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.icView}>
        <TouchableOpacity onPress={() => setV(true)}>
          <Icon name="delete" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    elevation: 5,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  imgView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.5,
  },
  image: {
    height: 150,
    width: 110,
  },
  txtView: {
    flex: 2,
    // justifyContent: 'center',
  },
  title: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 17,
  },
  cost: {
    marginTop: 10,
    color: 'grey',
  },
  costKey: {
    color: 'black',
  },
  price: {
    color: 'grey',
  },
  info: {
    flex: 1,
    // justifyContent: 'center',
  },
  chgQty: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  input: {
    borderColor: 'black',
    borderWidth: 0.5,
    marginHorizontal: 10,
    paddingVertical: 0,
  },
  icView: {
    flex: 0.5,
    alignItems: 'flex-end',
  },
});

export default CartItem;
