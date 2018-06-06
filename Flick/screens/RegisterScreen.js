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
export default class PostListingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            pass: '',
            passverify: '',
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

                    <Input 
                        containerStyle={styles.textInput}
                        placeholder='Item Name'
                        onChangeText = {(name) => this.setState({name})}
                    />

                    <Input
                        containerStyle={styles.textInput} 
                        placeholder='Price'
                        onChangeText = {(price) => this.setState({price})}
                    />

                    <Input
                        containerStyle={styles.textInput} 
                        placeholder='Description'
                        onChangeText = {(descr) => this.setState({descr})}
                    />

                    <Input
                        containerStyle={styles.textInput} 
                        placeholder='Tags'
                        onChangeText = {(tags) => this.setState({tags})}
                    />

                    <View style={styles.postButton}>
                        <Button 
                            title='Post'
                            titleStyle={{
                                color:'black',
                            }}
                            onPress={() => {this.handlePost()}}
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

            firebase.auth().createUserWithEmailAndPassword(email, password)
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

}

    validateInput(){
        if(isNaN(this.state.price) | this.state.price=='' ){return false;}
        // if(this.state.imageUri == null){return false;}
        if(this.state.itemName == ''){return false;}
        if(this.state.tags == ''){return false;}
        if(this.state.descr==''){return false;}
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