import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import IconButton from './components/ui/IconButton';

const Stack = createNativeStackNavigator(),
	Tab = createBottomTabNavigator();

function AuthStack() {
	return (
		<Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: Colors.primary500 }, headerTintColor: 'white', contentStyle: { backgroundColor: Colors.primary100 }, }}>
			<Stack.Screen name="Login" component={LoginScreen} />
		</Stack.Navigator>
	);
}

function tabOption(authCtx, tabLabel, iconLabel) {
	return ({
		tabBarLabel: tabLabel,
		tabBarLabelStyle: {
			fontWeight: "700",
			fontSize: 13
		},
		tabBarActiveTintColor: '#d02b2d',
		tabBarIcon: ({ tintColor }) => (
			<IconButton icon={iconLabel} color={tintColor} size={20} />
		),
		headerRight: ({ tintColor }) => (
			<IconButton
				icon="exit"
				color={tintColor}
				size={24}
				onPress={authCtx.logout}
			/>
		),
	});
}

function AuthenticatedStack() {
	const [currentUser, setCurrentUser] = useState('');
	AsyncStorage.getItem("logged_user_name").then(user => {
		setCurrentUser(JSON.parse(user));
	});

	const authCtx = useContext(AuthContext),
		user_name = "Hello " + currentUser + ' !!';

	return (
		<Tab.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: Colors.primary100 },
			}}
		>
			<Tab.Screen
				name={user_name}
				component={WelcomeScreen}
				options={tabOption(authCtx, 'Home', 'ios-home')}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={tabOption(authCtx, 'Profile', 'person')}
			/>
		</Tab.Navigator>
	);
}

function Navigation() {
	const authCtx = useContext(AuthContext);

	return (
		<NavigationContainer>
			{!authCtx.isAuthenticated && <AuthStack />}
			{authCtx.isAuthenticated && <AuthenticatedStack />}
		</NavigationContainer>
	);
}

function Root() {
	const [isTryingLogin, setIsTryingLogin] = useState(true);

	const authCtx = useContext(AuthContext);

	useEffect(() => {
		async function fetchToken() {
			const storedToken = await AsyncStorage.getItem('token');

			if (storedToken) {
				authCtx.authenticate(storedToken);
			}

			setIsTryingLogin(false);
		}

		fetchToken();
	}, []);

	if (isTryingLogin) {
		return <AppLoading />;
	}

	return <Navigation />;
}

export default function App() {

	return (
		<>
			<StatusBar style="light" />
			<AuthContextProvider>
				<Root />
			</AuthContextProvider>
		</>
	);
}
