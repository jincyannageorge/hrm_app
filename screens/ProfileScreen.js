import { View, Text, StyleSheet, SafeAreaView, Image, Pressable } from 'react-native';
import Icon from '../components/ui/IconButton';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import helpers from '../constants/helpers';

function Profile() {
    const response = helpers.fetchDataWithHeaders('POST', 'profile');
    return <LoadingOverlay message="" />;
    // return (
    //     <SafeAreaView style={styles.container}>

    //         <View style={styles.userInfoSection}>
    //             <View style={{ flexDirection: 'row', marginTop: 15 }}>
    //                 <Image
    //                     source={{
    //                         uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
    //                     }}
    //                     size={80}
    //                 />
    //                 <View style={{ marginLeft: 20 }}>
    //                     <Text style={[styles.title, {
    //                         marginTop: 15,
    //                         marginBottom: 5,
    //                     }]}>John Doe</Text>
    //                     <Text style={styles.caption}>@j_doe</Text>
    //                 </View>
    //             </View>
    //         </View>

    //         <View style={styles.userInfoSection}>
    //             <View style={styles.row}>
    //                 <Icon name="map-marker-radius" color="#777777" size={20} />
    //                 <Text style={{ color: "#777777", marginLeft: 20 }}>Kolkata, India</Text>
    //             </View>
    //             <View style={styles.row}>
    //                 <Icon name="phone" color="#777777" size={20} />
    //                 <Text style={{ color: "#777777", marginLeft: 20 }}>+91-900000009</Text>
    //             </View>
    //             <View style={styles.row}>
    //                 <Icon name="email" color="#777777" size={20} />
    //                 <Text style={{ color: "#777777", marginLeft: 20 }}>john_doe@email.com</Text>
    //             </View>
    //         </View>

    //         <View style={styles.infoBoxWrapper}>
    //             <View style={[styles.infoBox, {
    //                 borderRightColor: '#dddddd',
    //                 borderRightWidth: 1
    //             }]}>
    //                 <Text>₹140.50</Text>
    //                 <Text>Wallet</Text>
    //             </View>
    //             <View style={styles.infoBox}>
    //                 <Text>12</Text>
    //                 <Text>Orders</Text>
    //             </View>
    //         </View>

    //         <View style={styles.menuWrapper}>
    //             <Pressable onPress={() => { }}>
    //                 <View style={styles.menuItem}>
    //                     <Icon name="heart-outline" color="#FF6347" size={25} />
    //                     <Text style={styles.menuItemText}>Your Favorites</Text>
    //                 </View>
    //             </Pressable>
    //             <Pressable onPress={() => { }}>
    //                 <View style={styles.menuItem}>
    //                     <Icon name="credit-card" color="#FF6347" size={25} />
    //                     <Text style={styles.menuItemText}>Payment</Text>
    //                 </View>
    //             </Pressable>
    //             <Pressable onPress={() => { }}>
    //                 <View style={styles.menuItem}>
    //                     <Icon name="share-outline" color="#FF6347" size={25} />
    //                     <Text style={styles.menuItemText}>Tell Your Friends</Text>
    //                 </View>
    //             </Pressable>
    //             <Pressable onPress={() => { }}>
    //                 <View style={styles.menuItem}>
    //                     <Icon name="account-check-outline" color="#FF6347" size={25} />
    //                     <Text style={styles.menuItemText}>Support</Text>
    //                 </View>
    //             </Pressable>
    //             <Pressable onPress={() => { }}>
    //                 <View style={styles.menuItem}>
    //                     <Icon name="settings-outline" color="#FF6347" size={25} />
    //                     <Text style={styles.menuItemText}>Settings</Text>
    //                 </View>
    //             </Pressable>
    //         </View>
    //     </SafeAreaView>
    // );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});