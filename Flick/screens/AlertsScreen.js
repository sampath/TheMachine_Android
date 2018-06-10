import React from 'react';

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

export default class AlertsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alertData: [],
        };
    }

    componentDidMount() {
        this.getAllAlerts();
    }

    // Methods
    getAllAlerts() {
        let url = 'https://flick-staging.herokuapp.com/alerts/' + global.user._user.uid;
        //console.log(global.user);
        
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((response) => {
            let dataObj = response;
            //console.log(dataObj);
            if( dataObj ) {
                let dataArray = Object.keys(dataObj).map(key => {
                    let obj = dataObj[key];
                    obj.key = key;
                    return obj;
                });

                this.setState({
                    alertData: dataArray,
                });
            }

        })
        .done();
        
    }

    /*
    getSingleTransaction(transactionID, callback) {
        var url = 'https://flick-staging.herokuapp.com/transactions/' + '-LE9yTogvdL_AqXo-FNA';
        console.log(url);
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((response)=> {
            let transactionData = response;
            //console.log('transaction data:');
            //console.log(transactionData);
            callback(transactionData);
        })
        .done();
    }

    getListingPage(listingID) {
        fetch('https://flick-prod.herokuapp.com/listings/' + "-LEAqUJpYD4OQ_7_jJrV", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((response) => {
            this.props.navigation.navigate( 
                'ViewListing',
                {listingInfo: response}
            );
        })
        .done();
    }
    */
   
    /*
    async fetchListingId(transactionId) {
        var url = 'https://flick-staging.herokuapp.com/transactions/' + '-LE9yTogvdL_AqXo-FNA';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();
        return data.listingID;
    }
    */

    fetchListingId(transactionId) {
        //var url = 'https://flick-staging.herokuapp.com/transactions/' + '-LE9yTogvdL_AqXo-FNA';
        var url = 'https://flick-staging.herokuapp.com/transactions/' + transactionId;
        return fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json() )
        .then(data => data.listingID);
    }

    fetchListing(promiseWithId) {
        return promiseWithId.then((listingID) => {
            //var url = 'https://flick-staging.herokuapp.com/listings/' + '-LEAqUJpYD4OQ_7_jJrV';
            var url = 'https://flick-staging.herokuapp.com/listings/' + listingID;
            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            //.then(data => data)
        })
            //.then(listing => {
            //    console.log(listing);
            //    this.setState({listing:listing});
            //}); 
    }


    // Render
    renderSeparator() {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft:"14%"
                }}
            />
        );
    };


    render() {
        return(
            <View style={styles.container}>
            <Header backgroundColor={colorCodes.mintCustom}
                centerComponent={{
                    text: 'Alerts',
                    style: {
                        color: '#000',
                        marginRight: 0
                    }
                }}
            />

            <FlatList
                data={this.state.alertData}
                renderItem={({item}) => (
                    <ListItem
                        roundAvatar
                        title={item.content}
                        onPress={() => {

                            // tart with transaction id
                            var transactionId = item.transactionId;
                            const listingidPromise = this.fetchListingId(transactionId);
                            //console.log(listingidPromise);
                            const listingPromise = this.fetchListing(listingidPromise);
                            //console.log(listingPromise);
                            listingPromise.then((listingData) => {
                                //console.log(listingData);
                                this.props.navigation.navigate( 
                                    'ViewListing',
                                    {listingInfo: listingData}
                                );
                            });
                            
                        }}
                    />
                )}
                ItemSeparatorComponent={this.renderSeparator}
            />

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});