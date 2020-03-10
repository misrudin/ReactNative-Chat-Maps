import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {savetoken} from '../Public/Redux/actions/user';
import AsyncStorage from '@react-native-community/async-storage';

const Splash = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      const getToken = async () => {
        await AsyncStorage.getItem('Token', (err, token) => {
          dispatch(savetoken(token));
        });
      };
      getToken();
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text>
      <Text style={styles.to}>To</Text>
      <Text style={styles.haeu}>Haeu</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'salmon',
    marginBottom: 10,
  },
  to: {
    color: '#333',
    marginBottom: 10,
  },
  haeu: {
    color: 'green',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default Splash;
