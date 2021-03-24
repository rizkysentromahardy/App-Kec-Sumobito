import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Home,Form,Splash,Chatting} from '../view';


const Stack = createStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash"
      headerMode={'none'} >
        <Stack.Screen name="chatting" component={Chatting} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name="form" component={Form} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;