import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MainTabNavigation from './MainTabNavigation';
import PostListingScreen from '../screens/PostListingScreen';
import ViewListingScreen from '../screens/ViewListingScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';


const RootStackNavigator = createStackNavigator(
    {
        Main: {
            screen: MainTabNavigation,
        },
        ViewListing: {
            screen: ViewListingScreen
        },
        PostListing: {
            screen: PostListingScreen
        },
        Confirmation: {
            screen: ConfirmationScreen
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