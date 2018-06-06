import React from 'react';
import { View } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';

export default class ListSeparator extends React.Component {
    render() {
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
    }
};