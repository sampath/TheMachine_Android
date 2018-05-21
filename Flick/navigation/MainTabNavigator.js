import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';


export default TabNavigator(
    {
        Settings: {
            screen: SettingsScreen,
        },
        Profile: {
            screen: ProfileScreen,
        },
        Home: {
            screen: HomeScreen,
        },
    },
    {
        tabBarOptions : {
            activeTintColor: '#000',
            inactiveTintColor: '#000',
            style: {
                backgroundColor: '#dcf4e8',
            }
        },
        animationEnabled: false,
    },
)
