import React, {useState} from 'react';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../Screens/Home';
import Maps from '../../Screens/Maps';
import Login from '../../Screens/Login';
import Register from '../../Screens/Register';
import ChatRoom from '../../Screens/ChatRoom';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const MainNav = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Maps" component={Maps} />
    </Tab.Navigator>
  );
};

const AuthNav = () => {
  return (
    <Stack.Navigator initialRouteName="Register">
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={MainNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNav;
