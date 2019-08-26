import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import Login from './pages/Login';
import Home from './pages/Home';
import Wait from './pages/Wait';

const AppNavigator = createStackNavigator({
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
});

const App = createAppContainer(AppNavigator);

export default App;