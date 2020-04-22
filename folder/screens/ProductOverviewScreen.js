import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ProductCard from '../components/ProductCard';
import {addToCart} from '../store/action/cartActions/actions';
import {fetchProducts} from '../store/action/productActions/actions';
import {IMAGES} from '../images/images';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductOverviewScreen = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchProds = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await dispatch(fetchProducts());
    } catch (error) {
      console.log(error);
      setErrorMsg(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProds();
  }, []);

  const products = useSelector(state => state.product.availableProducts);

  if (loading) {
    return (
      <View style={styles.vew}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    );
  } else if (errorMsg) {
    return (
      <View style={styles.vew}>
        <Icon name="error" size={100} color="grey" />
        <Text style={styles.text}>Something went wrong</Text>
        <Button title="Try again" onPress={fetchProds} color="green" />
      </View>
    );
  } else if (!products.length) {
    return (
      <View style={styles.cont}>
        <Image source={IMAGES.noProducts} style={styles.img} />
        <Text style={styles.txt}>Sorry, no products for now</Text>
      </View>
    );
  } else {
    return (
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ProductCard
            titleRight="Add To Cart"
            titleLeft="View Details"
            title={item.title}
            price={item.price}
            url={item.imageUrl}
            onPressRight={() => dispatch(addToCart(item))}
            onPressLeft={() =>
              props.navigation.navigate('ProductDetail', {
                id: item.id,
                title: item.title,
              })
            }
          />
        )}
      />
    );
  }
};

const styles = StyleSheet.create({
  vew: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 100,
    width: 100,
  },
  txt: {
    marginTop: 20,
    color: 'grey',
    fontSize: 20,
  },
  text: {
    marginVertical: 15,
    color: 'grey',
    fontSize: 20,
  },
});
export default ProductOverviewScreen;
