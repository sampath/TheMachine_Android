import React from 'react';
import {StackNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import PostListingScreen from '../screens/PostListingScreen';
import LoginScreen from '../screens/LoginScreen';


const RootStackNavigator = StackNavigator(
    {
        Main: {
            screen: MainTabNavigator,
        },
        PostListing: {
            screen: PostListingScreen
        },
        Login: {
            screen: LoginScreen
        },

    },
    {
        headerMode: 'none',
        navigationOptions: () => ({
            headerTitleStyle: {
                fontWeight: 'normal',
            }
        })
    }
);

export default class RootNavigation extends React.Component {
    render() {
        return <RootStackNavigator />;
    }
}