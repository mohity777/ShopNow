import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ProductCard from '../components/ProductCard';
import {
  deleteProduct,
  fetchUserProducts,
} from '../store/action/productActions/actions';
import MyModal from '../components/MyModal';
import EmptyScreen from '../components/EmptyScreen';
import Loader from '../components/Loader';
import Toast from 'react-native-simple-toast';
import ErrorScreen from '../components/ErrorScreen';

const UserProductsScreen = props => {
  const items = useSelector(state => state.product.userProducts);
  const dispatch = useDispatch();
  const [visible, setV] = useState(false);
  const [item, setItem] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const closeModal = () => {
    setV(false);
  };

  useEffect(() => {
    getUserProducts();
  }, []);

  const getUserProducts = async () => {
    try {
      setLoading(true);
      await dispatch(fetchUserProducts());
      setError(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const pressOk = async () => {
    try {
      setLoading(true);
      await dispatch(deleteProduct(item.id));
      setLoading(false);
      Toast.showWithGravity(
        'Product Deleted Successfully',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  if (error) return <ErrorScreen loading={loading} onPress={getUserProducts} />;
  return (
    <>
      <MyModal visible={visible} closeModal={closeModal} pressOk={pressOk} />
      <Loader loading={loading} />
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{flexGrow: 1}}
        ListEmptyComponent={
          <EmptyScreen message="Sorry, no products for now" />
        }
        renderItem={({item}) => (
          <ProductCard
            titleRight="Delete"
            titleLeft="Edit"
            title={item.title}
            price={item.price}
            url={item.imageUrl}
            onPressRight={() => {
              setItem(item);
              setV(true);
            }}
            onPressLeft={() =>
              props.navigation.navigate('UserEdit', {id: item.id})
            }
          />
        )}
      />
    </>
  );
};

export default UserProductsScreen;
