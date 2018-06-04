import React from 'react';
import { 
    StyleSheet, 
    View, 
} from 'react-native';
import { StackNavigator, createBottomTabNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AlertsScreen from '../screens/AlertsScreen';


export default createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                label: '',
                tabBarIcon: ({tintColor}) => <Icon name='home' color={tintColor} />
            },
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                label: '',
                tabBarIcon: ({tintColor}) => <Icon name='accessibility' color={tintColor} />
            },
        },
        Alerts: {
            screen: AlertsScreen,
            navigationOptions: {
                label: '',
                tabBarIcon: ({tintColor}) => <Icon name='notifications-active' color={tintColor} />
            }
        }
    },
    {
        initialRouteName: 'Home',
        tabBarPosition: 'bottom',
        tabBarOptions : {
            showIcon: true,
            showLabel: false,
            activeTintColor: '#000',
            inactiveTintColor: '#000',
            style: {
                backgroundColor: '#dcf4e8',
            },
        },
        animationEnabled: false,
    },
)
