import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from 'react-native';
import { 
    Button,
    Input,
 } from 'react-native-elements';

import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';


export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logoStyle}
                    source={require('../img/flick_logo.png')}
                />
                <Text style={styles.titleStyle}>flick</Text>
                <Text style={styles.subStyle}>what you need, when you need it</Text>
                
                <Input
                    placeholder='Email'
                    leftIcon={{
                        type:'feather'
                        name:'mail'
                    }}
                    onChangeText={{(email) => this.setState({name})}}
                />
                <Input
                    secureTextEntry=true
                    placeholder='password'
                    leftIcon={{
                        type:'feather'
                        name:'lock'
                    }}
                    onChangeText={{(pass) => this.setState({pass})}}
                />

                <Button style={styles.loginButton} 
                    onPress={this.onLogin.bind(this)}
                    title='Login'
                />

                <TouchableHighlight style={styles.buttonWrap} 
                    onPress={this.props.navigation.navigate('Register')}
                >
                    <Text style={styles.subStyle}>
                        Not a user? Register here
                    </Text>
                </TouchableHighlight>

            </View>
        );
    }

    onLogin() {
        // Will be set by the forms
        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((firebaseuser) => {
            console.log(firebaseuser)
            this.setState({
                user: firebaseuser
            })
        })
        .catch((err) => {
            // If an error occurs, capture and log the message
            const { code, message } = err;
            console.log(code, message);
        })
    }




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    alignItems: 'center',

  },
  buttonStyle: {
    width: 300,
    height: 70,
  },
  buttonWrap: {
    marginTop: 100,
  },
  logoStyle: {
    marginTop: 100,
    width: 200,
    height: 200,

  },
  titleStyle: {
    marginTop: 10,
    fontSize: 50,
    fontWeight: '100'
  },
  subStyle: {
    marginTop: 2,
    fontSize: 20,
    fontWeight: '200'
  }
});