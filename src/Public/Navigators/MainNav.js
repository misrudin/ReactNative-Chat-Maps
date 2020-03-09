import React, {useState} from 'react';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../Screens/Home';
import Maps from '../../Screens/Maps';
import Login from '../../Screens/Login';
import Register from '../../Screens/Register';
import ChatRoom from '../../Screens/ChatRoom';
import AddProfile from '../../Screens/AddProfile';
import Splash from '../../Screens/Splash';
import {useSelector} from 'react-redux';

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
  const {loading, token} = useSelector(state => state.user);

  if (loading) {
    return <Splash />;
  }
  return (
    <Stack.Navigator>
      {token === null ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddProfile"
            component={AddProfile}
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
        </>
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthNav;
