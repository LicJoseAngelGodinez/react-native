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
  TouchableHighlight,
} from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Entities from 'html-entities';

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

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {

    Alert.alert(
      'Cerrar',
      entities.decode('Va a cerrar sesi&oacute;n, desea continuar?'),
      [
        {
          text: 'Cancelar',
          onPress: () => {
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

  render() {
    const { username, credentials } = this.state;

    const AnimateHeaderBackgroundColor = this.AnimatedHeaderValue.interpolate(
      {
        inputRange: [0, (Header_Maximum_Height - Header_Minimum_Height)],

        outputRange: ['#7b1fa2', '#00BCD4'],

        extrapolate: 'clamp'
      });

    const AnimateHeaderHeight = this.AnimatedHeaderValue.interpolate(
      {
        inputRange: [0, (Header_Maximum_Height - Header_Minimum_Height)],

        outputRange: [Header_Maximum_Height, Header_Minimum_Height],

        extrapolate: 'clamp'
      });

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
              {entities.decode('SuForms')}
          </Text>
          </Animated.View>
          <ScrollView
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingTop: Header_Maximum_Height }}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.AnimatedHeaderValue } } },
            ])}>
            {/* Put all your Component here inside the ScrollView */}
            <Text style={styles.TextViewStyle}>Text</Text>
            <Text style={styles.TextViewStyle}>Input</Text>
            <Text style={styles.TextViewStyle}>Button</Text>
            <Text style={styles.TextViewStyle}>Card</Text>
            <Text style={styles.TextViewStyle}>CheckBox</Text>
            <Text style={styles.TextViewStyle}>Divider</Text>
            <Text style={styles.TextViewStyle}>Holi</Text>
            <Text style={styles.TextViewStyle}>List Item</Text>
            <Text style={styles.TextViewStyle}>Pricing</Text>
            <Text style={styles.TextViewStyle}>Rating</Text>
            <Text style={styles.TextViewStyle}>Search Bar</Text>
            <Text style={styles.TextViewStyle}>Slider</Text>
            <Text style={styles.TextViewStyle}>Tile</Text>
            <Text style={styles.TextViewStyle}>Icon</Text>
            <Text style={styles.TextViewStyle}>Avatar</Text>
          </ScrollView>

        </View>
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

  buttonText: {
    
  },
});


