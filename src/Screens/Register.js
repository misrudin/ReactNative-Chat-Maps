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
import md5 from 'md5';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [usersRef, setusersRef] = useState(firebase.database().ref('users'));

  const humanEdan = () => {
    if (email === '') {
      Alert.alert('Email cannot be empty');
      return false;
    } else if (password === '') {
      Alert.alert('Password cannot be empty');
      return false;
    } else if (address === '') {
      Alert.alert('Fullname cannot be empty');
      return false;
    } else if (password !== password2) {
      Alert.alert('Password is not same');
      setPassword('');
      setPassword2('');
      return false;
    } else {
      return true;
    }
  };

  const handleSignUp = async () => {
    if (humanEdan()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(createdUser => {
          createdUser.user
            .updateProfile({
              displayName: name,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email,
              )}?d=identicon`,
            })
            .then(() => {
              saveUser(createdUser).then(() => {
                Alert.alert('You succes Register');
              });
            });

          navigation.navigate('Login');
        })
        .catch(function(error) {
          Alert.alert(error.message);
        });
    }
  };

  const saveUser = createdUser => {
    return usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
      status: 'none',
      latitude: 0,
      longitude: 0,
      log: 'offline',
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Profile name..."
        style={styles.textInput}
        onChangeText={e => setName(e)}
        value={name}
        autoCapitalize="none"
      />
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
        placeholder="Password..."
        style={styles.textInput}
        onChangeText={e => setPassword2(e)}
        value={password2}
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
