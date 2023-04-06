import axios from 'axios';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// export const BASE_URL = 'http://hrm.nuroil.com/api/v1/';
export const ERROR_MSG = "Something Went Wrong!!";
export const BASE_URL = 'http://192.168.1.123:8009/hrm/public/api/v1/';
axios.defaults.headers.common = { 'Authorization': `bearer ` }

// axios.defaults.headers.common = { 'Authorization': `bearer ${token}` }

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

// export async function getUserToken() {
//     try {
//         await AsyncStorage.getItem('logged_user_token');
//         // return token;
//     }
//     catch (error) {
//         console.log(error);
//     }
// }


export function requestHeader() {
    const [token, setToken] = useState('');
    AsyncStorage.getItem("logged_user_token").then(token => {
        setToken(JSON.parse(token));
    });

    const headers = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token,
        }
    }

    return headers;
}