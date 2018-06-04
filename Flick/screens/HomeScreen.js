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
            refreshing: true
        });
        getAllListings();
    }

    // Uses GET request to query all listing data
    getAllListings() {
        fetch('https://flick-staging.herokuapp.com/listings/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((response) => {
            let dataObj = response

            let dataArray = Object.keys(dataObj).map(key => {
                let obj = dataObj[key];
                obj.key = key;
                return obj;
            });


            this.setState({
                listingData: dataArray,
                refreshing: false,
            });

            console.log(this.state.listingData);
        })
        .done();
    }

    // After component renders, get the listing data for the list
    componentDidMount() {
        this.getAllListings();
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
                            leftAvatar={{ source: {uri: item.pictureURL ? item.pictureURL : "https://storage.googleapis.com/flick-b0e2c.appspot.com/C%3A%5CUsers%5Cdell%5CDesktop%5CCSE110%5CTheMachine%5CBackend%5Cjs%2FTest.jpg?GoogleAccessId=firebase-adminsdk-t5plx@flick-b0e2c.iam.gserviceaccount.com&Expires=1742194800&Signature=UqhUyvHQM%2B8MDD1aKdu2zSBMayWq1Qyb5TT1sMxebduYTVtln81s%2F6H0pqGBRKF4q%2BKgVSuj3KSErSgloqk4%2B7Z37yVdXY58FXtvMl54WDl5kbkzp867V6%2FnL%2B4SVJcwknTBVLRww7nfKf92A8fMn97U9oiRJQU3O41IOg08r3VWEDsVOjVB9hi%2F08fW7dzq8ceonbsci%2FB4%2BUfm2K5hkXrJ9BdW%2F%2BQ9SHjf8AQdoBHYd709apHjDxjokts8V2Rt1f4P40C3RFw2SHVKFH9kCkwNCXXSJWk2L%2BulXScmqGDECOQkl2KrmHFowE7eRNIYGc%2FwBMMleApeGn88F6ujeg%3D%3D"} }}
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