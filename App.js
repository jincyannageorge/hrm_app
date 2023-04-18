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
import RequestScreen from './screens/RequestScreen';

const Stack = createNativeStackNavigator(),
	Tab = createBottomTabNavigator();

function AuthStack() {
	return (
		<Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: Colors.primary500 }, headerTintColor: 'white', contentStyle: { backgroundColor: Colors.primary100 }, }}>
			<Stack.Screen name="Login" component={LoginScreen} />
		</Stack.Navigator>
	);
}

function tabOption(authCtx, tabLabel, iconLabel, showHeader) {
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
		headerShown: showHeader,
		presentation: 'modal',
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

function screenTabOption(tabLabel, authCtx) {
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
		presentation: 'modal',
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

function HomeStackScreen() {
	const [currentUser, setCurrentUser] = useState('');
	AsyncStorage.getItem("logged_user_name").then(user => {
		setCurrentUser(JSON.parse(user));
	});

	const authCtx = useContext(AuthContext),
		user_name = "Hello " + currentUser + ' !!';
	return (
		<Stack.Navigator screenOptions={{
			headerStyle: { backgroundColor: Colors.primary500 },
			headerTintColor: 'white',
			contentStyle: { backgroundColor: Colors.primary100 },
		}}>
			<Stack.Screen name="DashBoard" component={WelcomeScreen} options={screenTabOption(user_name, authCtx)} />
			<Stack.Screen name="RequestScreen" component={RequestScreen} options={screenTabOption('My Requests', authCtx)} />
		</Stack.Navigator>
	)
}

function AuthenticatedStack() {
	const [currentUser, setCurrentUser] = useState('');
	AsyncStorage.getItem("logged_user_name").then(user => {
		setCurrentUser(JSON.parse(user));
	});

	const authCtx = useContext(AuthContext),
		user_name = "Hello " + currentUser + ' !!';

	return (
		<Tab.Navigator screenOptions={{
			headerStyle: { backgroundColor: Colors.primary500 },
			headerTintColor: 'white',
			contentStyle: { backgroundColor: Colors.primary100 },
		}}>
			<Tab.Screen
				name={user_name}
				component={HomeStackScreen}
				options={tabOption(authCtx, 'Home', 'ios-home', false)}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={tabOption(authCtx, 'Profile', 'person', true)}
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
