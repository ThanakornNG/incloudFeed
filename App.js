import React, { Component } from 'react'
import { Text, View } from 'react-native'
import HomeScreen from './src/HomeScreen';
import RegisterScreen from './src/RegisterScreen';
import AppNavigator from './src/AppNavigator';

export default class App extends Component {
  constructor(props) {
    super(props)
    console.disableYellowBox = true
    this.state = {
       
    }
  }
  
  render() {
    return (
      <AppNavigator/>
    )
  }
}
