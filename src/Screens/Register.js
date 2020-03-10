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
  ToastAndroid,
} from 'react-native';
import md5 from 'md5';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [address, setAddress] = useState('');
  const [key, setKey] = useState('');
  const [name, setName] = useState('');
  const [usersRef, setusersRef] = useState(firebase.database().ref('users'));
  const [friendRef, setfriendRef] = useState(firebase.database().ref('friend'));
  const [loading, setLoading] = useState(false);

  const humanEdan = () => {
    if (email === '') {
      ToastAndroid.show('Email cannot be empty !', ToastAndroid.SHORT);
      return false;
    } else if (password === '') {
      ToastAndroid.show(
        'Password cannot be empty and minimum 6 of character !',
        ToastAndroid.SHORT,
      );
      return false;
    } else if (address === '') {
      ToastAndroid.show('Complete the address !', ToastAndroid.SHORT);
      return false;
    } else if (password !== password2) {
      ToastAndroid.show('Password not same !', ToastAndroid.SHORT);
      setPassword('');
      setPassword2('');
      return false;
    } else {
      return true;
    }
  };

  const handleSignUp = async () => {
    if (humanEdan()) {
      setLoading(true);
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
              setLoading(false);
              saveUser(createdUser).then(() => {
                ToastAndroid.show(
                  'Register sucess, please Login !',
                  ToastAndroid.SHORT,
                );
              });
            });

          navigation.navigate('Login');
        })
        .catch(function(error) {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
          setLoading(false);
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
      key: key,
    });
  };

  // const createFriend = createdUser => {
  //   return friendRef.child(createdUser.user.uid).set({
  //     name: createdUser.user.displayName,
  //     avatar: createdUser.user.photoURL,
  //     status: 'none',
  //     latitude: 0,
  //     longitude: 0,
  //     log: 'offline',
  //     key: key,
  // };

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
        keyboardType={'email-address'}
      />
      <TextInput
        placeholder="Password..."
        style={styles.textInput}
        onChangeText={e => setPassword(e)}
        value={password}
        autoCapitalize="none"
        secureTextEntry
      />
      <TextInput
        placeholder="Password..."
        style={styles.textInput}
        onChangeText={e => setPassword2(e)}
        value={password2}
        autoCapitalize="none"
        secureTextEntry
      />
      <TextInput
        placeholder="Address..."
        style={styles.textInput}
        onChangeText={e => setAddress(e)}
        value={address}
      />
      <TextInput
        placeholder="@AIO_example"
        style={styles.textInput}
        onChangeText={e => setKey(e)}
        value={key}
      />

      {!loading ? (
        <TouchableOpacity style={styles.login} onPress={() => handleSignUp()}>
          <Text style={styles.txtLogin}>Register</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.login}>
          <ActivityIndicator size="small" color="white" />
        </TouchableOpacity>
      )}
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

export default Register;
