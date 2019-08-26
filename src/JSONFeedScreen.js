import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Card } from "react-native-elements";

export default class JsonScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      youtubes: []
    };
  }

  componentDidMount() {
    this.feedData();
  }

  onClickItem = item => {
    // alert(JSON.stringify(item));
    this.props.navigation.navigate("Youtube", {item})
  };

  feedData = async () => {
    // let result = await axios.get(
    //   "http://codemobiles.com/adhoc/youtubes/index_new.php?username=admin&password=password&type=foods"
    // );
    // this.setState({ youtubes: result.data.youtubes });

    this.setState({ isFetching: true, youtubes: [] });
    let url = "http://codemobiles.com/adhoc/youtubes/index_new.php";
    let regUsername = await AsyncStorage.getItem("username");
    let regPassword = await AsyncStorage.getItem("password");

    let params = `username=${regUsername}&password=${regPassword}&type=foods`;
    let headers = { "content-type": "application/x-www-form-urlencoded" };
    let response = await axios.post(url, params, { headers });
    this.setState({ youtubes: response.data.youtubes, isFetching: false });
  };

  renderHeader = () => (
    <Image
      source={require("./assets/img/incloud_logo.png")}
      resizeMode="contain"
      style={styles.list_header}
    />
  );

  renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        this.onClickItem(item);
      }}
    >
      <Card containerStyle={styles.listCard}>
        {/* top section */}
        <View style={styles.listCardView}>
          <Image
            source={{ uri: item.avatar_image }}
            style={styles.listAvatar}
          />
          {/* title and subtitle */}
          <View style={styles.listTitleSubtitleContainer}>
            <Text style={styles.listTitle}>{item.title}</Text>
            <Text style={styles.listSubTitle}>{item.subtitle}</Text>
          </View>
        </View>
        {/* bottom section */}
        <Image
          source={{ uri: item.youtube_image }}
          style={styles.listYoutbeImage}
        />
      </Card>
    </TouchableOpacity>
  );

  render() {
    return (
      <ImageBackground
        source={require("./assets/img/bg.png")}
        style={styles.container}
      >
        <FlatList
          refreshing={this.state.isFetching}
          onRefresh={this.feedData}
          style={{ flex: 1 }}
          ListHeaderComponent={this.renderHeader()}
          data={this.state.youtubes}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list_header: {
    width: "100%",
    height: 100
  },
  listCard: {
    overflow: "hidden",
    flexDirection: "column",
    marginBottom: 20,
    borderRadius: 20,
    padding: 0
  },
  listCardView: {
    flexDirection: "row",
    marginBottom: 16,
    height: 45,
    alignItems: "center"
  },
  listAvatar: {
    width: 45,
    height: "100%",
    marginRight: 16
  },
  listTitleSubtitleContainer: {
    flexDirection: "column",
    marginRight: 16,
    flex: 1
  },
  listTitle: {
    fontWeight: "700"
  },
  listSubTitle: {
    fontWeight: "100"
  },
  listYoutbeImage: {
    width: "100%",
    height: 190
  }
});
