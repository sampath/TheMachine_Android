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
            refreshing: false,
        };
    }

    handleRefresh() {
        this.getAllAlerts();
    }

    componentDidMount() {
        this.getAllAlerts();
    }

    // Methods
    getAllAlerts() {
        let url = 'https://flick-prod.herokuapp.com/alerts/' + global.user._user.uid;
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

    fetchListingId(transactionId) {
        //var url = 'https://flick-staging.herokuapp.com/transactions/' + '-LE9yTogvdL_AqXo-FNA';
        var url = 'https://flick-prod.herokuapp.com/transactions/' + transactionId;
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
            var url = 'https://flick-prod.herokuapp.com/listings/' + listingID;
            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
        })
  
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
                outerContainerStyles={styles.flickHeader}
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
                            var transactionId = item.transactionID;
                            const listingidPromise = this.fetchListingId(transactionId);
                            
                            listingidPromise.then((listingid) => {
                                this.props.navigation.navigate( 
                                    'ViewListing',
                                    {listingID: listingid}
                                );
                            })
                            .done();
                        }}
                    />
                )}
                ItemSeparatorComponent={this.renderSeparator}
                refreshing={this.state.refreshing}
                onRefresh={() => this.handleRefresh}
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
    flickHeader: {
        height: 60
    },
});