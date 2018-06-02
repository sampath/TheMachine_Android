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
            listingData: []
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

    getListingData() {
        fetch('https://flick-staging.herokuapp.com/listings', {
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
                listingData: dataArray
            });
        })
        .done();
    }

    // componentDidMount() {
    //     this.getAllListings();
    // }

    render() {

        let listingInfo = this.props.navigation.state.params.listingInfo;
        console.log(listingInfo);

        return (
            <View style={styles.container}>
                <Header backgroundColor={colorCodes.mintCustom}
                    centerComponent={{ 
                        text: listingInfo.itemName, 
                        style: { 
                            color: '#000'
                        } 
                    }}
                />

                <Text>Price: {listingInfo.price}</Text>
                <Text>Description: {listingInfo.description}</Text>
                <Text>Rating: {listingInfo.avgRating}</Text>
                <Text>Tags: {listingInfo.tags}</Text>
                
            </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    width: '20%',
  }
});