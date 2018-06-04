import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Button } from 'react-native-elements';

import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';


export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            userExists: null
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>THIS IS THE LOGIN PAGE</Text>
                <Button
                    onPress={this.onloginOrRegister.bind(this)}
                    title='Login'
                />
            </View>
        );
  }

    // Methods
    onloginOrRegister = async () => {
        try {
            await GoogleSignin.configure();
            const data = await GoogleSignin.signIn();
            console.log(data);

            global.user = data;

            // Create firebase credential with token
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);

            // login with credential
            const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

            console.log("Checking if user exists");
            // Check if the user exists in the database
            fetch('https://flick-prod.herokuapp.com/users/' + global.user._user.uid, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            })
            .then((response) => response.json())
            .then((response) => {

                console.log("made it here");

                this.setState({
                    userExists: response
                });

                console.log("got user info");
                // If the user doesn't exist in the database, add them
                if (!this.state.userExists) {

                    console.log("Creating new user");
                    var phoneNumber = (global.user.user_.phoneNumber)  ? global.user.user_.phoneNumber : 'no number'
                    var formData = {
                        userID: global.user._user.uid,
                        name: global.user._user.displayName,
                        email: global.user._user.email,
                        phoneNumber: phoneNumber,
                    }

                    var formBody = [];
                    for ( var property in formData) {
                        var encodedKey = encodeURIComponent(property);
                        var encodedValue = encodeURIComponent(formData[property]);
                        formBody.push(encodedKey + "=" + encodedValue);
                    }
                    formBody = formBody.join("&");

                    fetch('https://flick-prod.herokuapp.com/users/' + global.user._user.uid, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: formBody
                    })
                    .done();                
                }
            })
            .done();

        } catch(e) {
            console.error(e);
        }

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});