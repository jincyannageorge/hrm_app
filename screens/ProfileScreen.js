import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AuthContext } from '../store/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import Toast from 'react-native-simple-toast';
import { BASE_URL } from '../constants/helpers';
import { ERROR_MSG } from '../constants/helpers';
import DocumentScreen from './DocumentScreen';
import { Colors } from '../constants/styles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TopTab = createMaterialTopTabNavigator();
function Profile({ navigation }) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const authCtx = useContext(AuthContext);
    const [userToken, setUserToken] = useState('');

    AsyncStorage.getItem("logged_user_token").then(token => {
        setUserToken(JSON.parse(token));
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${BASE_URL}profile`, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + userToken,
                        'Content-Type': 'application/json',
                        'token': userToken
                    }
                });
                const output = await response.json();
                if (output) {
                    // console.log('response', output);
                    if (output.status === "failed") {
                        // AsyncStorage.removeItem('token');
                        // authCtx.logout;
                    } else {
                        setData(output.data);
                        setIsLoading(false);
                    }
                }

            } catch (error) {
                console.log(error);
                Toast.show(ERROR_MSG, Toast.LONG);
                // AsyncStorage.removeItem('token');
                // authCtx.logout;
            }
        }
        fetchData();
    }, []);

    return (
        (isLoading ? (
            <View style={styles.container}>
                <LoadingOverlay />
            </View>
        ) : (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Image style={styles.avatar} source={{ uri: data.employee.img_url }} />
                        <Text style={styles.name}>{data.employee.full_name}</Text>
                            <Text style={styles.contact}><Ionicons name="mail-outline" color="grey" size={15} /> {data.employee.email}</Text>
                            <Text style={styles.contact}><Ionicons name="call-outline" color="grey" size={15} />{data.employee.phone.includes('+') ? data.employee.phone : '+' + data.employee.phone}<Ionicons name="logo-whatsapp" color="grey" size={15} />{data.employee.whatsapp.includes('+') ? data.employee.whatsapp : '+' + data.employee.whatsapp}</Text>
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
                        <TopTab.Screen name="Documents" children={() => <DocumentScreen userData={data.documents} />} options={{ title: "Documents" }} />
                        <TopTab.Screen name="Status" children={() => <DocumentScreen userData={data.documents} />} options={{ title: "Status" }} />
                    </TopTab.Navigator>
            </View>

        ))
    );
}

export default Profile;

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