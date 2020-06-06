import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {IMAGES} from '../images/images';

const EmptyScreen = props => {
  return (
    <View style={styles.cont}>
      <Image source={IMAGES.noProducts} style={styles.img} />
      <Text style={styles.txt}>{props.message}</Text>
    </View>
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
export default EmptyScreen;
