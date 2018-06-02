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
} from 'react-native-elements';
import ActionButton from 'react-native-action-button';

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
                    outerContainerStyles={styles.flickHeader}
                    centerComponent={{ 
                        text: listingInfo.itemName, 
                        style: { 
                            color: '#000'
                        } 
                    }}
                />

                <View style={styles.postInfo}>
                    <Text h4 style={styles.marginBottom}>
                        Price: ${listingInfo.price}/day
                    </Text>

                    <Text h4>
                        Description: 
                    </Text>
                    <Text h5 style={[styles.subText, styles.marginBottom]}>
                        {listingInfo.description}
                    </Text>

                    <View style={styles.inline}>
                        <Text h4 style={[styles.marginBottom, {marginRight: 13}]}>
                            Rating:
                        </Text>
                        <Rating
                            fractions={1}
                            imageSize={25}
                            startingValue={listingInfo.avgRating}
                            readonly
                        />
                    </View>


                    <Text h4>
                        Tags:
                    </Text>
                    <Text h5 style={[styles.subText, styles.marginBottom]}>
                        {listingInfo.tags}
                    </Text>


                </View>

                <Button onPress={() => this.setModalVisible(true)}/>

                {interestedComponent}
                
                <Modal
                    animationType="slide"
                    transparent={false}
                    presentationStyle='formSheet'
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                }}>
                    <View style={{marginTop: 22}}>
                        <View>
                            <Text>Hello World!</Text>

                            <TouchableHighlight
                                onPress={() => {
                                  this.setModalVisible(!this.state.modalVisible);
                            }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

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
  flickHeader: {
    height: 60,
  },
  postInfo: {
    padding: 15,
  },
  listingText: {
    marginBottom: 20,
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
  }

});