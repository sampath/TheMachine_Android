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

var listingID;
var listingInfo;
var isInterested;

export default class ViewListingScreen extends React.Component {
    constructor(props) {
        super(props);
    
        listingID = this.props.navigation.state.params.listingID;

        this.state = {
            listingID: this.props.navigation.state.params.listingID,
            listingInfo: {
                ownerID: '',
                pictureURL: '',
                avgRating: '',
                description: '',
                tags: '',
            },
            isInterested: false,
            loading: true,
        };
    }

    getListingData() {
        fetch('http://flick-prod.herokuapp.com/listings/'+ this.state.listingID, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((response) => {
            listingInfo = response;
            this.setState({
                listingInfo: response,
                loading: false,
            });
        })
        .done();
    }

    componentDidMount() {
        // this.checkIfInterested();
        this.getListingData();
    }

    deleteListing(){
        fetch('https://flick-prod.herokuapp.com/listings/'+listingInfo.key, {
            method: 'delete',
        })
        .done()
        this.props.navigation.goBack(null);
    }

    render() {

        const { listingInfo, listingID } = this.state;
        DeleteButton=<Text></Text>;
        EditButton= <Text></Text>;

        if (global.user.uid === listingInfo.ownerID) {
            // interestedComponent = <InterestedList />;
            DeleteButton = <Icon 
                                type='ionicon' 
                                name='md-trash' 
                                color='#000'
                                onPress={() => this.deleteListing()}
                            />
 
        }

        if (this.state.loading) {
            return null
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
                                readonly
                                style={{
                                    paddingTop: 10,
                                    paddingLeft: 10,
                                }}
                                fractions={1}
                                imageSize={25}
                                startingValue={parseInt(listingInfo.avgRating)}
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

                <InterestedComponent />

            </View>
        );
    }
}

class InterestedComponent extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            isInterested: false
        };

        this.parentState = this.parentState.bind(this)
    }

    render() {
        console.log("Rendering interestedComponent", isInterested)
        if (global.user.uid === listingInfo.ownerID) {
            return <InterestedList />;
        } else if (!isInterested) {
            return <InterestedButton updater={this.parentState}/>;
        } else {
            return <NotInterestedButton updater={this.parentState}/>;
        }
    }

    parentState(updateInterest) {
        this.setState({
            isInterested: updateInterest,
        })
    }


    componentDidMount() {
        this.setState({
            isInterested: isInterested
        })
        this.checkIfInterested();
    }

    checkIfInterested() {
        fetch('http://flick-prod.herokuapp.com/transactions/?check=true&listingID='+ listingID +'&renterID='+ global.user.uid +'&closed=false', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((response) => {
            isInterested = response;
            this.setState({
                isInterested: response
            });
        })
        .done();
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
        fetch('https://flick-prod.herokuapp.com/transactions/?listingID=' + listingID + '&closed=false', {
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
                                            listingID: this.props.listingInfo.key,
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

    constructor(props) {
        super(props);
    
        console.log(props);
    }

    showInterest(transactionIDpromise) {
        var transactionData = {
            listingID: listingID,
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

        // Add Alert
        // Get transaction id
        transactionIDpromise.then((transactionid) => {
            console.log("we here four");
            var alertBody = {
                content: 'A user is interested in ' + listingInfo.itemName,
                transactionID: transactionid,
                listingID: listingID,
            };

            var form = [];
            for (var property in alertBody) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(alertBody[property]);
                form.push(encodedKey + "=" + encodedValue);
            }
            form = form.join("&");

            fetch('https://flick-prod.herokuapp.com/alerts/' + listingInfo.ownerID, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                //need to post transaction id and listing id 
                body: form
            })
            .done()
        }).done();

        isInterested = true;
        this.props.updater(isInterested);

    }

    fetchTransactionID(url) {
        return fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
    }

    render() {
        return(
            <ActionButton 
                buttonColor={colorCodes.mintCustom}
                onPress={() => {
                    var url = 'https://flick-prod.herokuapp.com/transactions/transactionID/?listingID=' + listingID + "&renterID=" + global.user._user.uid + "&closed=false";
                    var transactionIDpromise = this.fetchTransactionID(url);
                    this.showInterest(transactionIDpromise)
                }}
                buttonTextStyle={{
                    color: 'black',
                }}
                renderIcon={() => <Icon type='ionicon' name='md-heart'/>}
            />
        );
    }
}

class NotInterestedButton extends React.Component {

    constructor(props) {
        super(props);
    
        console.log(props);
    }
    
    reverseInterest() {
        fetch('https://flick-prod.herokuapp.com/transactions/transactionID/?listingID=' + listingID + '&renterID=' + global.user.uid + '&closed=false', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((response) => {
            
            // Using the found transaction id, delete the transaction
            fetch('https://flick-prod.herokuapp.com/transactions/' + response, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((response) => {
                
                
            })
            .done();


        })
        .done();

        isInterested = false;
        this.props.updater(false);
    }

    render() {
        return (
            <ActionButton 
                buttonColor={colorCodes.mintCustom}
                onPress={() => {this.reverseInterest()}}
                buttonTextStyle={{
                    color: 'black',
                }}
                renderIcon={() => <Icon type='material-community' name='heart-off'/>}
            />
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