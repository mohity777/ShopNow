import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider, useSelector} from 'react-redux';
import HomeStack from './folder/navigation/ShopNavigator';
import LoginStack from './folder/navigation/loginStack';
import {View, ActivityIndicator} from 'react-native';
import {getUserToken} from './folder/store/action/authActions/actions';
import store from './folder/store';
import SplashScreen from 'react-native-splash-screen';

const RootComponent = props => {
  const token = useSelector(state => state.user.token);
  return (
    <SafeAreaProvider>
      {token ? <HomeStack /> : <LoginStack />}
    </SafeAreaProvider>
  );
};
const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await store.dispatch(getUserToken());
    setLoading(false);
  };

  if (loading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="green" />
      </View>
    );
  else
    return (
      <Provider store={store}>
        <RootComponent />
      </Provider>
    );
};

export default App;
