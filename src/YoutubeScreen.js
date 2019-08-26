import React, { Component } from 'react';
import { View, Text, StyleSheet, PixelRatio, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import YouTube from 'react-native-youtube';

class YoutubeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { youtubeID: "", youtubeTitle: "" };
        
    }
    
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("item").title,
            headerStyle: {
                backgroundColor: "#339CED"
              },
              headerTintColor: "#FFFFFF",
              headerTitleStyle: { color: "#fff" },
              headerBackTitle: " "
        }
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            youtubeID: nextProps.navigation.getParam("item").id,
            youtubeTitle: nextProps.navigation.getParam("item").title
        };
    }

    render() {
        return (
            <View>
                <YouTube
                    apiKey="YOUR_API_KEY"   // required for android 
                    videoId={this.state.youtubeID}    // The YouTube video ID
                    play={true}             // control playback of video with true/false
                    fullscreen={true}       // control whether the video should play in fullscreen or inline
                    loop={true}             // control whether the video should loop when ended

                    onReady={e => this.setState({ isReady: true })}
                    onChangeState={e => this.setState({ status: e.state })}
                    onChangeQuality={e => this.setState({ quality: e.quality })}
                    onError={e => this.setState({ error: e.error })}

                    style={{ alignSelf: 'stretch', height: 300 }}
                />

            </View >
        );
    }
}


export default YoutubeScreen;
