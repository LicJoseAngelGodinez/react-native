import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
    Keyboard,
    Alert
} from 'react-native';

import { Actions } from 'react-native-router-flux';

export default class Form extends Component {

    constructor(props) {

        super(props);

        this.state = {
            email: '',
            password: ''
        };

    }

    saveData = async () => {

        const { email, password } = this.state;

        let loginDetails = {
            email: email,
            password: password
        }

        if (this.props.type !== 'Login') {
            AsyncStorage.setItem('loginDetails', JSON.stringify(loginDetails));

            Keyboard.dismiss();
            alert(`Te has registrado con éxito! Correo: ${email}, Contraseña: ${password}`);
            this.login();
        } /* - if - */
        else if (this.props.type == 'Login') {
            try {
                let loginDetails = await AsyncStorage.getItem('loginDetails');
                let ld = JSON.parse(loginDetails);

                if (ld.email != null && ld.password != null) {
                    if (ld.email == email && ld.password == password) {
                        alert('Podemos entrar!');
                    } else {
                        alert('La cuenta y/o contraseña no existe!');
                    }
                } /* - if - */
            } catch (error) {
                alert(error);
            } /* - tryCatch - */
        } /* - elseIf - */
    } /* - saveData - */

    showData = async() => {

        let loginDetails = await AsyncStorage.getItem('loginDetails');
        let ld = JSON.parse('loginDetails');
        alert(`Cuenta: ${ld.email}, contraseña: ${ld.password}`);
    } /* - showData - */

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
                <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/64/000000/email-sign.png'}}/>
                <TextInput 
                    style={styles.inputs}
                    placeholder="Correo"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(email) => this.setState({email})}
                    onSubmitEditing={() => this.password.focus()}/>
              </View>
              
              <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/64/000000/password.png'}}/>
                <TextInput 
                    style={styles.inputs}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(password) => this.setState({password})}
                    ref={(input) => this.password = input}/>
              </View>
      
              <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}>
                <Text 
                    style={{color: '#FFFFFF'}}
                    onPress={() => this.saveData}
                    >{this.props.type}</Text>
              </TouchableHighlight>
      
              <TouchableHighlight 
                    style={styles.buttonContainer} 
                    onPress={() => this.onClickListener('restore_password')}>
                  <Text style={styles.loginText}>Olvidó su contraseña?</Text>
              </TouchableHighlight>
      
              <TouchableHighlight 
                    style={styles.buttonContainer} 
                    onPress={() => this.onClickListener('register')}>
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
    }
}
