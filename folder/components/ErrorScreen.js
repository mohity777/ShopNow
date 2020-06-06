import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loader from '../components/Loader';

const ErrorScreen = props => {
  return (
    <>
      <Loader loading={props.loading} />
      <View style={styles.vew}>
        <Icon name="error" size={100} color="grey" />
        <Text style={styles.text}>Something went wrong</Text>
        <Button
          title="Try again"
          onPress={() => props.onPress()}
          color="green"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  vew: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginVertical: 15,
    color: 'grey',
    fontSize: 20,
  },
});

export default ErrorScreen;
