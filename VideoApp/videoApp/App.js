import { View, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Video from 'react-native-video';
const data = require('./data.mp4')
const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      <Video source={{ uri: 'https://media.istockphoto.com/videos/elementary-school-kids-run-from-camera-in-school-corridor-video-id1071486906' }}
        style={styles.img} audioOnly={true} duration={2} />
    </View>
  )
}
const styles = StyleSheet.create({
  img: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,


  },
});
export default App