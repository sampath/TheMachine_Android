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

            // Create firebase credneeital with token
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
            // login with credential
            const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
            console.info(JSON.stringify(currentUser.toJSON));
        } catch(e) {
            console.error(e);
        }
        
        //GoogleSignin.configure({}).then(()=> {

            /*
            GoogleSignin.signIn().then((user)=> {
                alert(user);
            }).catch((err) => {
                alert(err);
            }).done();
            */
        console.log("login called");
        
        /*
        GoogleSignin.signIn().then((data) => {
            // Create firebase creds with token
            console.log("wtf");
            console.log(data);
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
            console.log('Credential: ' + credential);
            // Login wiith credential
            return firebase.auth().signInAndRetrieveDataWithCredential(credential);
        }).then((user)=> {
            console.log(user);
            // If you need to do anything with the user, do it here
            // The user will be logged in automatically by the
            // `onAuthStateChanged` listener we set up in App.js earlier
        }).catch((error)=> {
            const { code, message} = error;

        }).done();
        */

        //});
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});