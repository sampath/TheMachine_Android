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
            user: false,
            loading: true,
        };
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

            if( !user ) {
                GoogleSignin.signOut()
                .then(()=> {
                    global.user = {};
                    console.log('Logged Out');
                })
                .catch((err) => {
                    
                });
            } else {
                console.log('Logged In');
            }

        });
    }

    
    /**
     * Stop listening for authentication state changes when component unmounts
     */
    componentWillUnmount() {
        this.authSubscription();
    }


    render() {

        console.log(this.state.user);
        global.user = this.state.user;

        if (this.state.user) return <RootNavigation />;

        return <LoginScreen />;
    }
}

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
