import React, {useState, useLayoutEffect, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {postProduct, putProduct} from '../store/action/productActions/actions';
import Micon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';
import Loader from '../components/Loader';

const UserEditScreen = props => {
  const id = props.route.params.id;
  const product = useSelector(state =>
    state.product.userProducts.find(prod => prod.id === id),
  );
  const dispatch = useDispatch();
  const [title, setTitle] = useState(product ? product.title : '');
  const [imgUrl, setImgUrl] = useState(product ? product.imageUrl : '');
  const [price, setprice] = useState('');
  const [description, setDescription] = useState(
    product ? product.description : '',
  );
  const [oColor, setoColor] = useState('#d3d3d3');
  const [tColor, settColor] = useState('#d3d3d3');
  const [thColor, setthColor] = useState('#d3d3d3');
  const [fColor, setfColor] = useState('#d3d3d3');
  let one = null;
  let two = null;
  let three = null;
  let four = null;
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, []);

  const onSubmitPressed = async () => {
    try {
      setLoading(true);
      if (product) {
        const prod = {
          title,
          imageUrl: imgUrl,
          description,
        };
        await dispatch(putProduct(id, prod));
        setLoading(false);
        Toast.showWithGravity('Product Edited!', Toast.SHORT, Toast.TOP);
        props.navigation.goBack();
      } else {
        const prod = {
          imageUrl: imgUrl,
          title,
          description,
          price: parseInt(price),
        };
        await dispatch(postProduct(prod));
        setLoading(false);
        Toast.showWithGravity('Product Created', Toast.SHORT, Toast.TOP);
        props.navigation.goBack();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            onSubmitPressed();
          }}>
          <Micon
            style={{marginRight: 15}}
            size={25}
            color="white"
            name="done"
          />
        </TouchableOpacity>
      ),
    });
  }, [title, imgUrl, description, price]);

  return (
    <ScrollView>
      <Loader loading={loading} />
      <View style={styles.conatiner}>
        <Text style={styles.txt}>Title</Text>
        <TextInput
          ref={inp => {
            one = inp;
          }}
          style={[styles.input, {borderColor: oColor}]}
          value={title}
          onChangeText={val => setTitle(val)}
          returnKeyType="next"
          onSubmitEditing={() => {
            product ? three.focus() : two.focus();
          }}
          onFocus={() => setoColor('green')}
          onBlur={() => setoColor('#d3d3d3')}
        />
        {product ? null : (
          <>
            <Text style={styles.txt}>Price</Text>
            <TextInput
              style={[styles.input, {borderColor: tColor}]}
              value={price}
              onChangeText={val => setprice(val)}
              returnKeyType="next"
              ref={inp => {
                two = inp;
              }}
              onSubmitEditing={() => {
                three.focus();
              }}
              onFocus={() => settColor('green')}
              onBlur={() => settColor('#d3d3d3')}
            />
          </>
        )}
        <Text style={styles.txt}>Image Url</Text>
        <TextInput
          style={[styles.input, {borderColor: thColor}]}
          value={imgUrl}
          onChangeText={val => setImgUrl(val)}
          returnKeyType="next"
          ref={inp => {
            three = inp;
          }}
          onSubmitEditing={() => {
            four.focus();
          }}
          onFocus={() => setthColor('green')}
          onBlur={() => setthColor('#d3d3d3')}
        />
        <Text style={styles.txt}>Description</Text>
        <TextInput
          style={[styles.input, {borderColor: fColor}]}
          value={description}
          onChangeText={val => setDescription(val)}
          ref={inp => {
            four = inp;
          }}
          onFocus={() => setfColor('green')}
          onBlur={() => setfColor('#d3d3d3')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    padding: 10,
  },
  txt: {
    fontSize: 18,
    color: 'green',
  },
  input: {
    marginVertical: 10,
    padding: 5,
    width: '100%',
    borderWidth: 1,
  },
});

export default UserEditScreen;
