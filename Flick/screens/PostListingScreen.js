import React from 'react';
import { 
    Image, 
    Platform, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View, 
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

    render() {
    
        return (
            <View style={styles.container}>
                <Header backgroundColor={colorCodes.mintCustom}
                    centerComponent={{ 
                        text:'New Listing', 
                        style: { 
                            color: '#000' 
                        } 
                    }}
                />

                <View style={styles.textInputView}>
                    <Input 
                        containerStyle={styles.textInput}
                        placeholder='Item Name'
                    />

                    <Input
                        containerStyle={styles.textInput} 
                        placeholder='Price'
                    />

                    <Input
                        containerStyle={styles.textInput} 
                        placeholder='Description'
                    />

                    <Input
                        containerStyle={styles.textInput} 
                        placeholder='Tags'
                    />
                </View>

                <Button 
                    title='Post'
                    titleStyle={{
                        color:'black',
                    }}
                    buttonStyle={{
                        backgroundColor: colorCodes.mintCustom,
                        width: '70%',
                    }}
                />
            </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  postButon: {
    alignItems: 'center',
  }
});