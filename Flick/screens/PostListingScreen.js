import React from 'react';
import { 
    Image, 
    Platform, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View, 
} from 'react-native';
import { 
    Header,
    Button, 
    FormLabel, 
    FormInput, 
    FormValidationMessage, 
    Input ,
} from 'react-native-elements'
export default class PostListingScreen extends React.Component {



    constructor(props){
        super(props);
        this.state = {name: 'empty', price: '', descr: '', tags: ''}
    }

    handleClick(){
        var data = {
            'itemName': this.state.name,
            'tags': this.state.tags,
            'price': this.state.price,
            'description': this.state.descr,
            'endTime': '?'
        };
        var formBody = [];
        for( var property in data){
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('https://flick-prod.herokuapp.com/test/listings/', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
        .done()

    }

    render() {
    
        return (
            <View style={styles.container}>
            
                <Header backgroundColor={colorCodes.mintCustom}
                    outerContainerStyles={styles.flickHeader}
                    centerComponent={{ 
                        text:'New Listing', 
                        style: { 
                            color: '#000'
                        } 
                    }}
                />

                <View style={styles.bodyStyle}>

                    <Input 
                        containerStyle={styles.textInput}
                        placeholder='Item Name'
                        onChangeText = {(name) => this.setState({name})}
                    />

                    <Input
                        containerStyle={styles.textInput} 
                        placeholder='Price'
                        onChangeText = {(price) => this.setState({price})}
                    />

                    <Input
                        containerStyle={styles.textInput} 
                        placeholder='Description'
                        onChangeText = {(descr) => this.setState({descr})}
                    />

                    <Input
                        containerStyle={styles.textInput} 
                        placeholder='Tags'
                        onChangeText = {(tags) => this.setState({tags})}
                    />

                    <Text style={{padding: 10, fontSize: 42}}>
                        {this.state.name}
                    </Text>

                    <View style={styles.postButton}>
                        <Button 
                            title='Post'
                            titleStyle={{
                                color:'black',
                            }}
                            onPress={() => this.handleClick()}
                            buttonStyle={{
                                backgroundColor: colorCodes.mintCustom,
                                width: 370,
                            }}
                        />
                    </View>
                </View>
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
  bodyStyle: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25
  },
  textInputView: {
    alignItems: 'center',
    marginTop: 15,
  },
  textInput: {
    marginBottom: 15,
    backgroundColor: colorCodes.lightGreyCustom,
    borderBottomWidth: 0,
  },
  postButton: {
    position: 'absolute',
    bottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});