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

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');

  const handleSignUp = async () => {
    const data = {email, password, address, gender};
    // try {
    //   await app.auth().createUserWithEmailAndPassword(email, password);
    // } catch (error) {
    //   console.log(error);
    // }
    navigation.navigate('AddProfile', {data: data});
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email..."
        style={styles.textInput}
        onChangeText={e => setEmail(e)}
        value={email}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password..."
        style={styles.textInput}
        onChangeText={e => setPassword(e)}
        value={password}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Address..."
        style={styles.textInput}
        onChangeText={e => setAddress(e)}
        value={address}
      />
      <TextInput
        placeholder="Gender..."
        style={styles.textInput}
        onChangeText={e => setGender(e)}
        value={gender}
      />
      <TouchableOpacity style={styles.login} onPress={() => handleSignUp()}>
        <Text style={styles.txtLogin}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.login}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.txtLogin}>Login</Text>
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

export default Register;
