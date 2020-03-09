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
      <Text>Haiii</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Splash;
