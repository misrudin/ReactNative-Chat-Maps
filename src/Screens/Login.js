import React, {useCallback, useContext, useState, useEffect} from 'react';
import firebase from '../Config/Firebase';
import 'firebase/firestore';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {login, savetoken} from '../Public/Redux/actions/user';
import AsyncStorage from '@react-native-community/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const saveToken = async token => {
    await dispatch(savetoken(token));
  };

  const handleLogin = async () => {
    setLoading(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        saveToken(res.user.uid);
        setLoading(false);
      })
      .catch(function(error) {
        setLoading(false);
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      });
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f9f6f7',
      }}>
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
        {!loading ? (
          <TouchableOpacity style={styles.login} onPress={() => handleLogin()}>
            <Text style={styles.txtLogin}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.login}>
            <ActivityIndicator size="small" color="white" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.register}
          onPress={() => navigation.navigate('Register')}>
          <Text style={{color: '#ff971d'}}>Not have account ? Register</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    borderRadius: 5,
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 1,

    elevation: 4,
  },
  login: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: '#ff971d',
    marginTop: 20,
  },
  txtLogin: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  register: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Login;
