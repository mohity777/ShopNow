import React, {useEffect, useState} from 'react';
import OrderCard from '../components/OrderCard';
import {FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import EmptyScreen from '../components/EmptyScreen';
import ErrorScreen from '../components/ErrorScreen';
import Loader from '../components/Loader';
import {fetchOrders} from '../store/action/orderActions/actions';

const OrderScreen = () => {
  const orders = useSelector(state => state.order.orders);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    try {
      setLoading(true);
      await dispatch(fetchOrders());
      setError(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  if (error) {
    return <ErrorScreen loading={loading} onPress={getAllOrders} />;
  } else {
    return (
      <>
        <Loader loading={loading} />
        <FlatList
          data={orders}
          contentContainerStyle={{flexGrow: 1}}
          renderItem={({item}) => <OrderCard item={item} />}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<EmptyScreen message="No Orders" />}
        />
      </>
    );
  }
};

export default OrderScreen;
