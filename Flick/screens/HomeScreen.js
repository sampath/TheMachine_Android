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

    getAllListings() {
        fetch('http://128.54.196.210:3000/listings/', {
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

            console.log(dataArray);

            this.setState({
                listingData: dataArray
            });
        })
        .done();
    }

    componentDidMount() {
        this.getAllListings();
        // console.log(this.state.listingData);
    }

    render() {

        const listingData = [
            'hello': {   
                key: '1',
                itemName: 'JBL Speaker',
                price: '$10',
                thumbnail: 'info',
            },
            'what': {
                key: '2',
                itemName: 'Another Speaker',
                price: '$10',
                thumbnail: 'info',

            },
            'what2': {
                key: '1',
                itemName: 'And Another one',
                price: '$10',
                thumbnail: 'info',
            },
        ]

        return (
            <View style={styles.container}>
                <Header backgroundColor={colorCodes.mintCustom}>
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
                            avatar={{uri: item.pictureURL}}
                        />
                    )}
                    ItemSeparatorComponent={this.renderSeparator}
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
  searchBar: {
    width: '20%',
  }
});