import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CartItem from '../components/CartItem';
import {
  putCart,
  deleteCart,
  fetchCart,
  set_qty,
} from '../store/action/cartActions/actions';
import {postOrder} from '../store/action/orderActions/actions';
import Icon from 'react-native-vector-icons/Fontisto';
import Loader from '../components/Loader';
import ErrorScreen from '../components/ErrorScreen';
import Toast from 'react-native-simple-toast';

const CartScreen = () => {
  const totalSum = useSelector(state => state.cart.totalSum);
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetchCartItems();
  }, []);

  const orderNow = async (cartItems, totalSum) => {
    try {
      setLoading(true);
      await dispatch(postOrder(cartItems, totalSum));
      setError(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  const cartHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.sum}>
          TOTAL SUM: <Text style={styles.value}>{`${totalSum}`}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => orderNow(cartItems, totalSum)}
          disabled={totalSum === 0}>
          {totalSum ? (
            <Text style={styles.order}>Order Now</Text>
          ) : (
            <Text style={styles.disabled}>Order Now</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  const setQty = async (cid, qty) => {
    try {
      setLoading(true);
      if (qty) {
        await dispatch(putCart(cid, qty));
      } else {
        dispatch(deleteCart(cid));
      }
      setError(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };
  const rem = async cid => {
    try {
      setLoading(true);
      await dispatch(deleteCart(cid));
      setError(false);
      setLoading(false);
      Toast.showWithGravity('Product Removed', Toast.SHORT, Toast.BOTTOM);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };
  const onChange = (val, cid) => {
    if (val.length) {
      dispatch(set_qty(cid, parseInt(val)));
    } else {
      dispatch(set_qty(cid, 0));
    }
  };
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      await dispatch(fetchCart());
      setError(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  if (error) {
    return <ErrorScreen loading={loading} onPress={fetchCartItems} />;
  } else {
    return (
      <>
        <Loader loading={loading} />
        <FlatList
          data={cartItems}
          contentContainerStyle={{flexGrow: 1, padding: 10}}
          ListEmptyComponent={() => {
            return (
              <View style={styles.cont}>
                <Icon name="shopping-bag-1" color="black" size={120} />
                <Text style={styles.txt}>Empty Cart!</Text>
              </View>
            );
          }}
          ListHeaderComponent={cartHeader}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <CartItem
              setQty={setQty}
              item={item}
              rem={rem}
              onChange={onChange}
            />
          )}
        />
      </>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 3,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
  },
  sum: {
    color: 'green',
    fontWeight: 'bold',
  },
  value: {
    color: 'grey',
  },
  order: {
    color: 'green',
    fontWeight: 'bold',
  },
  disabled: {
    color: 'grey',
    fontWeight: 'bold',
  },
  cont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    marginTop: 15,
    color: 'grey',
    fontSize: 20,
  },
});

export default CartScreen;
