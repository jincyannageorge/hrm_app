import React from 'react';
import { useState } from 'react';
import { Text, View, Image, ScrollView, StyleSheet } from "react-native";

function DocumentScreen({ docData, immigrationData }) {
    return (
        ((docData.length || immigrationData.length) ? (
            <View>
                <ScrollView contentContainerStyle={styles.body}>
                    {docData.map((item, index) => (
                        (['jpg', 'jpeg', 'png'].includes(item.file_type) ?
                            (<View key={index} style={styles.imageContainer}>
                                <Image style={styles.image} source={{ uri: item.fileUrl }} />
                            </View>) : (item.file_type === "pdf" ?
                                (<View key={index} style={styles.imageContainer}>
                                    <Image style={styles.image} source={require('../assets/dummies/pdf_file_icon.png')} />
                                </View>) : (['doc', 'docx'].includes(item.file_type) ?
                                    (<View key={index} style={styles.imageContainer}>
                                        <Image style={styles.image} source={require('../assets/dummies/pdf_file_icon.png')} />
                                    </View>) : null)))
                    ))}
                    {immigrationData.map((i_item, i_index) => (
                        (['jpg', 'jpeg', 'png'].includes(i_item.file_type) ?
                            (<View key={i_index} style={styles.imageContainer}>
                                <Image style={styles.image} source={{ uri: i_item.fileUrl }} />
                            </View>) : (i_item.file_type === "pdf" ?
                                (<View key={i_index} style={styles.imageContainer}>
                                    <Image style={styles.image} source={require('../assets/dummies/pdf_file_icon.png')} />
                                </View>) : (['doc', 'docx'].includes(i_item.file_type) ?
                                    (<View key={i_index} style={styles.imageContainer}>
                                        <Image style={styles.image} source={require('../assets/dummies/pdf_file_icon.png')} />
                                    </View>) : null)))
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
        width: '36%',
        padding: 5,
    },
    image: {
        width: '100%',
        height: 120,
    },
});