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

    handleRefresh() {
        this.setState({
            refreshing: true,
        });
        getAllListings();
    }

    // Uses GET request to query all listing data
    getAllListings() {
        fetch('https://flick-prod.herokuapp.com/listings/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            let dataObj = responseData

            let dataArray = Object.keys(dataObj).map(key => {
                let obj = dataObj[key];
                obj.key = key;
                return obj;
            });


            this.setState({
                listingData: dataArray,
                refreshing: false,
            });

            // console.log(this.state.listingData);
        })
        .done();
    }

    // After component renders, get the listing data for the list
    componentDidMount() {
        this.getAllListings();
    }

    render() {

        console.log(global.user);

        return (
            <View style={styles.container}>
                <Header backgroundColor={colorCodes.mintCustom}
                    outerContainerStyles={styles.flickHeader}>
                    <Icon name='filter-list'/>
                    <SearchBar style={styles.searchBar}
                        platform='android'
                        placeholder='Type Here...' 
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
                            roundAvatar
                            title={item.itemName}
                            subtitle={item.price}
                            leftAvatar={{ source: {uri: item.pictureURL} }}
                            onPress={() => this.props.navigation.navigate(
                                'ViewListing', 
                                {listingInfo: item}
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