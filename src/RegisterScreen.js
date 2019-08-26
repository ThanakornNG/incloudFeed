import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-community/async-storage";

class CMEntry extends Component {
  render() {
    return (
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Icon
          name={this.props.icon}
          size={40}
          style={{ width: 40 }}
          color="#0008"
        />
        <TextInput
          autoCapitalize="none"
          onChangeText={this.props.onChangeValue}
          secureTextEntry={this.props.isPassword}
          keyboardType={this.props.isEmail ? "email-address" : null}
          style={{
            flex: 1,
            borderColor: "#0005",
            borderWidth: 1,
            marginLeft: 16,
            height: 40,
            borderRadius: 5,
            paddingLeft: 8
          }}
          placeholder={this.props.placeholder}
        />
      </View>
    );
  }
}

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: Date.now(),
      username: "",
      password: ""
    };
  }

  onClickRegisterBtn = async () => {
    //alert(JSON.stringify(this.state));
    await AsyncStorage.setItem("username", this.state.username);
    await AsyncStorage.setItem("password", this.state.password);
    this.props.navigation.goBack();
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({ time: Date.now() });
    }, 1000);
  }

  render() {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require("./assets/img/bg.png")}
      >
        <View
          style={{
            backgroundColor: "#FFF7",
            margin: 16,
            padding: 16,
            borderRadius: 5
          }}
        >
          {/* UserName section */}
          <CMEntry
            icon="user"
            placeholder="Username"
            isEmail={true}
            onChangeValue={text => {
              this.setState({ username: text });
            }}
          />
          {/* Password section */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              marginTop: 8
            }}
          >
            <CMEntry
              icon="lock"
              placeholder="Password"
              isPassword
              onChangeValue={text => {
                this.setState({ password: text });
              }}
            />
          </View>
          {/* Register Button  */}
          <TouchableOpacity
            onPress={this.onClickRegisterBtn}
            style={{
              backgroundColor: "#0096FB",
              height: 35,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 3,
              marginTop: 16
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
          </TouchableOpacity>
          {/* Cancel Button  */}
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{
              backgroundColor: "#0096FB20",
              height: 35,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 3,
              marginTop: 8
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <Image
          style={{ height: 100, width: null, marginTop: 16 }}
          resizeMode="contain"
          source={require("./assets/img/incloud_logo.png")}
        />
      </ImageBackground>
    );
  }
}

RegisterScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Register",
    headerStyle: {
      backgroundColor: "#119CED"
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: { color: "#fff" },
    headerBackTitle: " "
  };
};
