// To run emulator on windows, run command:
// cd %ANDROID_HOME%/tools && emulator.exe -avd Pixel_2_API_25
import React, { Component } from 'react';
import { 
    Platform, 
    StyleSheet, 
    Text, 
    View } from 'react-native';
import { 
    TabNavigator, 
    TabBarBottom 
} from 'react-navigation';
import './global.js'

import MainTabNavigation from './navigation/MainTabNavigator';
import RootNavigation from './navigation/RootNavigation';
import LoginScreen from './screens/LoginScreen';

import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';

type Props = {};

export default class App extends Component<Props> {

    constructor(props) {
        super(props);
    
        this.state = {
            loading: true,
        };
    }

    render() {
        global.user = this.state.user;

        // If the user state hasn't been determined
        if (this.state.loading) return null;

        // If the user is logged in
        if (this.state.user) return <RootNavigation props={this.state.user}/>;

        // If the user isn't logged in
        return <LoginScreen />;
    }

    /**
     * Listen for any authentication state changes in Firebase.
     * Once subscribed, the 'user' parameter will either be null(logged out) or 
     * object(logged in)
     */
    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            this.setState({
                loading: false,
                user,
            });
        });
    }
    
    /**
     * Stop listening for authentication state changes when component unmounts
     */
    componentWillUnmount() {
        this.authSubscription();
    }

}

// App functions



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
