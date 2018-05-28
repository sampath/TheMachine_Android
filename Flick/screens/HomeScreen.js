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

    render() {

        const listingData = [
            {   
                key: '1',
                name: 'JBL Speaker',
                price: '$10',
                thumbnail: 'info',
            },
            {
                key: '2',
                name: 'Another Speaker',
                price: '$10',
                thumbnail: 'info',

            },
            {
                key: '1',
                name: 'And Another one',
                price: '$10',
                thumbnail: 'info',
            },
            {
                key: '1',
                name: 'And Another one',
                price: '$10',
                thumbnail: 'info',
            },
            {
                key: '1',
                name: 'And Another one',
                price: '$10',
                thumbnail: 'info',
            },
            {
                key: '1',
                name: 'And Another one',
                price: '$10',
                thumbnail: 'info',
            },
            {
                key: '1',
                name: 'And Another one',
                price: '$10',
                thumbnail: 'info',
            },
            {
                key: '1',
                name: 'And Another one',
                price: '$10',
                thumbnail: 'info',
            },
            {
                key: '1',
                name: 'And Another one',
                price: '$10',
                thumbnail: 'info',
            },
            {
                key: '1',
                name: 'And Another one',
                price: '$10',
                thumbnail: 'info',
            },
            {
                key: '1',
                name: 'And Another one',
                price: '$10',
                thumbnail: 'info',
            },
            {
                key: '1',
                name: 'And Another one',
                price: '$10',
                thumbnail: 'info',
            },
            {
                key: '1',
                name: 'And Another one',
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
                    data={listingData}
                    renderItem={({item}) => (
                        <ListItem
                            roundAvatar
                            title={item.name}
                            subtitle={item.price}
                            leftIcon={{ 
                                name: item.thumbnail
                            }}
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