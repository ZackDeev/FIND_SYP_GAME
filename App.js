import { StyleSheet, Text, View } from 'react-native';


import { Provider } from 'react-redux'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import initializeDatabase from './src/db/db';

import SettingsView from './src/views/settingsView';
import IntroView from './src/views/introView';
import GameView from './src/views/gameView';
import SetOfWordsView from './src/views/setOfWordsView';
import PlayersView from './src/views/playersView';
import { store } from './src/redux/store';


const Stack = createNativeStackNavigator();


  // Call createTables before fetching players
  initializeDatabase.createTables();


export default function App() {
  
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="IntroView" component={IntroView} />
        <Stack.Screen name="SettingsView" component={SettingsView} />
        <Stack.Screen name="GameView" component={GameView} />
        <Stack.Screen name="PlayersView" component={PlayersView} />
        <Stack.Screen name="SetOfWordsView" component={SetOfWordsView} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
