import React, {useState} from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ProductCard from '../components/ProductCard';
import {deleteProduct} from '../store/action/productActions/actions';
import MyModal from '../components/MyModal';
import {IMAGES} from '../images/images';
import Toast from 'react-native-simple-toast';

const UserProductsScreen = props => {
  const items = useSelector(state => state.product.userProducts);
  const dispatch = useDispatch();
  const [visible, setV] = useState(false);
  const [item, setItem] = useState({});

  const loading = useSelector(state => state.product.loading);

  const closeModal = () => {
    setV(false);
  };

  const pressOk = async () => {
    try {
      await dispatch(deleteProduct(item.id));
      Toast.showWithGravity('Product Deleted', Toast.SHORT, Toast.BOTTOM);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MyModal visible={visible} closeModal={closeModal} pressOk={pressOk} />
      {items.length ? (
        <>
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
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
          {loading ? (
            <View
              style={{
                height: 50,
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <ActivityIndicator size="small" color="white" />
              <Text style={{color: 'white'}}> loading</Text>
            </View>
          ) : null}
        </>
      ) : (
        <View style={styles.cont}>
          <Image source={IMAGES.noProducts} style={styles.img} />
          <Text style={styles.txt}>Sorry, no products for now</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default UserProductsScreen;
