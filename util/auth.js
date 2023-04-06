import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loggedUserToken } from '../constants/helpers';
import { loggedUserId } from '../constants/helpers';
import { loggedUserName } from '../constants/helpers';
import { loggedUserFullName } from '../constants/helpers';

async function authenticate(mode, email, password) {
	const url = `http://192.168.1.123:8009/hrm/public/api/login`;

	const response = await axios.post(url, {
		email: email,
		password: password,
	});

	const token = response.data.data.api_token,
		user_name = response.data.data.name,
		full_name = response.data.data.full_name,
		user_id = response.data.data.user_id;

	loggedUserToken(token);
	loggedUserId(user_id);
	loggedUserName(user_name);
	loggedUserFullName(full_name);

	return token;
}

export function createUser(email, password) {
	return authenticate('signUp', email, password);
}

export function login(email, password) {
	return authenticate('signInWithPassword', email, password);
}