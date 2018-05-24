/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 // To run emulator on windows, run command:
 // cd %ANDROID_HOME%/tools && emulator.exe -avd Pixel_2_API_25

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { TabNavigator, TabBarBottom } from 'react-navigation';
import MainTabNavigation from './navigation/MainTabNavigator';
import RootNavigation from './navigation/RootNavigation';

type Props = {};

export default class App extends Component<Props> {

    constructor(props) {
        super(props);
    
        this.state = {
            loggedIn: true,
        };
    }

    render() {

        console.log(this.state.loggedIn);

        if (this.state.loggedIn) return <RootNavigation />;

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
