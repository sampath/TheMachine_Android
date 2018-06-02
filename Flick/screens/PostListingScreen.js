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
                    
                    <View style={styles.postButton}>
                        <Button 
                            title='Preview'
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
});