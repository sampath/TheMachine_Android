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
            modalVisible: false,
        };
    }

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

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        var interestedComponent;
        listingInfo = this.props.navigation.state.params.listingInfo;

        // if (user.Id === listingInfo.ownerId) {
        if (true) {
            interestedComponent = <InterestedList />;
        } else {
            interestedComponent = <InterestedButton />;
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

    getInterestedUsers() {
        fetch('https://flick-prod.herokuapp.com/transactions/?listingID=' + listingInfo.key + '&closed=false', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            let dataObj = responseData

            // Only handle data if there are any interested users
            if (dataObj) {
                let transactionData = Object.keys(dataObj).map(key => {
                    let obj = dataObj[key];
                    obj.key = key;
                    return obj;
                });

                // console.log(transactionData);

                var users = [];
                var numTransactions = transactionData.length;
                var renterIDs = new Array(numTransactions);

                // For each relevant transaction, get the user info associated to it
                for (var i = 0; i < numTransactions; i++) {
                    const index = i;
                    var renterID = transactionData[index].renterID;
                    fetch('https://flick-prod.herokuapp.com/users/' + transactionData[index].renterID, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                    })
                    .then((response) => response.json())
                    .then((responseData) => {
                        responseData.key = transactionData[index].renterID;
                        users.push(responseData);
                    })
                    .done();
                }
            }

            // Assign the found users to the interestedUsers state, which will generate the list
            this.setState({
                interestedUsers: users
            });
          
            // console.log(this.state.interestedUsers);

        })
        .done();
    }

    componentDidMount() {
        this.getInterestedUsers();
    }

    render() {

        // console.log(this.state.interestedUsers);

        return (
            <FlatList
                data={this.state.interestedUsers}
                renderItem={({item}) => (
                    <ListItem
                        roundAvatar
                        title={'Name: ' + item.name}
                        subtitle={'Email: ' + item.email}
                        // leftAvatar={{ source: {uri: user.pictureURL} }}
                        // onPress={() => this.props.navigation.navigate(
                        //     'ViewListing', 
                        //     {listingInfo: user}
                        // )}
                    />
                )}
                ItemSeparatorComponent={this.renderSeparator}
            />
        );
    }
}

class InterestedButton extends React.Component {

    newTransaction(userId, ownerId, listingId) {
        console.log("help me");
    }

    render() {
        return (
            <ActionButton 
                buttonColor={colorCodes.mintCustom}
                onPress={this.newTransaction}
                buttonTextStyle={{
                    color: 'black',
                }}
                renderIcon={() => <Icon type='ionicon' name='md-heart'/>}
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