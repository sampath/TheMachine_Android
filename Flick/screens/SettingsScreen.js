import React from 'react';
import {
    Button,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default class SettingsScreen extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
    
        return (
            <View style={styles.container}>
                <Text>THIS IS THE SETTINGS PAGE</Text>
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