import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Alert,
  BackHandler,
  Image,
  ScrollView,
  Animated,
  Platform,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Entities from 'html-entities';
import { LinearGradient } from 'expo-linear-gradient';

const entities = new Entities.AllHtmlEntities();

const Header_Maximum_Height = 200;

const Header_Minimum_Height = vh(10);
export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.AnimatedHeaderValue = new Animated.Value(0);
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

  // remove_user = async () => {
  //   try {
  //     await AsyncStorage.removeItem('userData');
  //     return true;
  //   }
  //   catch (exception) {
  //     return false;
  //   }
  // };

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
      entities.decode('Va a cerrar sesi&oacute;n, desea continuar?'),
      [
        {
          text: 'Cancelar',
          onPress: () => {
            //this.remove_user();
            console.log(entities.decode('Cancel&oacute;'));
          },
          style: 'cancel',
        },
        {
          text: 'Cerrar',
          onPress: () => {
            console.log('OK Pressed');
            this.props.navigation.navigate('Login');
            return true;
          }
        },
      ],
      { cancelable: true },
    );
    return true;

  }

  toast = (buttonId) => {
    ToastAndroid.showWithGravityAndOffset(
      'A wild toast appeared! Toco: ' + buttonId,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  }

  render() {
    const { username, credentials } = this.state;

    const AnimateHeaderBackgroundColor = this.AnimatedHeaderValue.interpolate(
      {
        inputRange: [0, (Header_Maximum_Height - Header_Minimum_Height)],

        outputRange: ['#7b1fa2', '#FFF'],

        extrapolate: 'clamp'
      });

    const AnimateHeaderHeight = this.AnimatedHeaderValue.interpolate(
      {
        inputRange: [0, (Header_Maximum_Height - Header_Minimum_Height)],

        outputRange: [Header_Maximum_Height, Header_Minimum_Height],

        extrapolate: 'clamp'
      });

    const colors = ['#FFF', '#b388ff', '#7b1fa2'];

    const startGradient = [0.0000090, 0.91];

    if (username != null) {
      return (
        <View style={styles.MainContainer}>
          <Animated.View
            style={[
              styles.Header,
              {
                height: AnimateHeaderHeight,
                backgroundColor: AnimateHeaderBackgroundColor,
              },
            ]}>

            <Text style={styles.HeaderInsideText}>
              {entities.decode('SalesUp! Forms')}
            </Text>
          </Animated.View>
          <ScrollView
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingTop: Header_Maximum_Height }}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.AnimatedHeaderValue } } },
            ])}>
            {/* Put all your Component here inside the ScrollView */}
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate('Integrations')}>
              <LinearGradient
                style={styles.mainMenuButton}
                colors={colors}
                start={startGradient}
              >
                <Image
                  source={require('../../assets/mainMenuIcons/icon03-64.png')}
                  style={styles.ImageIconStyle}
                />
                <Text style={styles.TextStyle}> {entities.decode('Tokens de integraci&oacute;n')} </Text>

              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.toast('Formularios')}>

              <LinearGradient
                style={styles.mainMenuButton}
                colors={colors}
                start={startGradient}
              >
                <Image
                  source={require('../../assets/mainMenuIcons/icon05-64.png')}
                  style={styles.ImageIconStyle}
                />

                <Text style={styles.TextStyle}> Formularios </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.toast('Nuevo formulario')}>

              <LinearGradient
                style={styles.mainMenuButton}
                colors={colors}
                start={startGradient}
              >
                <Image
                  source={require('../../assets/mainMenuIcons/icon00-64.png')}
                  style={styles.ImageIconStyle}
                />

                <Text style={styles.TextStyle}> Nuevo formulario </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>

              <LinearGradient
                style={styles.mainMenuButton}
                colors={colors}
                start={startGradient}
              >
                <Image
                  source={require('../../assets/mainMenuIcons/icon04-64.png')}
                  style={styles.ImageIconStyle}
                />

                <Text style={styles.TextStyle}> {entities.decode('Configuraci&oacute;n')} </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
              <LinearGradient
                style={styles.mainMenuButton}
                colors={colors}
                start={startGradient}
              >
                <Image
                  source={require('../../assets/mainMenuIcons/icon06-64.png')}
                  style={styles.ImageIconStyle}
                />

                <Text style={styles.TextStyle}> Soporte </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
              <LinearGradient
                style={styles.mainMenuButton}
                colors={colors}
                start={startGradient}
              >
                <Image
                  source={require('../../assets/mainMenuIcons/icon02-64.png')}
                  style={styles.ImageIconStyle}
                />

                <Text style={styles.TextStyle}> Opciones extra 1 </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
              <LinearGradient
                style={styles.mainMenuButton}
                colors={colors}
                start={startGradient}
              >
                <Image
                  source={require('../../assets/mainMenuIcons/icon01-64.png')}
                  style={styles.ImageIconStyle}
                />

                <Text style={styles.TextStyle}> Opciones extra 2 </Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>

        </View>
        // <View style={{ width: 80, height: 80 }}>
        //   <Image source={{ uri: credentials.logo }} style={{ width: '100%', height: '100%' }} />
        // </View>
        // <Text>{"\n"}{"\n"}{"\n"}Saludos {username}!{"\n"}Has entrado!</Text>
        // </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Has entrado!</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? 20 : 0,
  },

  Header: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: Platform.OS == 'ios' ? 20 : 0,
  },

  HeaderInsideText: {
    color: '#fff',
    fontSize: RFValue(25),
    // fontWeight: "bold",
    textAlign: 'center',
  },

  TextViewStyle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    margin: 5,
    padding: 7,
  },

  containerButtonCard: {
    height: vh(10),
    margin: 5
  },

  imageButtonCard: {
    width: '100%',
    height: '100%',
    marginBottom: 5,
  },

  buttonIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },

  mainMenuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: .5,
    borderColor: '#7b1fa2',
    height: 100,
    borderRadius: 5,
    margin: 5,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 3, // Android   
  },

  ImageIconStyle: {
    padding: 20,
    margin: 5,
    height: 40,
    width: 40,
    resizeMode: 'stretch',

  },

  TextStyle: {

    fontSize: vmax(2.5),
    color: "#7b1fa2",
    marginBottom: 4,
    marginRight: 20,

  },
});


