import React, {useCallback, useContext, useState, useEffect} from 'react';
import app from '../Config/Firebase';
import 'firebase/firestore';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {login, savetoken} from '../Public/Redux/actions/user';
import AsyncStorage from '@react-native-community/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('din@gmail.com');
  const [password, setPassword] = useState('123');
  const dispatch = useDispatch();
  const {token, isPending} = useSelector(state => state.user);

  const saveToken = async () => {
    try {
      const gettoken = token;
      // await AsyncStorage.setItem('Token', token);
    } catch (error) {
      console.warn(error.msg);
    }
  };

  const handleLogin = async () => {
    const data = {
      email,
      password,
    };
    await dispatch(login(data)).then(() => {});
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email..."
        style={styles.textInput}
        onChangeText={e => setEmail(e)}
        keyboardType={'email-address'}
        autoCapitalize="none"
        value={email}
      />
      <TextInput
        placeholder="Password..."
        style={styles.textInput}
        onChangeText={e => setPassword(e)}
        secureTextEntry
        autoCapitalize="none"
        value={password}
      />
      <TouchableOpacity style={styles.login} onPress={() => handleLogin()}>
        <Text style={styles.txtLogin}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.login}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.txtLogin}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  login: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  txtLogin: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: '#33df89',
    marginTop: 20,
  },
});

export default Login;
