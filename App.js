

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Gamescreen from './screens/gamescreen';
import Homescreen from './screens/homescreen';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="homescreen">
        <Stack.Screen name="homescreen" component={Homescreen} options={{ headerShown: false }} />
        <Stack.Screen name="gamescreen" component={Gamescreen} options={{ headerShown: false }} />
        


      </Stack.Navigator>
    </NavigationContainer>
  );
}