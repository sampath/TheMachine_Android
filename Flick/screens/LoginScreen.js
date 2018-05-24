import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Button } from 'react-native-elements';
// import firebase from 'react-native-firebase';


export default class LoginScreen extends React.Component {


    render() {
        return (
            <View style={styles.container}>
                <Text>THIS IS THE LOGIN PAGE</Text>
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