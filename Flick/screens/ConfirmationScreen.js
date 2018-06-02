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
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
 
export default class ConfirmationScreen extends React.Component {
 
 
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.standalone}>
                    <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
                        <View style={styles.standaloneRowBack}>
                            <Text style={styles.backTextWhite}>Left</Text>
                            <Text style={styles.backTextWhite}>Right</Text>
                        </View>
                        <View style={styles.standaloneRowFront}>
                            <Text>I am a standalone SwipeRow</Text>
                        </View>
                    </SwipeRow>
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
  standalone: {
    marginTop: 30,
    marginBottom: 30,
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50,
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#8BC645',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  backTextWhite: {
    color: '#FFF',
  },
});