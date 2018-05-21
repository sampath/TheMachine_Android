import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage, } from 'react-native-elements'

export default class PostListingScreen extends React.Component {

    render() {
    
        return (
            <View style={styles.container}>
                <FormLabel>Item Name</FormLabel>
                <FormInput />

                <FormLabel>Price</FormLabel>
                <FormInput />

                <FormLabel>Description</FormLabel>
                <FormInput />

                <FormLabel>Tags</FormLabel>
                <FormInput />

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