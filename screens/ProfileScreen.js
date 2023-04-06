import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, ERROR_MSG } from '../constants/helpers';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import Toast from 'react-native-simple-toast';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors } from '../constants/styles';
import DocumentScreen from './DocumentScreen';

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            userData: [],
            isLoading: true,
            isError: false,
        };
    }

    componentDidMount() {
        this.fetchToken();
    }

    async fetchToken() {
        try {
            var userToken = await AsyncStorage.getItem('logged_user_token');
            userToken = JSON.parse(userToken);
            this.setState({ token: userToken });

            const response = await fetch(`${BASE_URL}profile`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.state.token}`,
                    'token': this.state.token
                }
            });
            const output = await response.json();
            if (output.status === "success") {
                this.setState({ userData: output.data });
                this.setState({ isLoading: false });
            } else {
                this.setState({ isError: true });
                Toast.show(ERROR_MSG, Toast.LONG);
            }
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const { token, userData, isLoading, isError } = this.state;
        const TopTab = createMaterialTopTabNavigator();
        if (isLoading) {
            <LoadingOverlay />
        } else if (isLoading) {
            <ErrorOverlay />
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <Image style={styles.avatar} source={{ uri: userData.employee.img_url }} />
                            <Text style={styles.name}>{userData.employee.full_name}</Text>
                            <Text style={styles.contact}><Ionicons name="mail-outline" color="grey" size={15} /> {userData.employee.email}</Text>
                            <Text style={styles.contact}><Ionicons name="call-outline" color="grey" size={15} />{userData.employee.phone.includes('+') ? userData.employee.phone : '+' + userData.employee.phone}<Ionicons name="logo-whatsapp" color="grey" size={15} />{userData.employee.whatsapp.includes('+') ? userData.employee.whatsapp : '+' + userData.employee.whatsapp}</Text>
                        </View>
                    </View>
                    <TopTab.Navigator
                        name="Documents" tabBarPosition="top"
                        initialRouteName="Documents"
                        screenOptions={{
                            tabBarIndicatorStyle: {
                                backgroundColor: Colors.primary500,
                            },
                            tabBarInactiveTintColor: Colors.primary800,
                            tabBarActiveTintColor: Colors.primary500,
                            tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
                            tabBarStyle: {
                                backgroundColor: Colors.colorWhite,
                            },
                        }}
                    >
                        <TopTab.Screen name="Documents" children={() => <DocumentScreen docData={userData.documents} immigrationData={userData.immigrations} />} options={{ title: "Documents" }} />
                        <TopTab.Screen name="Status" children={() => <DocumentScreen docData={userData.documents} immigrationData={userData.immigrations} />} options={{ title: "Status" }} />
                    </TopTab.Navigator>
                </View>
            );
        }

    }
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
    },
    headerContent: {
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
    },
    textPadding: {
        padding: 10,
    },
    name: {
        fontSize: 22,
        color: '#000000',
        fontWeight: '600',
        marginBottom: 5,
    },
    contact: {
        fontSize: 15,
        color: '#000000',
        marginBottom: 5,
    },
    statsContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    statsBox: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    statsCount: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
    },
    statsLabel: {
        fontSize: 14,
        color: '#999999',
    },
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