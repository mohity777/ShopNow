import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
  Easing,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {getLogin} from '../store/action/authActions/actions';
import Loader from '../components/Loader';
import LoginInput from '../components/loginInput';
import {ScrollView} from 'react-native-gesture-handler';
import {IMAGES} from '../images/images';
import SplashScreen from 'react-native-splash-screen';

const Login = props => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const height = new Animated.Value(Dimensions.get('screen').height);
  const width = new Animated.Value(Dimensions.get('screen').width);

  useEffect(() => {
    SplashScreen.hide();
    startAnimate();
  }, []);

  const startAnimate = () => {
    // Animated.parallel([
    Animated.timing(height, {
      toValue: Dimensions.get('screen').height / 6,
      duration: 1500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
    Animated.timing(width, {
      toValue: Dimensions.get('screen').width / 3,
      duration: 1500,
      useNativeDriver: false,
      easing: Easing.linear,
      // }),
    }).start(() => {});
  };

  const onPress = async () => {
    if (!email.length)
      return Toast.showWithGravity(
        'Enter email first',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    else if (!pass.length)
      return Toast.showWithGravity(
        'Enter password first',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    try {
      setLoading(true);
      const data = {
        email,
        password: pass,
      };
      console.log(data);
      await dispatch(getLogin(data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <ScrollView
      style={{backgroundColor: 'green'}}
      contentContainerStyle={{
        justifyContent: 'center',
        flexGrow: 1,
      }}>
      <Loader loading={loading} />
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
          flex: 1,
          marginVertical: 25,
          justifyContent: 'center',
          paddingVertical: 15,
        }}>
        <Animated.Image
          source={IMAGES.login}
          style={{
            height: height,
            width: width,
            resizeMode: 'stretch',
            alignSelf: 'center',
            marginBottom: 10,
          }}
        />
        <LoginInput
          value={email}
          type="Ionicons"
          name="person"
          placeholder="email"
          returnKeyType={'next'}
          onChange={val => setEmail(val)}
        />
        <LoginInput
          value={pass}
          type="Ionicons"
          name="ios-lock-closed"
          placeholder="password"
          onChange={val => setPassword(val)}
          secure={true}
        />
        <TouchableOpacity
          onPress={onPress}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            backgroundColor: 'green',
            width: '50%',
            marginVertical: 20,
            alignSelf: 'center',
            borderRadius: 20,
          }}>
          <Text style={{color: 'white'}}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
