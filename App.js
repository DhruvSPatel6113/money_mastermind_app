import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import RewardScreen from './src/screens/RewardScreen';
import InvestmentCalculatorScreen from './src/screens/InvestmentCalculatorScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0f172a',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 1,
              borderBottomColor: '#1e293b',
            },
            headerTintColor: '#38bdf8',
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
            },
            cardStyle: { backgroundColor: '#090d16' },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Money Mastermind' }} 
          />
          <Stack.Screen 
            name="Game" 
            component={GameScreen} 
            options={{ title: 'Financial Arena' }} 
          />
          <Stack.Screen 
            name="Calculator" 
            component={InvestmentCalculatorScreen} 
            options={{ title: 'SIP & Compound Calculator' }} 
          />
          <Stack.Screen 
            name="Leaderboard" 
            component={LeaderboardScreen} 
            options={{ title: 'Global Leaderboard' }} 
          />
          <Stack.Screen 
            name="Rewards" 
            component={RewardScreen} 
            options={{ title: 'Achievements & Badges' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
