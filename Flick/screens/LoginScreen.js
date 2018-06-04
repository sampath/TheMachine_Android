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

            // Create firebase credential with token
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
            // login with credential
            const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
            console.log(currentUser.toJSON);
        } catch(e) {
            console.error(e);
        }
        
        console.log("login called");

        //});
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});