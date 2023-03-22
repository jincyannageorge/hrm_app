import React, { useContext, useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, SafeAreaView, Image, Pressable, ScrollView } from 'react-native';
import { AuthContext } from '../store/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import Toast from 'react-native-simple-toast';
import { BASE_URL } from '../constants/helpers';
import { ERROR_MSG } from '../constants/helpers';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
function Profile({ navigation }) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const authCtx = useContext(AuthContext);
    const [name, setFullName] = useState('');
    const [userToken, setUserToken] = useState('');

    AsyncStorage.getItem("logged_user_token").then(token => {
        setUserToken(JSON.parse(token));
    });

    const [images, setImages] = useState([
        'https://www.bootdey.com/image/280x280/FF00FF/000000',
        'https://www.bootdey.com/image/280x280/00FFFF/000000',
        'https://www.bootdey.com/image/280x280/FF7F50/000000',
        'https://www.bootdey.com/image/280x280/6495ED/000000',
        'https://www.bootdey.com/image/280x280/DC143C/000000',
        'https://www.bootdey.com/image/280x280/008B8B/000000',
    ]);

    const [postCount, setPostCount] = useState(10);
    const [followingCount, setFollowingCount] = useState(20);
    const [followerCount, setFollowerCount] = useState(30);

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
                        AsyncStorage.removeItem('token');
                        authCtx.logout;
                    } else {
                        setData(output.data);
                        setIsLoading(false);
                    }
                }

            } catch (error) {
                Toast.show(ERROR_MSG, Toast.LONG);
                AsyncStorage.removeItem('token');
                authCtx.logout;
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
                        <Text style={styles.contact}>
                            <Ionicons name="mail-outline" color="grey" size={15} /> {data.employee.email}
                        </Text>
                        <Text style={styles.contact}>
                            <Ionicons name="call-outline" color="grey" size={15} /><Text style={styles.textPadding}>{data.employee.phone.includes('+') ? data.employee.phone : '+' + data.employee.phone}</Text>
                            <Ionicons name="logo-whatsapp" color="grey" size={15} /><Text style={styles.textPadding}>{data.employee.whatsapp.includes('+') ? data.employee.whatsapp : '+' + data.employee.whatsapp}</Text>
                        </Text>
                        {/* <View style={styles.statsContainer}>
                            <View style={styles.statsBox}>
                                <Text style={styles.statsCount}></Text>
                                <Text style={styles.statsLabel}></Text>
                            </View>
                            <View style={styles.statsBox}>
                                <Text style={styles.statsCount}></Text>
                                <Text style={styles.statsLabel}></Text>
                            </View>
                            <View style={styles.statsBox}>
                                <Text style={styles.statsCount}></Text>
                                <Text style={styles.statsLabel}></Text>
                            </View>
                        </View> */}
                    </View>
                </View>
                <View>

                </View>
                <ScrollView contentContainerStyle={styles.body}>
                    {images.map((image, index) => (
                        <View key={index} style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: image }} />
                        </View>
                    ))}
                </ScrollView>
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