import axios from 'axios';
import { useState } from 'react';
import { ToastAndroid, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'http://hrm.nuroil.com/api/v1/';

const helpers = {
    loggedUserToken: function (value) {
        try {
            AsyncStorage.setItem('logged_user_token', JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    },
    loggedUserId: function (value) {
        try {
            AsyncStorage.setItem('logged_user_id', JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    },
    loggedUserFullName: function (value) {
        try {
            AsyncStorage.setItem('logged_user_full_name', JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    },
    loggedUserName: function (value) {
        try {
            AsyncStorage.setItem('logged_user_name', JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    },
    fetchDataWithHeaders: function (urlMethod, url, data) {
        const [userToken, setUserToken] = useState('');
        AsyncStorage.getItem("logged_user_token").then(token => {
            setUserToken(JSON.parse(token));
        });

        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': userToken,
            }
        }

        const response = axios.post(`${BASE_URL + url}`, data, headers)
            .then(res => {
                if (res.status === 200) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.show('Success', ToastAndroid.SHORT)
                    } else {
                        Alert.alert('Success');
                    }
                }
            }).catch(error => console.log(error));

        return response;
    }
}

export default helpers;