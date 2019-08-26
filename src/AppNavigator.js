import React, { Component } from "react";
import { Image } from "react-native";

import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import HomeScreen from "./HomeScreen";
import RegisterScreen from "./RegisterScreen";
import JSONFeedScreen from "./JSONFeedScreen";
import YoutubeScreen from "./YoutubeScreen";

const AppStack = createStackNavigator(
  {
    Tabs: {
      screen: JSONFeedScreen,
      navigationOptions: {
        headerTitle: "JSON",
        headerStyle: { backgroundColor: "#339CED" },
        headerTitleStyle: { color: "#fff" }
      }
    },
    Youtube: { screen: YoutubeScreen }
  },
  { initialRouteName: "Tabs" }
);

const AuthenStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Register: { screen: RegisterScreen }
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthenScene: AuthenStack,
      AppScene: AppStack
    },
    { initialRouteName: "AuthenScene" }
  )
);
