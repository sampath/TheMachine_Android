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
                        text:'New Listing', 
                        style: { 
                            color: '#000'
                        } 
                    }}
                />

                <View style={styles.bodyStyle}>

                    <Input style={styles.textInput}
                        placeholder='Email'
                        leftIcon={{
                            type:'feather',
                            name:'mail',
                        }}
                        onChangeText={(email) => this.setState({email})}
                    />
                    
                    <Input style={styles.textInput}
                        placeholder='Phone Number'
                        leftIcon={{
                            type:'feather',
                            name:'phone',
                        }}
                        onChangeText = {(phone) => this.setState({phone})}
                    />

                    <Input style={styles.textInput}
                        secureTextEntry={true}
                        placeholder='Password'
                        leftIcon={{
                            type:'feather',
                            name:'lock',
                        }}
                        onChangeText={(password) => this.setState({password})}
                    />

                    <Input style={styles.textInput}
                        secureTextEntry={true}
                        placeholder='Confirm Password'
                        leftIcon={{
                            type:'feather',
                            name:'lock',
                        }}
                        onChangeText={(passwordverify) => this.setState({passwordverify})}
                    />


                    <View style={styles.postButton}>
                        <Button 
                            title='Register'
                            titleStyle={{
                                color:'black',
                            }}
                            onPress={() => {this.onRegister()}}
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

    onRegister() {

        const valid = this.validateInput();

        if (valid) {
            // Will be set by the forms
            const { email, password } = this.state;

            firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
            .then((firebaseuser) => {
                console.log(user)

                // TODO: Create a new user in our users firebase table
                // TODO: Go back to the sign in page
                this.props.navigation.goBack(null);
            })
            .catch((err) => {
                // If an error occurs, capture and log the message
                const { code, message } = err;
                console.log(code, message);
            })
            
        }

        Alert.alert('Invalid Input');

}

    validateInput(){
        if (isNaN(this.state.phone)){return false;}
        if (this.state.email == ''){return false;}
        if (this.state.password == ''){return false;}
        if (this.state.passwordverify ==''){return false;}
        if (this.state.password != this.state.passwordverify) {return false;}
        return true;
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
    backgroundColor: colorCodes.lightGreyCustom,
    borderBottomWidth: 0,
  },
  postButton: {
    position: 'absolute',
    bottom: 25,
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