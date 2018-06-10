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
import firebase from 'react-native-firebase';

import MainTabNavigation from './navigation/MainTabNavigation';
import RootNavigation from './navigation/RootNavigation';
import LoginNavigation from './navigation/LoginNavigation';

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
        global.userData = this.state.userData;

        // If the user state hasn't been determined
        if (this.state.loading) return null;

        // If the user is logged in
        if (this.state.user && !this.state.user.error) {
            return <RootNavigation props={this.state.user}/>;
        }

        // If the user isn't logged in
        return <LoginNavigation />;
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

            fetch('https://flick-prod.herokuapp.com/users/' + user._user.uid, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                this.setState({
                    userData: response
                });
            })
            .done();
        })
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
