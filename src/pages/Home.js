import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Home extends React.Component {

  static navigationOptions = () => ({
    headerTintColor: 'white',
    title: 'Inicio',
    headerTitleStyle : {
      textAlign: 'center',
      alignSelf:'center',
      color: 'white'
    },
    headerStyle:{
      backgroundColor:'#7b1fa2',
    },
    });

  render() {
    return (
      <View style={styles.container}>
          <Text>Has entrado!</Text>
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
