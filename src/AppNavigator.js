import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import Login from './pages/Login';
import Home from './pages/Home';
import Wait from './pages/Wait';

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
            header: null,
        },
    },
});

const App = createAppContainer(AppNavigator);

export default App;