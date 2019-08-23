import React from 'react';
import { StyleSheet, Text, View, AppState, Alert, } from 'react-native';

import AppNavigator from './src/AppNavigator';

export default class App extends React.Component {

  state = {
    appState: AppState.currentState,
  };
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App State: ' + 'App has come to the foreground!');
      Alert.alert('App State: ' + 'App has come to the foreground!');
    }
    console.log('App State: ' + nextAppState);
    Alert.alert('App State: ' + nextAppState);
    this.setState({ appState: nextAppState });
  };

  render() {
    return (
      <AppNavigator/>
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
