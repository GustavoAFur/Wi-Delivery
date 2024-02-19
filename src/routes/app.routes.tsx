import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Home } from '../screens/Home'
import { Text, View } from 'react-native'
import { Ofertas } from '../screens/Ofertas'

export function AppRoutes() {

  const { Navigator, Screen } = createStackNavigator()

  function TabNavigation() {

    const Tab = createBottomTabNavigator()

    return (
      <Tab.Navigator
      initialRouteName="Home"
        screenOptions={() => ({
          tabBarStyle: {
            width: '100%',
            position: 'absolute',
            height: 55,
            borderRadius: 0,
            backgroundColor: '#FFFFFF', //F6F6F7
            elevation: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            borderTopColor: '#F1F1F1',
            borderTopWidth: 0.8,
          },

          headerShown: false,
          tabBarShowLabel: false,
          headerShadowVisible: false,
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              focused ? (
                <View style={{
                  width: '100%',
                  paddingTop: 10,
                  paddingBottom: 10,
                  height: '100%', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Text style={{
                    fontFamily: 'Inter-SemiBold', fontSize: 10, color: '#009c3d'
                  }}>
                    Inicío feferf
                  </Text>
                </View>
              ) :
                (
                  <View style={{
                    width: '100%',
                    paddingTop: 10,
                    paddingBottom: 10,
                    height: '100%', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Text style={{
                      fontFamily: 'Inter-SemiBold', fontSize: 10, color: '#A3A3A3'
                    }}>
                      Inicío
                    </Text>
                  </View>
                )
            )
          }}
        />
      </Tab.Navigator>
    )
  }

  return (
    <Navigator
    initialRouteName="TabNavigation"
    screenOptions={{
      headerShown: false,
    }}>

      <Screen name="TabNavigation" component={TabNavigation} />
      <Screen name="Home" component={Home} />
      <Screen 
        name="Ofertas" 
        component={Ofertas}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Navigator>
  )
}