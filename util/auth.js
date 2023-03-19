import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import helpers from '../constants/helpers';

async function authenticate(mode, email, password) {
	const url = `http://hrm.nuroil.com/api/login`;

	const response = await axios.post(url, {
		email: email,
		password: password,
	});

	const token = response.data.data.api_token,
		user_name = response.data.data.name,
		full_name = response.data.data.full_name,
		user_id = response.data.data.user_id;

	helpers.loggedUserId(user_id);
	helpers.loggedUserName(user_name);
	helpers.loggedUserFullName(full_name);
	helpers.loggedUserToken(token);

	return token;
}

export function createUser(email, password) {
	return authenticate('signUp', email, password);
}

export function login(email, password) {
	return authenticate('signInWithPassword', email, password);
}