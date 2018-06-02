import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import PostListingScreen from '../screens/PostListingScreen';
import ViewListingScreen from '../screens/ViewListingScreen';


const RootStackNavigator = createStackNavigator(
    {
        Main: {
            screen: MainTabNavigator,
        },
        ViewListing: {
            screen: ViewListingScreen
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