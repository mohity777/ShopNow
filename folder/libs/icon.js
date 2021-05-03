import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';

const data = {
  AntDesign: props => (
    <AntDesign name={props.name} size={props.size} style={props.style} />
  ),
  Entypo: props => <Entypo name={props.name} style={props.style} />,
  Foundation: props => <Foundation name={props.name} style={props.style} />,
  EvilIcons: props => (
    <EvilIcons name={props.name} size={props.size} style={props.style} />
  ),

  Feather: props => (
    <Feather name={props.name} size={props.size} style={props.style} />
  ),
  FontAwesome: props => <FontAwesome name={props.name} style={props.style} />,
  FontAwesome5: props => (
    <FontAwesome5 name={props.name} size={props.size} style={props.style} />
  ),
  FontAwesome5Pro: props => (
    <FontAwesome5Pro name={props.name} style={props.style} />
  ),
  Ionicons: props => <Ionicons name={props.name} style={props.style} />,
  Fontisto: props => <Fontisto name={props.name} style={props.style} />,
  MaterialIcons: props => (
    <MaterialIcons name={props.name} size={props.size} style={props.style} />
  ),
  MaterialCommunityIcons: props => (
    <MaterialCommunityIcons
      name={props.name}
      size={props.size}
      style={props.style}
    />
  ),
  SimpleLineIcons: props => (
    <SimpleLineIcons name={props.name} style={props.style} />
  ),
};

export default function Icons(props) {
  if (!props.name) return null;
  else if (props.type) {
    return (
      <TouchableOpacity
        disabled={!props.onPress || props.disabled}
        onPress={props.onPress}
        hitSlop={props.hitSlop}>
        {data[props.type](props)}
      </TouchableOpacity>
    );
  }
  return <AntDesign {...props} />;
}
