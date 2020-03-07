import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '../../Screens/Home';
import Maps from '../../Screens/Maps';

const Tab = createMaterialTopTabNavigator();

const MainNav = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Maps" component={Maps} />
    </Tab.Navigator>
  );
};

export default MainNav;
