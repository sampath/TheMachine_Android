import React from 'react';
import {StackNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

const RootStackNavigator = StackNavigator(
    {
        Main: {
            screen: MainTabNavigator,
        },
    },
    {
        // headerMode: 'none',
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