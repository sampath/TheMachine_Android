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
        this.state = {name: '', price: '', descr: '', tags: '', imageData: '', imageUri: null};
    }

    // Extracts data from form and creates a listing on the database
    handlePost() {
        var valid = this.validateInput()
        console.log(valid)
        if(valid){
            var data = {
                'ownerID': global.user._user.uid,
                'itemName': this.state.name,
                'tags': this.state.tags,
                'price': this.state.price,
                'description': this.state.descr,
                'picturePath': this.state.imageData,
            };

            var formBody = [];
            for( var property in data){
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(data[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            fetch('https://flick-prod.herokuapp.com/test/listings/', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
            })
            .done()
            this.props.navigation.goBack(null)

        }else{Alert.alert('Invalid Input')}
    }

    validateInput(){
        if(isNaN(this.state.price) | this.state.price=='' ){return false;}
        if(this.state.imageUri == null){return false;}
        if(this.state.itemName == ''){return false;}
        if(this.state.tags == ''){return false;}
        if(this.state.descr==''){return false;}
        return true;

    }
    handleImagePick() {
        const options = {
            quality: 1.0,
            maxWidth: 200,
            maxHeight: 200,
            storageOptions: {
            skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) =>{
                console.log('Response = ', response);
  
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }

            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }

            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }

            else {
                let source = response.data
                
                this.setState({  
                imageData: source,
                imageUri: {uri: response.uri}
              });
            console.log(this.state.imageUri)

            }
        });

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

                        <TouchableOpacity onPress={this.handleImagePick.bind(this)}>
                            <View style={styles.ImageContainer}>
                            {
                                this.state.imageUri == null ? <Text> Upload Photo </Text>:
                                <Image style = {styles.ImageContainer} source={this.state.imageUri} />
                            }
                            </View>
                        </TouchableOpacity>

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