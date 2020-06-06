import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ProductCard from '../components/ProductCard';
import {postCart} from '../store/action/cartActions/actions';
import {fetchProducts} from '../store/action/productActions/actions';
import EmptyScreen from '../components/EmptyScreen';
import Loader from '../components/Loader';
import ErrorScreen from '../components/ErrorScreen';
import Toast from 'react-native-simple-toast';

const ProductOverviewScreen = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchProds = async () => {
    try {
      setLoading(true);
      await dispatch(fetchProducts());
      setErrorMsg(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorMsg(error);
    }
  };

  useEffect(() => {
    fetchProds();
  }, []);

  const products = useSelector(state => state.product.availableProducts);

  const onPressRight = async item => {
    try {
      setLoading(true);
      await dispatch(postCart(item));
      setLoading(false);
      Toast.showWithGravity('Item added to the cart', Toast.LONG, Toast.TOP);
    } catch (error) {
      setLoading(false);
      Toast.showWithGravity('Error', Toast.LONG, Toast.TOP);
    }
  };

  if (errorMsg) {
    return <ErrorScreen loading={loading} onPress={fetchProds} />;
  } else {
    return (
      <>
        <Loader loading={loading} />
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          data={products}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <EmptyScreen message="Sorry, no products for now" />
          }
          renderItem={({item}) => (
            <ProductCard
              titleRight="Add To Cart"
              titleLeft="View Details"
              title={item.title}
              price={item.price}
              url={item.imageUrl}
              onPressRight={() => onPressRight(item)}
              onPressLeft={() =>
                props.navigation.navigate('ProductDetail', {
                  id: item.id,
                  title: item.title,
                })
              }
            />
          )}
        />
      </>
    );
  }
};

export default ProductOverviewScreen;
