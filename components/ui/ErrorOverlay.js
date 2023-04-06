import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

function ErrorOverlay() {
    return (
        <View style={styles.rootContainer}>
            <Image style={styles.image} source={require('../../assets/dummies/error.png')} />
            <Text>An error occurred!</Text>
        </View>
    );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    image: {
        width: 100,
        height: 100
    }
});
