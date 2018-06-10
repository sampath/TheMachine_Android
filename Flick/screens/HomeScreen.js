import React from 'react';
import {
    Image,
    Platform,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { 
    Header,
    Icon,
    Button, 
    SearchBar,
    List,
    ListItem,
} from 'react-native-elements';
import ActionButton from 'react-native-action-button';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            listingData: [],
            refreshing: false,
            searchText: ''
        };

        this.handleRefresh = this.handleRefresh.bind(this)
    }

    render() {
        return (
            <View style={styles.container}>
                <Header backgroundColor={colorCodes.mintCustom}
                    outerContainerStyles={styles.flickHeader}>
                    <Icon name='filter-list'/>
                    <SearchBar style={styles.searchBar}
                        platform='android'
                        placeholder='Type Here...' 
                        onChangeText={(text) => {
                            if (text == '') {
                                this.setState({searchText: ''});
                            } else {
                                this.setState({searchText: 'keyword/' + text});
                            }    
                        }}
                        onSubmitEditing={(event) => {
                            console.log("keyword is: " + this.state.searchText);
                            this.handleRefresh();
                        }}
                        containerStyle={{
                            backgroundColor: colorCodes.mintCustom,
                            width: '92%'
                        }}
                        inputContainerStyle={{
                            backgroundColor: '#d0e8dd',
                        }}
                    />
                </Header>

                <FlatList
                    data={this.state.listingData}
                    renderItem={({item}) => (
                        <ListItem
                            // roundAvatar
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
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />
                
                <ActionButton 
                    buttonColor={colorCodes.mintCustom}
                    onPress={() => this.props.navigation.navigate('PostListing')}
                    buttonTextStyle={{
                        color: 'black',
                    }}
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
        );
    };

    handleRefresh() {
        this.getAllListings();
    }

    // Uses GET request to query all listing data
    getAllListings() {
        fetch('https://flick-prod.herokuapp.com/listings/' + this.state.searchText, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((response) => {
            let dataObj = response

            // Only handle data if there are any listings
            if (dataObj) {
                // Assign listingIDs as keys for obects
                let dataArray = Object.keys(dataObj).map(key => {
                    let obj = dataObj[key];
                    obj.key = key;
                    return obj;
                });

                this.setState({
                    listingData: dataArray,
                    refreshing: false,
                });
            }

            console.log(this.state.listingData);
        })
        .done();
    }

    // After component renders, get the listing data for the list
    componentDidMount() {
        this.getAllListings();
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
  searchBar: {
    width: '20%',
  }
});