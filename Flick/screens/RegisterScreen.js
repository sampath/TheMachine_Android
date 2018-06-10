import React from 'react';
import ImagePicker from 'react-native-image-picker';
import { 
    Alert,
    Image, 
    Platform, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View,
    PixelRatio, 
} from 'react-native';
import { 
    Header,
    Button, 
    FormLabel, 
    FormInput, 
    FormValidationMessage, 
    Input ,
} from 'react-native-elements'
import { postRequest } from '../utils'

import firebase from 'react-native-firebase';

export default class PostListingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            password: '',
            passwordverify: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
            
                <Header backgroundColor={colorCodes.mintCustom}
                    outerContainerStyles={styles.flickHeader}
                    centerComponent={{ 
                        text:'Register', 
                        style: { 
                            color: '#000'
                        } 
                    }}
                />

                <View style={styles.bodyStyle}>

                    <Input containerStyle={styles.textInput}
                        placeholder='Full Name'
                        leftIcon={{
                            type:'feather',
                            name:'user',
                        }}
                        onChangeText={(name) => this.setState({name})}
                    />

                    <Input containerStyle={styles.textInput}
                        placeholder='Email'
                        leftIcon={{
                            type:'feather',
                            name:'mail',
                        }}
                        onChangeText={(email) => this.setState({email})}
                    />
                    
                    <Input containerStyle={styles.textInput}
                        placeholder='Phone Number'
                        leftIcon={{
                            type:'feather',
                            name:'phone',
                        }}
                        onChangeText = {(phone) => this.setState({phone})}
                    />

                    <Input containerStyle={styles.textInput}
                        secureTextEntry={true}
                        placeholder='Password'
                        leftIcon={{
                            type:'feather',
                            name:'lock',
                        }}
                        onChangeText={(password) => this.setState({password})}
                    />

                    <Input containerStyle={styles.textInput}
                        secureTextEntry={true}
                        placeholder='Confirm Password'
                        leftIcon={{
                            type:'feather',
                            name:'lock',
                        }}
                        onChangeText={(passwordverify) => this.setState({passwordverify})}
                    />


                    <View style={styles.button}>
                        <Button 
                            title='Register'
                            onPress={() => {this.onRegister()}}
                            titleStyle={{
                                color:'black',
                            }}
                            buttonStyle={{
                                backgroundColor: colorCodes.mintCustom,
                                width: 370,
                            }}
                        />
                    </View>
                </View>
            </View>
        );

    }

    async onRegister() {

        const valid = this.validateInput();

        if (valid) {
            // Will be set by the forms
            const { email, password } = this.state;

            firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
            .then((firebaseuser) => {
                console.log(firebaseuser)

                this.setState({
                    user: firebaseuser.user._user
                });
                global.user = firebaseuser.user._user;

                // Create a new user in our users firebase table
                this.createUserEntry();

                // Go back to the sign in page
                this.props.navigation.goBack(null);

            })
            .catch((err) => {
                // If an error occurs, capture and log the message
                const { code, message } = err;
                console.log(code, message);
            })
            
        } else {
            // Let the user know they have invalid
            Alert.alert('Invalid Input');
        }


    }

    validateInput() {
        if (isNaN(this.state.phone)){return false;}
        if (this.state.email == ''){return false;}
        if (this.state.password == ''){return false;}
        if (this.state.passwordverify ==''){return false;}
        if (this.state.password != this.state.passwordverify) {return false;}
        return true;
    }

    createUserEntry() {
        var formData = {
            userID: global.user._user.uid,
            name: this.state.name,
            email: this.state.email,
            phoneNumber: this.state.phone,
        }
        postRequest('users/', formData);
    }

  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flickHeader: {
    height: 60,
  },
  bodyStyle: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25
  },
  textInputView: {
    alignItems: 'center',
    marginTop: 15,
  },
  textInput: {
    marginBottom: 15,
    // backgroundColor: colorCodes.lightGreyCustom,
    borderBottomWidth: 0,
  },
  button: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageContainer: {
      borderRadius: 5,
      width: 200,
      height: 200,
      borderColor: '#9B9B9B',
      borderWidth: 1 / PixelRatio.get(),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 37
      
    },
});