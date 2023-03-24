import React from 'react';
import { useState } from 'react';
import { Text, View, Image, ScrollView, StyleSheet } from "react-native";

function DocumentScreen({ userData }) {
    console.log(userData);
    const [images, setImages] = useState([
        'https://www.bootdey.com/image/280x280/FF00FF/000000',
        'https://www.bootdey.com/image/280x280/00FFFF/000000',
        'https://www.bootdey.com/image/280x280/FF7F50/000000',
        'https://www.bootdey.com/image/280x280/6495ED/000000',
        'https://www.bootdey.com/image/280x280/DC143C/000000',
        'https://www.bootdey.com/image/280x280/008B8B/000000',
    ]);
    return (
        (userData ? (
            <View>
                <ScrollView contentContainerStyle={styles.body}>
                    {images.map((image, index) => (
                        <View key={index} style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: image }} />
                        </View>
                    ))}
                </ScrollView>
            </View>
        ) : (
            <View><Text>Data not  found</Text></View>
        ))
    );
}

export default DocumentScreen;

const styles = StyleSheet.create({
    body: {
        alignItems: 'center',
        padding: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    imageContainer: {
        width: '33%',
        padding: 5,
    },
    image: {
        width: '100%',
        height: 120,
    },
});