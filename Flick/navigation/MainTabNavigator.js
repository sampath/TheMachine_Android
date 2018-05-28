import React from 'react';
import { 
    StyleSheet, 
    View, 
} from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';


export default TabNavigator(
    {
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                label: '',
                tabBarIcon: ({tintColor}) => <Icon name='accessibility' color={tintColor} />
            }
        },
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                label: '',
                tabBarIcon: ({tintColor}) => <Icon name='home' color={tintColor} />
            }
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                label: '',
                tabBarIcon: ({tintColor}) => <Icon name='settings' color={tintColor} />
            }
        },
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
