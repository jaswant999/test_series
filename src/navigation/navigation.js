import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from '../screens/SplashScreen'
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name="SplashScreen"
          options={{ headerShown: false }}
          component={SplashScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={{ headerShown: false }}
          component={SignUp}
        />

        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />

        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation
