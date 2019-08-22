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
      email   : '',
      password: '',
    }
  }

  onClickListener = (viewId) => {
    Keyboard.dismiss();
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  login = () => {

    const { token } = this.state;

    //Alert.alert('Datos',token);

    Keyboard.dismiss();

    let urlIntegracion = 'https://api.salesup.com/integraciones/sesion';

    let dataHeader = {
      method: 'POST',
      headers: {
        token: token
      }
    };

      fetch(urlIntegracion, dataHeader)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson[0].token);

          if ( responseJson[0].token ) {

            AsyncStorage.setItem('tkSession', JSON.stringify(responseJson[0].token));
            return this.props.navigation.navigate('Home');

          } else {

            Alert.alert('Oops!', 'Verifica de nuevo tu token ya que no se encuentra el registro.');
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
        <View style={{width: '70%'}}>
          <Image source={pic} style={{width: '100%', height: 100}}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/64/000000/password.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Token de integraci�n"
              keyboardType="ascii-capable"
              underlineColorAndroid='transparent'
              onChangeText={(token) => this.setState({token})}
              />
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.login()}>
          <Text style={{color: '#FFFFFF'}}>Entrar</Text>
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
      borderRadius:30,
      borderWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#7b1fa2",
  },
  loginText: {
    color: '#7b1fa2',
  }
});
