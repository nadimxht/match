import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TicketChatScreen from '../screens/TicketChatScreen';
import TicketResultScreen from '../screens/TicketResultScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TicketChat" component={TicketChatScreen} />
      <Stack.Screen name="TicketResult" component={TicketResultScreen} />
    </Stack.Navigator>
  );
}
