import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppRoutes } from './app.routes'
import { NavigationContainer } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import { Login } from '../screens/Login'

export function Routes() {

  const [user, setUser] = useState();

  // Handle user state changes
  //@ts-ignore
  function onAuthStateChanged(user) {
    setUser(user)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [])

  return (
    <NavigationContainer>
      {
        //@ts-ignore
        user ? <AppRoutes /> : <Login/>
      }
      
    </NavigationContainer>
  )
}