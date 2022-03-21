import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { io } from 'socket.io-client'
const App = () => {
  const socket = io('http://192.168.200.123:4000');
  //const socket = io("http://localhost:5000");
  socket.on('welcome', (data) => {
    //console.log(data)
  })
  const [roomData, setRoomData] = React.useState([])
  const [message, setMessage] = React.useState('');
  React.useEffect(() => {
    socket.on("message", (messageData) => {
      setRoomData(messageData);
    })
    console.log(roomData)
  }, [setRoomData])
  const sendMessage = () => {
    socket.emit("sendMessage", { room: 'Native', message })
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <FlatList
        data={roomData} renderItem={(item) => (<View style={{ marginTop: 40 }}><Text>{item.item.message}</Text></View>)}
      />
      <View style={{
        position: 'absolute', bottom: 0,
        height: 100, width: '100%', borderWidth: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
      }}>
        <View style={{ width: "90%" }}>
          <TextInput style={{ backgroundColor: 'grey', height: 50, marginHorizontal: 10, fontSize: 20, padding: 5 }}
            onChangeText={(value) => setMessage(value)} /></View>
        <TouchableOpacity style={{ width: "10%" }} onPress={() => { sendMessage() }} >
          <Text>
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default App