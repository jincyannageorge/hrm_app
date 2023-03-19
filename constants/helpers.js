import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    fetchDataWithHeaders: function (urlMethod, url) {
        const [userToken, setUserToken] = useState('');
        AsyncStorage.getItem("logged_user_token").then(token => {
            setUserToken(JSON.parse(token));
        });

        const data = {
            email: "me@me.com",
            username: "me"
        };

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const resp = axios.post(url, data, options)
            .then((res) => {
                console.log("RESPONSE ==== : ", res);
            })
            .catch((err) => {
                console.log("ERROR: ====", err);
            })
        console.log(resp);

        // const options = {
        //     url: url,
        //     method: urlMethod,
        //     headers: { 'X-Auth-Token': userToken },
        //     data: data,
        // };
        // return axios(options);
    }
}

export default helpers;