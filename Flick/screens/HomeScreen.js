import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Button, SearchBar } from 'react-native-elements';


export default class HomeScreen extends React.Component {


    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    // platform='android'
                    conatinerStyle={{
                        color: 'red',
                        backgroundColor: 'red'
                    }}
                    // onChangeText={someMethod}
                    // onClear={someMethod}
                    placeholder='Type Here...' 
                />
                <Text>THIS IS THE HOME PAGE</Text>
                <Button
                    title='New Post'
                    onPress={() => this.props.navigation.navigate('PostListing')}
                    color='black'
                    backgroundColor='#dcf4e8'
                    buttonStyle={{
                        width: 100,
                        position: 'absolute',
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
});