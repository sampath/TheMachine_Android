import React from 'react';
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
    Icon,
    Divider,
    Avatar,
    Rating,
    Text,
    ButtonGroup,
    ListItem,
} from 'react-native-elements'

export default class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            listingData: [],
            selectedIndex: 0,
        }
        this.updateIndex = this.updateIndex.bind(this);
    }

    render() {
        const buttons = ['Active', 'Past']
        const { selectedIndex } = this.state

        console.log("Profile", global.userData);
    
        return (
            <View style={styles.container}>
                <Header outerContainerStyles={styles.flickHeader}
                    backgroundColor={colorCodes.mintCustom}
                    centerComponent={{ 
                        text: global.userData.name, 
                        style: { 
                            color: '#000',
                            marginRight: 0,
                        } 
                    }}
                    rightComponent={
                        <Icon type='material-community' name='logout'
                            onPress={this.onSignOut.bind(this)}
                        />
                    }
                />

                <Divider style={{ backgroundColor: colorCodes.lightGreyCustom, height: 12 }} />

                <View style={styles.userInfo}>
                    <Avatar 
                        containerStyle={styles.profileImage}
                        size='xlarge'
                        rounded
                        source={{uri: global.user.photoURL}}
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
                </View>


                <Divider style={{ backgroundColor: colorCodes.lightGreyCustom, height: 12 }} />

                <FlatList
                    data={this.state.listingData}
                    renderItem={({item}) => (
                        <ListItem
                            roundAvatar
                            title={item.itemName}
                            subtitle={item.price}
                            leftAvatar={{ source: {uri: item.pictureURL} }}
                            onPress={() => this.props.navigation.navigate(
                                'ViewListing', 
                                {listingID: item.key}
                            )}

                        />
                    )}
                    ItemSeparatorComponent={this.renderSeparator}
                />

            </View>
        );
    }

    // A simple separator to separate listings in the view
    renderSeparator() {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        )
    };


    componentDidMount() {
        this.getUserListings();
    }

    // Uses GET request to query all listing data
    getUserListings() {
        console.log(global.user.uid);
        fetch('https://flick-prod.herokuapp.com/listings/user/' + global.user._user.uid + '/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);

            let dataObj = response

            if (dataObj) {
                let dataArray = Object.keys(dataObj).map(key => {
                    let obj = dataObj[key];
                    obj.key = key;
                    return obj;
                });

                this.setState({
                    listingData: dataArray,
                });
            }
        })
    }

    updateIndex(selectedIndex) {
        console.log(selectedIndex);
        this.setState({selectedIndex});

        this.getUserListings();
    }

    async onSignOut() {
        firebase.auth().signOut()
        .then(() => {
            global.user = null;
            global.userData = null;
            console.log("Logged out");
        })
        .catch((e) => {
            console.log(e);
        })
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