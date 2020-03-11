import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {savetoken} from '../Public/Redux/actions/user';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
      <Icon
        name="comments"
        solid
        color="green"
        size={80}
        style={styles.logoHayuu}
      />
      <Text style={styles.haeu}>Hayuu</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  to: {
    color: '#333',
    marginBottom: 10,
  },
  haeu: {
    color: 'green',
    fontSize: 40,
    fontWeight: 'bold',
  },
  logoHayuu: {
    shadowColor: '#333',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
  },
});

export default Splash;
