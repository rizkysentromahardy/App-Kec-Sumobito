import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Home,Form,Splash} from '../tampilan';

const Stack = createStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name="form" component={Form} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;