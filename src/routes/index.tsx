import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppRoutes } from './app.routes'
import { NavigationContainer } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import { SplashScreen } from '../screens/SplashScreen'
import { useAuth } from '../hooks/auth'
import { AccountUser } from './AccountUser.routes'

export function Routes() {

  const [user, setUser] = useState('')

  const [splashScreen, setSplashScreen] = useState(true)
  // Handle user state changes
  //@ts-ignore
  function onAuthStateChanged(user) {
    setUser(user)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [])

  setTimeout(() => {
    setSplashScreen(false)
  }, 3000)

  return (
    <NavigationContainer>
      {
        //@ts-ignore
      splashScreen ? <SplashScreen/> : ( user ? <AppRoutes /> : <AccountUser/>)
      }
    </NavigationContainer>
  )
}