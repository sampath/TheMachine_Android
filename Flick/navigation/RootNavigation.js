import React from 'react';
import {StackNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import PostListingScreen from '../screens/PostListingScreen';


const RootStackNavigator = StackNavigator(
    {
        Main: {
            screen: MainTabNavigator,
        },
        'Post Listing': {
            screen: PostListingScreen
        }
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