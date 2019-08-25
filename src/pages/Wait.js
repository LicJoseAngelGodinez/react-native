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
            logo: 'https://s3-eu-west-1.amazonaws.com/cdn.supporthero.io/article/323/56a919b5-2be9-4cc6-adb9-c89b4693a74e.jpg'
        }
        this.loadCredentials();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    async loadCredentials() {
        try {
            const credentials = await AsyncStorage.getItem('userData');
            if ( this.state.credentials.tkSesion ) {
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
        const { logo } = this.state;
        return (
            <View 
                style={styles.container}
            >
                <View style={{ width: '70%' }}>
                    <Image source={{uri: logo}} style={{ width: '100%' }} />
                </View>
                <View 
                    style={styles.container}
                >
                    <ActivityIndicator 
                    size="large"
                    color="#7b1fa2"
                    style={{ padding: 20 }}/>
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
