import React from 'react';
import {
    Button,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { 
    Header,
    ListItem, 
} from 'react-native-elements'


import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';


const list = [
  {
    title: 'About',
    icon: 'info'
  },
  {
    title: 'Logout',
    icon: 'flight-takeoff'
  },
  {
    title: 'Delete Account',
    icon: 'flight-takeoff'
  },
]

export default class SettingsScreen extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
    
        return (
            <View style={styles.container}>
                <Button
                    onPress={this.onloginOrRegister.bind(this)}
                    title='Login'
                />
                <Header backgroundColor={colorCodes.mintCustom}
                    centerComponent={{ 
                        text:'Settings', 
                        style: { 
                            color: '#000' 
                        } 
                    }}
                />
                {
                    list.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            leftIcon={{ name: item.icon }}
                        />
                    ))
                }
            </View>
        );
  }


  // Methods
  onloginOrRegister = ()=> {

    GoogleSignin.configure({

    }).then(()=> {

        /*
        GoogleSignin.signIn().then((user)=> {
            alert(user);
        }).catch((err) => {
            alert(err);
        }).done();
        */

        GoogleSignin.signIn().then((data) => {
            // Create firebase creds with token
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
            console.log('Credential: ', credential);
            // Login wiith credential
            return firebase.auth().signInAndRetrieveDataWithCredential(credential);
        }).then((user)=> {
            // If you need to do anything with the user, do it here
            // The user will be logged in automatically by the
            // `onAuthStateChanged` listener we set up in App.js earlier
        }).catch((error)=> {
            const { code, message} = error;

        });

    });
    /*
    GoogleSignin.signIn().then((user)=> {
        alert(user);
    }).catch((err) => {
        alert(err);
    }).done();
    */
    /*
    GoogleSignin.getAccessToken().then((token) => {
        var accessToken = Firebase.auth.GoogleAuthProvider.credential(token);
        //handleFirebaseLogin(accessToken);
    })
    .catch((err) => {
    })
    .done();
    */
      //alert('btn pressed');
      /*
      GoogleSignin.signIn()
        .then((data) => {
            // Create new firebase credential with token
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
            
            // Login with credential
            return firebase.auth().signInWithCredential(credential);
        })
        .then((user) => {
            // If you need to do anything with the user, do it here
            // The user will be logged in automatically by the
            // `onAuthStateChanged` listener we set up in App.js earlier
        })
        .catch((error)=> {
            const { code, message} = error;

        });
    */
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

