import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  TouchableHighlight,
  Image,
  Alert,
  Keyboard
} from 'react-native';

export default class LoginView extends Component {

  constructor(props) {
    super(props);
    state = {
      email: '',
      password: '',
    }
  }

  onClickListener = (viewId) => {
    Keyboard.dismiss();
    Alert.alert("Alert", "Button pressed " + viewId);
  }

  login = () => {

    const { user, password } = this.state;

    //Alert.alert('Datos',token);

    Keyboard.dismiss();

    let urlIntegracion = 'https://api.salesup.com/login';
    let formData = new FormData();

    formData.append('usuario', user);
    formData.append('contrasenia', password);

    let dataHeader = {
      method: 'POST',
      body: formData
    };

    fetch(urlIntegracion, dataHeader)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson[0].token);

        if (responseJson[0].tkSesion) {

          console.log({DATOS: responseJson[0]});
          AsyncStorage.setItem('tkSession', JSON.stringify(responseJson[0]));
          return this.props.navigation.navigate('Home');

        } else {

          Alert.alert('Acceso', 'El usuario y/o clave no es correcto.');
          return false;

        }
      })
      .catch((error) => {
        console.error(error);

      });
  }

  render() {
    let pic = {
      uri: 'https://s3-eu-west-1.amazonaws.com/cdn.supporthero.io/article/323/56a919b5-2be9-4cc6-adb9-c89b4693a74e.jpg'
    };
    return (
      <View style={styles.container}>
        <View style={{ width: '70%' }}>
          <Image source={pic} style={{ width: '100%', height: 100 }} />
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/64/000000/email.png' }} />
          <TextInput style={styles.inputs}
            placeholder="Usuario"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(user) => this.setState({ user })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/64/000000/password.png' }} />
          <TextInput style={styles.inputs}
            placeholder="Clave de acceso"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({ password })}
          />
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.login()}>
          <Text style={{ color: '#FFFFFF' }}>Entrar</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
          <Text style={styles.loginText}>Olvidó su contraseña?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
          <Text style={styles.loginText}>Registro</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    borderColor: '#7b1fa2',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#7b1fa2",
  },
  loginText: {
    color: '#7b1fa2',
  }
});
