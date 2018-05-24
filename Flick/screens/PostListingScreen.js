import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage, Input } from 'react-native-elements'

export default class PostListingScreen extends React.Component {

    render() {
    
        return (
            <View style={styles.container}>
                <Input 
                    placeholder='Item Name'
                />

                <Input 
                    placeholder='Price'
                />

                <Input 
                    placeholder='Description'
                />

                <Input 
                    placeholder='Tags'
                />

                <Button 
                    title='Post'
                    color='black'
                    backgroundColor='#dcf4e8'
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
});