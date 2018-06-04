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
                console.log(response);
                
                var userExists = response

                console.log("got user info");
                // If the user doesn't exist in the database, add them
                if (userExists.error) {

                    console.log("Creating new user");

                    console.log(global.user);

                    var formData = {
                        userID: global.user._user.uid,
                        name: global.user._user.displayName,
                        email: global.user._user.email,
                        phoneNumber: 'phoneNumber'
                    }

                    var formBody = [];
                    for ( var property in formData) {
                        var encodedKey = encodeURIComponent(property);
                        var encodedValue = encodeURIComponent(formData[property]);
                        formBody.push(encodedKey + "=" + encodedValue);
                    }
                    formBody = formBody.join("&");

                    console.log("FB", formBody)

                    fetch('https://flick-prod.herokuapp.com/users/', {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
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