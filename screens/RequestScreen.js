import React, { Component } from 'react';
import { FlatList, SafeAreaView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { BASE_URL, ERROR_MSG } from '../constants/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import { Ionicons } from '@expo/vector-icons';

class RequestScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            requestData: [],
            isLoading: true,
            isError: false,
            nexPageUrl: null,
        };

    }

    componentDidMount() {
        this.fetchToken();
    }

    async loadMoreData() {
    }

    async fetchToken() {
        try {
            var userToken = await AsyncStorage.getItem('logged_user_token');
            userToken = JSON.parse(userToken);
            this.setState({ token: userToken });

            const response = await fetch(`${BASE_URL}requests`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.state.token}`,
                    'token': this.state.token
                }
            });
            const output = await response.json();
            if (output.status === "success") {
                this.setState({ requestData: output.data.data });
                this.setState({ isLoading: false });
                this.setState({ nexPageUrl: output.next_page_url });
                // console.log(output.data);
            } else {
                this.setState({ isError: true });
                Toast.show(ERROR_MSG, Toast.LONG);
            }

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { requestData, isLoading, isError, nexPageUrl } = this.state;
        console.log(requestData);
        if (isLoading) {
            <LoadingOverlay />
        } else if (isError) {
            <ErrorOverlay />
        } else {
            return (
                // <SafeAreaView>
                <View style={styles.container}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={requestData}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => (
                            <View style={styles.listItem}>
                                <View style={styles.singleList}>
                                    <Text style={styles.listTitle}>{item.leave_type_name}</Text>
                                    <Text>{item.leave_from}</Text>
                                </View>
                                <TouchableOpacity style={styles.actions}>
                                    <Ionicons name="ios-pencil" color="#31b680" size={12} />
                                    <Ionicons name="trash" color="#ff0000" size={15} />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
                // </SafeAreaView>
            )
        }
    }
}

export default RequestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    listItem: {
        margin: 10,
        padding: 10,
        backgroundColor: "#FFF",
        width: "90%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 10
    },
    singleList: {
        flex: 1
    },
    listTitle: {
        fontWeight: "bold",
        fontSize: 18,
    },
    actions: {
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center"
    }
});