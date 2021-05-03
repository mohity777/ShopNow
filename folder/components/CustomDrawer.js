import React from 'react';
import {View, StyleSheet, Image, Text, Button} from 'react-native';
import {IMAGES} from './../images/images';
import {DrawerItemList} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';

const CustomDrawer = props => {
  const dispatch = useDispatch();
  const logout = () => {
    props.navigation.toggleDrawer();
    dispatch({type: 'LOGOUT'});
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.top}>
          <Image source={IMAGES.shopIcon} style={styles.image} />
          <Text style={styles.txt}>ShopNow</Text>
        </View>
        <DrawerItemList {...props} />
        <View style={{padding: 10}}>
          <Button title="Logout" onPress={logout} color="green" />
        </View>
        <Image source={IMAGES.drawerEnd} style={styles.end} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    backgroundColor: 'green',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 70,
  },
  txt: {
    fontSize: 23,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
  },
  end: {
    position: 'absolute',
    bottom: -80,
    width: '100%',
    resizeMode: 'contain',
  },
});

export default CustomDrawer;
