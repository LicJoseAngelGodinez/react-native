import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  TouchableHighlight,
  Image,
  Alert,
  Keyboard,
  ActivityIndicator
} from 'react-native';

export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      Isbuttonenable: false,
      credentials : ''
    }
  }

  async loadCredentials() {
    try {
        const credentials = await AsyncStorage.getItem('userData');
        if ( this.state.credentials.tkSesion ) {

          this.props.navigation.navigate('Home');

        }
        
    }
    catch (error) {
        // Manage error handling
    }
}

  ShowHideActivityIndicator = () => {

    if (this.state.isLoading == true) {
      this.setState({ isLoading: false });
      this.setState({ Isbuttonenable: false });
    }
    else {
      this.setState({ isLoading: true });
      this.setState({ Isbuttonenable: true });
    }

  }

  onClickListener = (viewId) => {
    Keyboard.dismiss();
    Alert.alert("Alerta", "Has presionado: " + viewId);
  }

  login = () => {

    const { user, password } = this.state;

    this.ShowHideActivityIndicator();

    Keyboard.dismiss();

    let urlIntegracion = 'https://api.salesup.com/login';
    let formData = new FormData();

    if ( user == '' && password == '' ) {

      user = 'angel@prueba.com';
      password = 'Salesup2016!'

    }

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

          console.log({ DATOS: responseJson[0] });
          AsyncStorage.setItem('userData', JSON.stringify(responseJson[0]));
          this.ShowHideActivityIndicator();
          return this.props.navigation.navigate('Home');

        } else {
          this.ShowHideActivityIndicator();
          Alert.alert('Acceso', 'El usuario y/o clave no es correcto.');
          return false;

        }
      })
      .catch((error) => {
        this.ShowHideActivityIndicator();
        Alert.alert('Conexión', 'Al parecer hay un problema en la conexión, revisa tu acceso a datos o wifi.');
      });
  }

  render() {
    let pic = {
      uri: 'https://s3-eu-west-1.amazonaws.com/cdn.supporthero.io/article/323/56a919b5-2be9-4cc6-adb9-c89b4693a74e.jpg'
    };
    return (
      <View style={styles.container}>

        {
          this.state.isLoading ? <ActivityIndicator size="large" color="#7b1fa2" style={{ padding: 20 }} /> : null
        }

        <View style={{ width: '70%' }}>
          <Image source={pic} style={{ width: '100%', height: 100 }} />
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/64/000000/email.png' }} />
          <TextInput style={styles.inputs}
            placeholder="Usuario"
            keyboardType="email-address"
            autoCapitalize = 'none'
            onChangeText={(user) => this.setState({ user })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/64/000000/password.png' }} />
          <TextInput style={styles.inputs}
            placeholder="Clave de acceso"
            secureTextEntry={true}
            autoCapitalize = 'none'
            onChangeText={(password) => this.setState({ password })}
          />
        </View>

        <TouchableHighlight
          disabled={this.state.Isbuttonenable}
          style={!this.state.Isbuttonenable ? [styles.buttonContainer, styles.loginButton] : [styles.buttonContainer, styles.loginButtonDisabled]}
          onPress={() => this.login()}>
          <Text style={{ color: '#FFFFFF' }}>Entrar</Text>
        </TouchableHighlight>

        <TouchableHighlight
          disabled={this.state.Isbuttonenable}
          style={styles.buttonContainer}
          onPress={() => this.onClickListener('recuperar_contrasenia')}>
          <Text style={!this.state.Isbuttonenable ? styles.loginText : styles.loginTextDisabled}>OlvidÃ³ su contraseÃ±a?</Text>
        </TouchableHighlight>

        <TouchableHighlight
          disabled={this.state.Isbuttonenable}
          style={styles.buttonContainer}
          onPress={() => this.onClickListener('registro')}>
          <Text style={!this.state.Isbuttonenable ? styles.loginText : styles.loginTextDisabled}>Registro</Text>
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
  loginButtonDisabled: {
    backgroundColor: "#CDCDCD",
  },
  loginText: {
    color: '#7b1fa2',
  },
  loginTextDisabled: {
    color: '#CDCDCD',
  }
});
