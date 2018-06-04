import React from 'react';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';

import {
    Button,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    FlatList,
} from 'react-native';
import {
    Header,
    Divider,
    Avatar,
    Rating,
    Text,
    ButtonGroup,
    ListItem,
} from 'react-native-elements'

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            selectedIndex: 0
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex})
    }

    // Methods
    async signOut() {
            firebase.auth().signOut()
            .then(() => {
                console.log("Logged out of firebase");
            })
            .catch((e) => {
                console.log(e);
            })
    }

    render() {
        const userListingData = [
            {   
                key: '1',
                name: 'JBL Speaker',
                price: '$10',
                thumbnail: 'info',
            },
            {
                key: '2',
                name: 'Another Speaker',
                price: '$10',
                thumbnail: 'info',

            },
            {
                key: '3',
                name: 'And Another one',
                price: '$10',
                thumbnail: 'info',
            },
            {
                key: '4',
                name: 'And Another one',
                price: '$10',
                thumbnail: 'info',
            },
            {
                key: '5',
                name: 'And Another one',
                price: '$10',
                thumbnail: 'info',
            },
            {
                key: '6',
                name: 'And Another one',
                price: '$10',
                thumbnail: 'info',
            },
        ]

        const buttons = ['Active', 'Past']
        const { selectedIndex } = this.state
    
        return (
            <View style={styles.container}>
                <Header backgroundColor={colorCodes.mintCustom}
                    centerComponent={{ 
                        text: global.user._user.displayName, 
                        style: { 
                            color: '#000',
                            marginRight: 0,
                        } 
                    }}
                    rightComponent={
                        <Button 
                            onPress={this.signOut.bind(this)}
                            title='Logout'
                            style={{
                                marginLeft: 0,
                            }}
                        />
                    }
                    
                />

                <Divider style={{ backgroundColor: colorCodes.lightGreyCustom, height: 12 }} />

                <View style={styles.userInfo}>
                    <Avatar 
                        containerStyle={styles.profileImage}
                        size='xlarge'
                        rounded
                        source={{uri: global.user._user.photoURL}}
                    />
                    <View style={styles.userRating}>
                        <Text h5>Renter Rating:</Text>
                        <Rating
                            imageSize={25}
                            readonly
                        />
                    </View>
                    <View style={styles.userRating}>
                        <Text h5>Owner Rating:</Text>
                        <Rating
                            imageSize={25}
                            readonly
                        />
                    </View>

                    {/*<Text h3>{global.user._user.displayName}</Text>*/}
                </View>

                <Divider style={{ backgroundColor: colorCodes.lightGreyCustom, height: 12 }} />

                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    selectedTextStyle={{
                        fontWeight: 'bold',
                        color: 'black',
                    }}
                    selectedButtonStyle={{
                        backgroundColor: '#f9f9f9',
                    }}
                    buttons={buttons}
                    containerStyle={{height: 35}}
                />

                <Divider style={{ backgroundColor: colorCodes.lightGreyCustom, height: 12 }} />

                <FlatList
                    data={userListingData}
                    renderItem={({item}) => (
                        <ListItem
                            roundAvatar
                            title={item.name}
                            subtitle={item.price}
                            leftIcon={{ 
                                name: item.thumbnail
                            }}
                        />
                    )}
                    ItemSeparatorComponent={this.renderSeparator}
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
  flickHeader: {
    height: 60
  },
  userInfo: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
  },
  userRating: {
    flexDirection: 'row',
  },
  profileImage: {
    marginBottom: 12,
  },
});