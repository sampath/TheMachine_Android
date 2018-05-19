import React from 'react';
import { StyleSheet } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';

const RootTabNavigator = TabNavigator(
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

export default class RootNavigation extends React.Component {
    render() {
        return <RootTabNavigator />;
    }
}

// const styles = StyleSheet.create({
//   menu: {
//     backgroundColor: #FF0000,
//   },
// });