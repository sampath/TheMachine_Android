import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';


const LoginStackNavigator = createStackNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        Register: {
            screen: RegisterScreen
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

export default class LoginNavigation extends React.Component {
    render() {
        return <LoginStackNavigator />;
    }
}