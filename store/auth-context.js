import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useEffect, useState } from 'react';
import helpers from '../constants/helpers';

export const AuthContext = createContext({
	token: '',
	isAuthenticated: false,
	authenticate: (token) => { },
	logout: () => { },
});

function AuthContextProvider({ children }) {
	const [authToken, setAuthToken] = useState();

	function authenticate(token) {
		setAuthToken(token);
		AsyncStorage.setItem('token', token);
	}

	function logout() {
		// const [currentUser, setCurrentUser] = useState('');
		// AsyncStorage.getItem("logged_user_id").then(user => {
		// 	setCurrentUser(JSON.parse(user));
		// });
		setAuthToken(null);
		AsyncStorage.removeItem('token');
		// helpers.fetchDataWithHeaders('POST', 'logout', { 'user_id': currentUser });
	}

	const value = {
		token: authToken,
		isAuthenticated: !!authToken,
		authenticate: authenticate,
		logout: logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
