import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './Pages/Login'
import Details from "./Pages/Details"
import SignUp from './Pages/SignUp'
import Categories from './Pages/Categories'
import Variaites from './Pages/Variaites'

const App = () => {

    const Stack = createNativeStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Categories' screenOptions={{headerShown:false}}>
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
          <Stack.Screen name="Details" component={Details}></Stack.Screen>
          <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
          <Stack.Screen name="Categories" component={Categories}></Stack.Screen>
          <Stack.Screen name="Variaites" component={Variaites}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default App

const styles = StyleSheet.create({})