import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SignIn from '../screen/signIn';
import SignUp from '../screen/signUp';
import ChatDetails from '../screen/chatDetails';
import ChatList from '../screen/chatList';
import { getJWTToken } from '../redux/helper';
const Stack = createNativeStackNavigator();
const Router = () => {
    const [token, setToken] = React.useState('');
    const getData = async () => {
        try {
            const value = await getJWTToken()
            if (value !== null) {
                setToken(value)
            }
        } catch (e) {
            console.log(e);
        }
    }
    React.useEffect(() => {
        getData()

    }, [])
    return (
        <NavigationContainer>

            < Stack.Navigator >
                {token ?
                    <><Stack.Screen name='ChatList' component={ChatList} />
                        <Stack.Screen name='ChatDetails' component={ChatDetails} />
                    </>
                    :
                    <>
                        <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />
                        <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />

                    </>}
            </Stack.Navigator >
        </NavigationContainer >

    )
}

export default Router