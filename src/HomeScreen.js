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

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  async componentDidMount() {
    let isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    if (isLoggedIn != null && isLoggedIn == "yes") {
      //auto fill user name pass
      let regUsername = await AsyncStorage.getItem("username");
      let regPassword = await AsyncStorage.getItem("password");
      this.setState({
        username: regUsername,
        password: regPassword
      });
    }
  }

  onClickLoginBtn = async () => {
    let regUsername = await AsyncStorage.getItem("username");
    let regPassword = await AsyncStorage.getItem("password");

    //Destructuring

    const { username, password } = this.state;
    if (username != regUsername) {
      //invalid user
      alert("Invalid Username");
    } else if (password != regPassword) {
      //invalid password
      alert("Invalid Password");
    } else {
      //success
      await AsyncStorage.setItem("isLoggedIn", "yes");
      this.props.navigation.navigate("AppScene");
    }
  };

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
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Icon
              name="user"
              size={40}
              style={{ width: 40 }}
              color="#0008"
            />
            <TextInput
              value={this.state.username}
              autoCapitalize="none"
              onChangeText={text => this.setState({ username: text })}
              style={{
                flex: 1,
                borderColor: "#0005",
                borderWidth: 1,
                marginLeft: 16,
                height: 40,
                borderRadius: 5,
                paddingLeft: 8
              }}
              placeholder="Username"
            />
          </View>
          {/* Password section */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              marginTop: 8
            }}
          >
            <Icon
              name="lock"
              size={40}
              style={{ width: 40 }}
              color="#0008"
            />
            <TextInput
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={text => this.setState({ password: text })}
              style={{
                flex: 1,
                borderColor: "#0005",
                borderWidth: 1,
                marginLeft: 16,
                height: 40,
                borderRadius: 5,
                paddingLeft: 8
              }}
              placeholder="Password"
            />
          </View>
          {/* Login Button  */}
          <TouchableOpacity
            onPress={this.onClickLoginBtn}
            style={{
              backgroundColor: "#0096FB",
              height: 35,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 3,
              marginTop: 16
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
          </TouchableOpacity>
          {/* Register Button  */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Register")}
            style={{
              backgroundColor: "#0096FB20",
              height: 35,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 3,
              marginTop: 8
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
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

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Home",
    headerStyle: {
      backgroundColor: "#119CED"
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: { color: "#fff" },
    headerBackTitle: " ",
    headerRight: (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={async () => {
          await AsyncStorage.removeItem("isLoggedIn");
        }}
        style={{ padding: 10 }}
      >
        <Text style={{ color: "white" }}>Logout</Text>
      </TouchableOpacity>
    )
  };
};
