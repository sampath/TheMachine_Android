import React from 'react';
import {
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    Button,
    Header,
    Icon,
} from 'react-native-elements';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

const width = Dimensions.get('window').width;
const halfWidth = width / 2;
 
export default class ConfirmationScreen extends React.Component {
 
 
    render() {
        return (
            <View style={styles.container}>

                <Header backgroundColor={colorCodes.mintCustom}
                    outerContainerStyles={styles.flickHeader}
                    leftComponent={
                        <Icon
                            name='arrow-back'
                            type='ionicons'
                            color='#000'
                            onPress={() => this.props.navigation.goBack(null)}
                        />
                    }
                    centerComponent={{ 
                        text: "Confirmation",
                        style: { 
                            color: '#000',
                            fontSize: 20,
                        } 
                    }}
                />

                <Text style={styles.title}>
                     Swipe right to confirm the transaction, or swipe left to cancel.
                     Note that the rental period starts at the moment you confirm,
                     so please make sure that both parties are present at the time
                     of confirmation and that the exchange of item(s) are done
                     immediately after.
                </Text>

                <View style={styles.standalone}>
                    <SwipeRow leftOpenValue={100} rightOpenValue={-100}>
                        <View style={styles.standaloneRowBack}>
                            <View style={[{backgroundColor: '#8BC645'}, styles.sliderText]}>
                                <Text style={[{textAlign: 'left', paddingLeft: 25}, styles.backTextWhite]}>Confirm</Text>
                            </View>
                            <View style={[{backgroundColor: '#FF4D4D'}, styles.sliderText]}>
                                <Text style={[{textAlign: 'right', paddingRight: 30}, styles.backTextWhite]}>Cancel</Text>
                            </View>
                        </View>
                        <View style={styles.standaloneRowFront}>
                            <Text style={{fontSize: 20}}>Swipe to confirm!</Text>
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
  flickHeader: {
    height: 60,
  },
  standalone: {
    marginBottom: 75,
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 20
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50,
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backTextWhite: {
    color: '#FFF',
  },
  sliderText: {
    width: halfWidth,
    height: 50,
    justifyContent: 'center'
  },
  title: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '300',
    padding: 25
  }
});