import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './Pages/Login'
import Details from "./Pages/Details"
import SignUp from './Pages/SignUp'
import Categories from './Pages/Categories'
import Variaites from './Pages/Variaites'
import MealsFilteredByArea from './Pages/MealsFilteredByArea'
import Profile from './Pages/Profile'
import Favorites from "./Pages/Favorites"

import auth from "@react-native-firebase/auth"

const App = () => {

    const Stack = createNativeStackNavigator();
    
    const [userSession, setUserSession] = React.useState(false)
    React.useEffect(() => {
      auth().onAuthStateChanged(user => {
        setUserSession(!!user)
      })
    })

    if (userSession)
    {
      return (
        <NavigationContainer>
          <Stack.Navigator  screenOptions={{headerShown:false}}>
            <Stack.Screen name="Categories" component={Categories} ></Stack.Screen>
            <Stack.Screen name="Details" component={Details} ></Stack.Screen>
            <Stack.Screen name="Variaites" component={Variaites}  options={{headerShown:Platform.OS === "ios",headerStyle:{backgroundColor:"#494949" }, headerTitle:" "}}></Stack.Screen>
            <Stack.Screen name="MealsFilteredByArea" component={MealsFilteredByArea} options={{headerShown:true, headerStyle:{backgroundColor:"#696969"}, headerTintColor:"white", headerTitle:"Local Meals"}}></Stack.Screen>
            <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
            <Stack.Screen name="Favorites" component={Favorites}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
          <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:true, headerStyle:{backgroundColor:"#292929"} , headerTitle:" "}}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    )
    
}

export default App

const styles = StyleSheet.create({})