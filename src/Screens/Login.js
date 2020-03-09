import React, {useCallback, useContext, useState, useEffect} from 'react';
import firebase from '../Config/Firebase';
import 'firebase/firestore';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {login, savetoken} from '../Public/Redux/actions/user';
// import AsyncStorage from '@react-native-community/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('udien@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        Alert.alert('You Succes Login');
        setLoading(false);
        navigation.navigate('Home');
      })
      .catch(function(error) {
        setLoading(false);
        Alert.alert(error.message);
      });
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
      {!loading ? (
        <TouchableOpacity style={styles.login} onPress={() => handleLogin()}>
          <Text style={styles.txtLogin}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.login} onPress={() => handleLogin()}>
          <ActivityIndicator size="small" color="white" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.register}
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
    alignSelf: 'center',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: '#33df89',
    marginTop: 30,
  },
  txtLogin: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
