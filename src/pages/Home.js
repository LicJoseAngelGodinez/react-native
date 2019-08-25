import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Alert, BackHandler, Image, } from 'react-native';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      credentials: null
    };
    this.loadCredentials();
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  async loadCredentials() {
    try {
      const credentials = await AsyncStorage.getItem('userData');
      console.log({ uData: JSON.parse(credentials) });
      this.setState({ credentials: JSON.parse(credentials) });
      this.setState({ username: this.state.credentials.nombre + ' ' + this.state.credentials.apellidos });
    }
    catch (error) {
      // Manage error handling
    }
  }

  remove_user = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      return true;
    }
    catch (exception) {
      return false;
    }
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  // static navigationOptions = () => ({
  //   headerTintColor: 'white',
  //   title: 'Inicio',
  //   headerTitleStyle: {
  //     textAlign: 'center',
  //     alignSelf: 'center',
  //     color: 'white'
  //   },
  //   headerStyle: {
  //     backgroundColor: '#7b1fa2',
  //   },
  // });

  handleBackButtonClick() {

    Alert.alert(
      'Cerrar',
      'Va a cerrar sesi�n, desea continuar?',
      [
        {
          text: 'Cancelar',
          onPress: () => {
            //this.remove_user();
            console.log('Cancel�');
          },
          style: 'cancel',
        },
        {
          text: 'Cerrar',
          onPress: () => {
            console.log('OK Pressed');
            this.props.navigation.popToTop();
            return true;
          }
        },
      ],
      { cancelable: true },
    );
    return true;

  }

  render() {
    const { username, credentials } = this.state;
    if (username != null) {
      return (
        <View style={styles.container}>
          <View style={{ width: 80, height: 80 }}>
            <Image source={{ uri: credentials.logo }} style={{ width: '100%', height: '100%' }} />
          </View>
          <Text>{"\n"}{"\n"}{"\n"}Saludos {username}!{"\n"}Has entrado!</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text>Has entrado!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


