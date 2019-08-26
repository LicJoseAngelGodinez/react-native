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
} from 'react-native';

const Header_Maximum_Height = 200;

const Header_Minimum_Height = 50;
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

    const AnimateHeaderBackgroundColor = this.AnimatedHeaderValue.interpolate(
      {
        inputRange: [0, (Header_Maximum_Height - Header_Minimum_Height)],

        outputRange: ['#009688', '#00BCD4'],

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
              List of React Native Elements
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
            <Text style={styles.TextViewStyle}> Input</Text>
            <Text style={styles.TextViewStyle}>Button</Text>
            <Text style={styles.TextViewStyle}>Card</Text>
            <Text style={styles.TextViewStyle}>CheckBox</Text>
            <Text style={styles.TextViewStyle}>Divider</Text>
            <Text style={styles.TextViewStyle}>Header</Text>
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


        // <View style={{ width: 80, height: 80 }}>
        //   <Image source={{ uri: credentials.logo }} style={{ width: '100%', height: '100%' }} />
        // </View>
        // <Text>{"\n"}{"\n"}{"\n"}Saludos {username}!{"\n"}Has entrado!</Text>
        // </View>
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
    fontSize: 18,
    textAlign: 'center',
  },

  TextViewStyle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    margin: 5,
    padding: 7,
  },
});


