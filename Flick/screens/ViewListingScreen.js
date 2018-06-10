import React from 'react';
import {
    Image,
    Platform,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Modal,
    Alert,
} from 'react-native';
import { 
    Header,
    Text,
    Icon,
    Rating,
    Button, 
    List,
    ListItem,
    Overlay,
} from 'react-native-elements';
import ActionButton from 'react-native-action-button';

var listingInfo;

export default class ViewListingScreen extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            listingData: [],
            isInterested: false,
        };
    }

    checkIfInterested() {
        // fetch('http://flick-prod.herokuapp.com/transactions/?check=true&listingID='+ listingInfo.listingID +'&renterID='+ global.user._user.uid +'&closed=false', {
        //     method: 'GET',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        // })
        // .then((response) => response.json())
        // .then((response) => {

        //     console.log(response);
        //     this.setState({
        //         isInterested: response
        //     });

        //     // console.log(this.state.listingData);
        // })
        // .done();
        this.setState({
            isInterested: false
        });
    }

    componentDidMount() {
        this.checkIfInterested();
    }

    deleteListing(){
        fetch('https://flick-prod.herokuapp.com/listings/'+listingInfo.key, {
            method: 'delete',
        })
        .done()
        this.props.navigation.goBack(null);
    }

    render() {
        var interestedComponent;
        listingInfo = this.props.navigation.state.params.listingInfo;

        if (global.user.uid === listingInfo.ownerID) {
            interestedComponent = <InterestedList />;
            DeleteButton = <Icon 
                                type='ionicon' 
                                name='md-trash' 
                                color='#000'
                                onPress={() => this.deleteListing()}/>
 
        } else if (!this.state.isInterested) {
            interestedComponent = <InterestedButton />;
            DeleteButton=<Text></Text>;
            EditButton= <Text></Text>;
        }


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
                        text: listingInfo.itemName, 
                        style: { 
                            color: '#000',
                            fontSize: 20,
                        } 
                    }}
                    rightComponent={DeleteButton}
                />

                <View style={styles.listingBody}>

                    <View style={styles.listingPic}>
                        <Image
                            style={{
                                width: 175,
                                height: 175,
                                borderRadius: 87.5,
                                borderWidth: 7,
                                borderColor: "lightgrey",
                            }}
                            source={{uri: listingInfo.pictureURL}}
                        />
                    </View>

                    <View style={styles.postInfo}>
                        <Text h4 style={styles.titles}>
                            Price:
                        </Text>

                        <Text h2 style={[styles.marginBottom, {fontSize: 40, color: "black"}]}>
                            ${listingInfo.price}/day
                        </Text>

                        <View style={styles.inline}>
                            <Text h4 style={[styles.titles, styles.marginBottom]}>
                                Rating:
                            </Text>
                            <Rating
                                style={{
                                    paddingTop: 10,
                                    paddingLeft: 10,
                                }}
                                fractions={1}
                                imageSize={25}
                                startingValue={listingInfo.avgRating}
                                readonly
                            />
                        </View>

                        <Text h4 style={styles.titles}>
                            Description: 
                        </Text>
                        <Text h5 style={[styles.subText, styles.marginBottom]}>
                            {listingInfo.description}
                        </Text>

                        <Text h4 style={styles.titles}>
                            Tags:
                        </Text>
                        <Text h5 style={[styles.subText,]}>
                            {listingInfo.tags}
                        </Text>
                    </View>
                </View>

                {interestedComponent}

            </View>
        );
  }
}

class InterestedList extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            transactions: '',
            interestedUsers: [],
        };
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
        );
    };

    getInterestedUsers() {
        fetch('https://flick-prod.herokuapp.com/transactions/?listingID=' + listingInfo.key + '&closed=false', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((response) => {

            let dataObj = response

            // Only handle data if there are any interested users
            if (dataObj) {
                // Assign transactionIDs as keys for items
                let transactionData = Object.keys(dataObj).map(key => {
                    let obj = dataObj[key];
                    obj.key = key;
                    return obj;
                });

                var users = [];
                var numTransactions = transactionData.length;

                // For each relevant transaction, get the user info associated to it
                for (var i = 0; i < numTransactions; i++) {
                    const index = i;
                    const renterID = transactionData[index].renterID;
                    fetch('https://flick-prod.herokuapp.com/users/' + renterID, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                    })
                    .then((response) => response.json())
                    .then((response) => {
                        response.key = renterID;
                        users.push(response);
                        
                        if (i >= numTransactions - 1) {
                            // Assign the found users to the interestedUsers state, which will generate the list
                            this.setState({
                                interestedUsers: users
                            });
                        }
                    })
                    .done();
                }
            }

          
        })
        .done();
    }

    componentDidMount() {
        this.getInterestedUsers();
    }

    render() {
        return (
            <FlatList
                data={this.state.interestedUsers}
                renderItem={({item}) => (
                    <ListItem
                        roundAvatar
                        title={'Name: ' + item.name}
                        subtitle={'Email: ' + item.email}
                        onPress={() => {

                            Alert.alert(
                                'Renter Confirmation',
                                'Have you given your item to ' + item.name + '?',
                                [
                                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                    {text: 'Confirm', onPress: () => {
                                        console.log('Renter Confirmed');
                                        var data = {
                                            renterID: item.key,
                                            listingID: listingInfo.key,
                                        };

                                        var formBody = [];
                                        for(var property in data){
                                            var encodedKey = encodeURIComponent(property);
                                            var encodedValue = encodeURIComponent(data[property]);
                                            formBody.push(encodedKey + "=" + encodedValue);
                                        }
                                        formBody = formBody.join("&");
                                        fetch('https://flick-prod.herokuapp.com/selectrenter/', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
                                            },
                                            body: formBody
                                        })
                                        .done()
                                    }},
                                ],
                                { cancelable: false }
                            )
                        }}
                    />
                )}
                ItemSeparatorComponent={this.renderSeparator}
            />
        );
    }
}

class InterestedButton extends React.Component {

    render() {
        return (
            <ActionButton 
                buttonColor={colorCodes.mintCustom}
                onPress={this.showInterest}
                buttonTextStyle={{
                    color: 'black',
                }}
                renderIcon={() => <Icon type='ionicon' name='md-heart'/>}
            />
        );
    }
    
    showInterest() {
        var transactionData = {
            listingID: listingInfo.key,
            ownerID: listingInfo.ownerID,
            renterID: global.user._user.uid,
            price: listingInfo.price,
        }
        var formBody = [];
        for (var property in transactionData) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(transactionData[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('https://flick-prod.herokuapp.com/renterinterested/', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
        .done()
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
  postInfo: {
    marginTop: 75,
    padding: 15,
  },
  listingText: {
    marginBottom: 20,
  },
  listingPic: {
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingRight: 25,
    marginTop: 25,

  },
  subText: {
    fontWeight: '300',
    fontSize: 20,
  },
  marginBottom: {
    marginBottom: 20,
  },
  inline: {
    flexDirection: 'row',
  },
  titles: {
    fontWeight: '100',
    fontSize: 30
  }

});