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
  ActivityIndicator,
  RefreshControl,
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
      credentials: null,
      tkSesion: null,
      isLoading: true,
      dataTokens: {},
    };
    this.loadCredentials();
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  async loadCredentials() {
    try {
      const credentials = await AsyncStorage.getItem('userData');
      const dataTokens = await AsyncStorage.getItem('dataTokens');
      this.setState({ credentials: JSON.parse(credentials) });
      this.setState({tkSesion: this.state.credentials.tkSesion});
      this.setState({ username: this.state.credentials.nombre + ' ' + this.state.credentials.apellidos });
      if ( dataTokens != null ) {
        this.setState({dataTokens: JSON.parse(dataTokens)});
        this.ShowHideActivityIndicator();
      } else {
        this.loadTokens();
      }
    }
    catch (error) {
      // Manage error handling
    }
  }

  ShowHideActivityIndicator = () => {

    if (this.state.isLoading == true) {
      this.setState({ isLoading: false });

    }
    else {
      this.setState({ isLoading: true });
    }

  }

  loadTokens = () => {
    const { tkSesion } = this.state;

    this.ShowHideActivityIndicator();

    let urlIntegracion = 'https://api.salesup.com/integraciones?pagina=0';
    let formData = new FormData();

    formData.append("pagina", 0);

    let dataHeader = {
      method: 'GET',
      headers: {
        "token": tkSesion
      }
    };

    fetch(urlIntegracion, dataHeader)
      .then((response) => response.json())
      .then((responseJson) => {
        if ( responseJson ) {
          let dataTemp = responseJson.filter(function(item){ 
            return item.tipoIntegracion == 7 || item.tipoIntegracion == 8; 
          });
          
          console.log({response: dataTemp.length});
          AsyncStorage.setItem('dataTokens', JSON.stringify(dataTemp));
          this.setState({dataTokens: dataTemp});
          this.ShowHideActivityIndicator();

        } else {
          this.ShowHideActivityIndicator();
          Alert.alert('Acceso', entities.decode('El usuario y/o contrase&ntilde;a no es correcto.'));
          return false;
        }
      })
      .catch((error) => {
        Alert.alert(entities.decode('Error'), entities.decode('Al parecer hay un problema, revisa tu acceso a datos o la conexi&oacute;n inal&aacute;mbrica.'));
      });
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {

    this.props.navigation.navigate('Home');
    return true;

  }

  toast = (buttonId) => {    
    ToastAndroid.showWithGravityAndOffset(
      buttonId,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    
    const { dataTokens } = this.state;

    if (!this.state.isLoading && dataTokens.length > 0) {
  
      
      return (
        <View style={styles.MainContainer}>
          
          <ScrollView
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={this.loadTokens}
              />
            }
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.AnimatedHeaderValue } } },
            ])}>
            {
              dataTokens.map( element => {
                return (
                  <TouchableOpacity key={element.indice} style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => this.toast(element.config.nombre ? element.config.nombre +' / '+element.tkIntegracion : element.tkIntegracion)}>
 
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Image 
                  source={require('../../assets/mainMenuIcons/icon07-64.png')} 
                  style={styles.ImageIconStyle} 
                  />
                </View>
                <View style={{paddingTop: 3, flex: 1, paddingRight: 10 }}>
                  <Text style={{textAlign: 'right', fontSize: 18}}>{element.config.nombre ? element.config.nombre : '- Sin nombre -'}</Text>
                  <Text style={{textAlign: 'right', fontSize: 12, fontStyle: 'italic'}}>{element.tkIntegracion}</Text>
                </View>
              </View>
      
            </TouchableOpacity>
                );
              })
            }
          </ScrollView>

        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#7b1fa2" style={{ padding: 20 }} />
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

  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#7b1fa2',
    height: 60,
    borderRadius: 3 ,
    margin: 4,   
  },
   
  ImageIconStyle: {
     padding: 20,
     margin: 5,
     height: 40,
     width: 40,
     resizeMode : 'stretch',
   
  },
   
  TextStyle :{
   
    fontSize: vmax(2.5),
    color: "#7b1fa2",
    marginBottom : 4,
    marginRight :20,
    
  },
});


