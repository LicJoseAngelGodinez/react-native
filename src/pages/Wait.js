import React from  'react';
import { 
    AsyncStorage, 
    Image, 
    View, 
    StyleSheet, 
    Alert, 
    BackHandler,
    ActivityIndicator,
} from 'react-native';

export default class Wait extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            credentials: null,
        }
        this.loadCredentials();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    async loadCredentials() {
        try {
            let credentials = await AsyncStorage.getItem('userData');
            let credentialsObj = JSON.parse(credentials);
            if ( credentialsObj.tkSesion !== null ) {
                //this.props.navigation.navigate('Home');
                this.props.navigation.navigate('Home');
            } else {
                this.props.navigation.navigate('Login');
            }
        } catch (error) {
            this.props.navigation.navigate('Login');
        }
    }

    componentWillMount() {
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonClick
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButtonClick
        );
    }

    handleBackButtonClick() {

        Alert.alert(
            'Cancelar',
            'Desea salir de la aplicación',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Salir',
                    onPress: () => {
                        BackHandler.exitApp();
                        return true;
                    }
                },
            ],
            {
                cancelable: true
            },
        );
        return true;
    }

    render () {
        return (
            <View 
                style={styles.container}
            >
                <ActivityIndicator 
                size="large"
                color="#7b1fa2"
                style={{ padding: 20 }}/>
                <View style={{ width: 80, height: 80 }}>
                    <Image source={require('../../assets/white-simple-logo.jpg')} style={{ width: '100%', height: '100%' }}/>
                </View>
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
