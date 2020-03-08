import React from 'react';
// import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainNav from './src/Public/Navigators/MainNav';
import {AuthProvider} from './src/Public/Context/auth';
import {decode, encode} from 'base-64';
import Header from './src/Components/Header';

const App = () => {
  if (!global.btoa) {
    global.btoa = encode;
  }

  if (!global.atob) {
    global.atob = decode;
  }
  return (
    <AuthProvider>
      <NavigationContainer>
        <Header />
        <MainNav />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
