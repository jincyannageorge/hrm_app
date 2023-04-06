import { FlatList } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../store/auth-context';
import { MENU } from '../data/dummy-data';
import MenuGridTile from '../components/DashBoard/MenuGridTile';

function WelcomeScreen({ navigation }) {
	function renderMenu(itemData) {
		let redirectScreen = "";
		if (itemData.item.title === "My Requests") {
			redirectScreen = navigation.navigate('RequestScreen');
		}
		return (
			<MenuGridTile title={itemData.item.title} color={itemData.item.color} onPress={redirectScreen} />
		);
	}
	return (
		<FlatList data={MENU} keyExtractor={(item) => item.id} renderItem={renderMenu} numColumns={2} />
	);
}

export default WelcomeScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 32,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 8,
	},
});
