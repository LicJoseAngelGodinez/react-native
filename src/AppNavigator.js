import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import Login from './pages/Login';
import Home from './pages/Home';
import Wait from './pages/Wait';
import Integrations from './pages/Integrations';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

import Entities from 'html-entities';

const entities = new Entities.AllHtmlEntities();

const AppNavigator = createStackNavigator({
    Wait: {
        screen: Wait,
        navigationOptions: {
            header: null,
        },
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        },
    },
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Menu',
            header: null,
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#7b1fa2',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    },
    Integrations: {
        screen: Integrations,
        navigationOptions: {
            title: entities.decode('Tokens de Integraci&oacute;n'),
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#fff',
                paddingBottom: vh(3),
                marginBottom: vh(1),
            },
            headerTintColor: '#7b1fa2',
        },
    },
});

const App = createAppContainer(AppNavigator);

export default App;