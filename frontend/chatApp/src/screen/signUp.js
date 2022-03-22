import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import chatApi from '../api/chatApi';
import icon from '../contents/icon';
const SignUp = (props) => {
  const [user, setUser] = React.useState({
    username: '',
    email: '',
    password: ''
  })
  const SignUpUser = async () => {
    try {
      const response = await chatApi.post('/user', user)
      console.log(response)
      props.navigation.navigate('SignIn')
    } catch (e) {
      console.log(e.response.data)
    }
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'

      }}>
      <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={icon.comments} style={{ width: 200, height: 200 }} />
      </View>
      <View style={{ flex: 2, margin: 20 }}>
        <View style={{ margin: 10 }}>
          <Text >UserName</Text>
          <TextInput onChangeText={(val) => setUser({ ...user, username: val })} style={{ width: '100%', height: 40, borderBottomWidth: 2, padding: 5, }} />
        </View>
        <View style={{ margin: 10 }}>
          <Text >Email</Text>
          <TextInput onChangeText={(val) => setUser({ ...user, email: val })} style={{ width: '100%', height: 40, borderBottomWidth: 2, padding: 5, }} />
        </View>
        <View style={{ margin: 10 }}>
          <Text >password</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '90%' }}>
              <TextInput
                secureTextEntry={true}
                onChangeText={(val) => setUser({ ...user, password: val })}
                style={{ width: '100%', height: 40, borderBottomWidth: 2, padding: 5, }} />
            </View>
            <TouchableOpacity style={{ width: '10%' }}>
              <Image source={icon.eye} style={{ width: 35, height: 35 }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ margin: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => SignUpUser()} style={{ width: '50%', backgroundColor: '#4A48E7', height: 45, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, color: 'white' }}>SignUp</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
};

export default SignUp;
