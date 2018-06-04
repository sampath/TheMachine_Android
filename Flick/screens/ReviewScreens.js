import React from 'react';
import {
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    Button,
    Header,
    Rating,
    Icon,
    Overlay
} from 'react-native-elements';
 
import Modal from 'react-native-modal'; // 2.4.0
 
 
const width = Dimensions.get('window').width;
const halfWidth = width / 2;
 
export default class ReviewScreen extends React.Component {
 
    state = {
        visibleModal: null,
    };
   
    ratingCompleted(rating) {
      console.log("Rating is: " + rating)
    }
 
   
    _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.button}>
            <Text>{text}</Text>
          </View>
        </TouchableOpacity>
      );
   
    _renderModalContent = () => (
        <View style={styles.modalContent}>
            <Rating
              showRating
              type="star"
              fractions={1}
              startingValue={3.6}
              imageSize={40}
              onFinishRating={this.ratingCompleted}
              style={{ paddingVertical: 10 }}
            />
            {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
        </View>
    );
 
    render() {
        return (
            <View style={styles.container}>
                <Modal isVisible={this.state.visibleModal === 1}>
                  {this._renderModalContent()}
                </Modal>      
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
  standalone: {
    marginBottom: 75,
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 20
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50,
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backTextWhite: {
    color: '#FFF',
  },
  sliderText: {
    width: halfWidth,
    height: 50,
    justifyContent: 'center'
  },
  title: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '300',
    padding: 25
  }
});