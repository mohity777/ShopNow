import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import Icons from '../libs/icon';

const LoginInput = props => {
  return (
    <View style={[styles.view, props.vwStyle]}>
      <Icons
        disabled={true}
        type={props.type}
        name={props.name}
        style={[styles.icon, props.style]}
      />
      <TextInput
        style={[styles.inp, props.inpStyle]}
        placeholder={props.placeholder}
        secureTextEntry={props.secure}
        returnKeyType={props.returnKeyType}
        onChangeText={props.onChange}
        value={props.value}
        // keyboardAppearance="default"
        keyboardType={props.keyboardType}
        textContentType="givenName"
        autoCapitalize="none"
        placeholderTextColor="grey"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    borderRadius: 40,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginVertical: 8,
  },
  icon: {fontSize: 18, color: 'green', margin: 10, marginRight: 8},
  inp: {
    padding: 0,
    margin: 10,
    marginLeft: 8,
    fontSize: 16,
    color: 'green',
    flex: 1,
  },
});

export default LoginInput;
