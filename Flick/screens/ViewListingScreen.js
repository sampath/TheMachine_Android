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

    render() {
        var interestedComponent;
        // if (user.Id === listingInfo.ownerId) {
        if (false) {
            interestedComponent = <InterestedList />;
        } else {
            console.log("InterestedButton");
            interestedComponent = <InterestedButton />;
        }

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

                {interestedComponent}
                
            </View>
        );
  }
}

class InterestedList extends React.Component {
    componentDidMount() {
        this.getInterestedUsers();
    }

    render() {
        return (
            <Text>This is empty</Text>
        );
    }
}

class InterestedButton extends React.Component {

    newTransaction(userId, ownerId, listingId) {

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
  searchBar: {
    width: '20%',
  }
});