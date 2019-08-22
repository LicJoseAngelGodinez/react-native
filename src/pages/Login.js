import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Alert,
    AsyncStorage,
    Keyboard,
    Button
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Form from '../components/Form';

export default class Login extends Component {

    signup() {
        Actions.signup()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>

                <Form type="Login" />

                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Aún no tienes cuenta? </Text>
                    <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}>Registrarse</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    signupTextCont: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    signupText: {
        color: '#7b1fa2',
        fontSize: 16
    },
    signupButton: {
        color: '#7b1fa2',
        fontSize: 16,
        fontWeight: '500'
    }
});


