import React from 'react';
import { Text, View, Image, StyleSheet, FlatList, Pressable, SafeAreaView, Platform, PermissionsAndroid } from "react-native";
import IconButton from '../components/ui/IconButton';
// import RNFetchBlob from "rn-fetch-blob";

function DocumentScreen({ docData, immigrationData }) {
    const mergedArray = docData.concat(immigrationData);
    // console.log(mergedArray);
    function viewDoc(fileUrl, file_url) {

        // downloadFile(fileUrl, file_url);
        // if (Platform.OS === "ios") {
        //     downloadFile(fileUrl);
        // } else {
        //     downloadFile(fileUrl);
        // const granted = PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        //     {
        //         title: 'Storage Permission Required',
        //         message:
        //             'Application needs access to your storage to download File',
        //     }
        // );
        // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //     // Start downloading
        //     // downloadFile();
        //     console.log('Storage Permission Granted.');
        // } else {
        //     // If permission denied then show alert
        //     console.log('Storage Permission Not Granted');
        // }
        // }
    }

    const downloadFile = (fileUrl, file_url) => {
        try {
            // let dirs = RNFetchBlob.fs;
            // console.log(dirs);
            // RNFetchBlob.fs.dirs.DocumentDir
            // // Download file with RNFetchBlob
            // const response = RNFetchBlob.config({
            //     fileCache: true,
            //     path: `${Platform.OS === 'ios' ? '' : RNFetchBlob.fs.dirs.DownloadDir + '/'}${fileUrl}`,
            // }).fetch('GET', url);

            // // Save file to filesystem with react-native-fs
            // const fileUri = response.path();
            // const fileData = response.base64();
            // writeFile(fileUri, fileData, 'base64');

            // return fileUri;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        ((mergedArray.length) ? (
            <SafeAreaView style={styles.body}>
                <FlatList data={mergedArray} renderItem={({ item }) =>
                    <View>
                        <Pressable android_ripple={{ color: '#ccc' }} onPress={() => viewDoc(item.fileUrl, item.file_url)}>
                            <Text>
                                <View style={styles.singleItem}>
                                    <IconButton style={styles.imageIcon} icon="ios-document-outline" color="#000" size={20} />
                                    <Text>{item.hasOwnProperty('document_master_name') ? item.document_master_name : item.doc_title}</Text>
                                </View>
                            </Text>
                        </Pressable>
                    </View>
                }
                />
            </SafeAreaView>
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
        padding: 2,
    },
    imageIcon: {
        margin: 15
    },
    singleItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});