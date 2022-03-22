import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import chatApi from '../api/chatApi';
import icon from '../contents/icon';
import { getJWTToken } from '../redux/helper';
const ChatList = (props) => {
  const [chatList, setChatList] = React.useState([])
  const fetchData = async () => {
    try {
      const token = await getJWTToken()

      const response = await chatApi.get('/user', { headers: { Authorization: `Bearer ${token}` } });
      // console.log(response.data.user)
      setChatList(response.data.user)
    } catch (e) {
    }
  }
  React.useEffect(() => {
    fetchData()
  }, [])
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white'

    }}>
      <FlatList data={chatList} renderItem={(item) => (
        <TouchableOpacity style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 20 }} onPress={() => { props.navigation.navigate('ChatDetails', { item: item.item._id }) }}>
          <View style={{ width: '20%' }}>
            <Image source={icon.man} style={{ width: 70, height: 70 }} />
          </View>
          <View style={{ justifyContent: 'center', borderBottomWidth: 1, width: '80%', paddingBottom: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: 2, marginLeft: 10 }}>{item.item.username}</Text>
          </View>


        </TouchableOpacity>)} />
    </View>
  );
};

export default ChatList;
