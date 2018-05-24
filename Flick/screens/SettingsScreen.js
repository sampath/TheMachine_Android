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
import { ListItem } from 'react-native-elements'

const list = [
  {
    title: 'About',
    icon: 'info'
  },
  {
    title: 'Logout',
    icon: 'flight-takeoff'
  },
  {
    title: 'Delete Account',
    icon: 'flight-takeoff'
  },
]

export default class SettingsScreen extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
    
        return (
            <View style={styles.container}>
                {
                    list.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            leftIcon={{ name: item.icon }}
                        />
                    ))
                }
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