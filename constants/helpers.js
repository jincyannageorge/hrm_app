import axios from 'axios';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'http://hrm.nuroil.com/api/v1/';
export const ERROR_MSG = "Something Went Wrong!!";
// export const BASE_URL = 'http://127.0.0.1:8000/api/v1/';

export async function loggedUserToken(value) {
    try {
        await AsyncStorage.setItem('logged_user_token', JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
}

export async function loggedUserId(value) {
    try {
        await AsyncStorage.setItem('logged_user_id', JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
}

export async function loggedUserFullName(value) {
    try {
        await AsyncStorage.setItem('logged_user_full_name', JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
}

export async function loggedUserName(value) {
    try {
        await AsyncStorage.setItem('logged_user_name', JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
}

export async function fetchDataWithHeaders(urlMethod, url, data) {
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

    const response = await axios.post(`${BASE_URL + url}`, data, headers);
    return response;
}