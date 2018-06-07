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
                        type:'feather',
                        name:'mail',
                    }}
                    onChangeText={(email) => this.setState({email})}
                />
                <Input
                    secureTextEntry={true}
                    placeholder='password'
                    leftIcon={{
                        type:'feather',
                        name:'lock',
                    }}
                    onChangeText={(password) => this.setState({password})}
                />

                <Button style={styles.loginButton} 
                    onPress={this.onLogin.bind(this)}
                    title='Login'
                />

                <TouchableOpacity style={styles.buttonWrap} 
                    onPress={() => this.props.navigation.navigate('Register')}
                >
                    <Text style={styles.subStyle}>
                        Not a user? Register here
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }

    onLogin() {
        // Will be set by the forms
        const { email, password } = this.state;

        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
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
    marginTop: 90,
  },
  logoStyle: {
    marginTop: 50,
    width: 200,
    height: 200,

  },
  titleStyle: {
    marginTop: 5,
    fontSize: 50,
    fontWeight: '100'
  },
  subStyle: {
    marginTop: 2,
    fontSize: 20,
    fontWeight: '200'
  }
});