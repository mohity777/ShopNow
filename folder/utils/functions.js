import Toast from 'react-native-simple-toast';
export const checkError = error => {
  if (!error.response)
    Toast.showWithGravity('Check Your connection', Toast.LONG, Toast.BOTTOM);
  else if (error.response && error.response.data)
    Toast.showWithGravity(error.response.data, Toast.LONG, Toast.BOTTOM);
  else Toast.showWithGravity('Something went wrong', Toast.LONG, Toast.BOTTOM);
};
