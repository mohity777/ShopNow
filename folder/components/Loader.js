import React from 'react';
import {Modal, View, ActivityIndicator, StyleSheet} from 'react-native';

const Loader = props => {
  return (
    <Modal
      visible={props.loading}
      onRequestClose={() => props.closeLoader()}
      transparent={true}>
      <View style={styles.container}>
        <View style={styles.innerView}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerView: {
    backgroundColor: 'white',
    height: 50,
    width: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
