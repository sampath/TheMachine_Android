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
                
                <Input containerStyle={styles.textInput}
                    placeholder='Email'
                    leftIcon={{
                        type:'feather',
                        name:'mail',
                    }}
                    onChangeText={(email) => this.setState({email})}
                />
                <Input containerStyle={styles.textInput}
                    secureTextEntry={true}
                    placeholder='password'
                    leftIcon={{
                        type:'feather',
                        name:'lock',
                    }}
                    onChangeText={(password) => this.setState({password})}
                />

                <View style={styles.button}>
                    <Button style={styles.loginButton} 
                        title='Login'
                        onPress={this.onLogin.bind(this)}
                        titleStyle={{
                            color:'black',
                        }}
                        buttonStyle={{
                            backgroundColor: colorCodes.mintCustom,
                            width: 370,
                        }}
                    />
                </View>

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
            console.log(firebaseuser);
            this.setState({
                user: firebaseuser.user._user
            });

            global.user = firebaseuser.user._user;

            // getUserData(global.user.uid)
            // .then((data) => {
            //     global.userData = data;
            // });

            // fetch('https://flick-prod.herokuapp.com/users/' + global.user.uid, {
            //     method: 'GET',
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            // })
            // .then((response) => response.json())
            // .then((response) => {
            //     global.userData = response;
            // })
            // .done();

        })
        .catch((err) => {
            // If an error occurs, capture and log the message
            const { code, message } = err;
            console.log(code, message);
        })
    }

    getUser() {

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
    marginTop: '25%',
  },
  logoStyle: {
    marginTop: '5%',
    width: 200,
    height: 200,
  },
  textInput: {
    marginBottom: 15,
    // backgroundColor: colorCodes.lightGreyCustom,
    borderBottomWidth: 0,
  },
  titleStyle: {
    marginTop: '1%',
    fontSize: 50,
    fontWeight: '100'
  },
  subStyle: {
    marginTop: '.5%',
    marginBottom: '3%',
    fontSize: 20,
    fontWeight: '200'
  },
  button: {
    marginTop: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});