import { Text, StyleSheet } from 'react-native';
import helpers from '../constants/helpers';

function Profile() {
    const response = helpers.fetchDataWithHeaders('POST', 'http://hrm.nuroil.com/api/test-url');
    console.log(response);
    return (
        <Text>Test</Text>
    )
}

export default Profile;

const styles = StyleSheet.create({});