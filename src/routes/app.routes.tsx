import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, View } from 'react-native'

import { Ofertas } from '../screens/Ofertas'
import { Home } from '../screens/Home'
import { Carrinho } from '../screens/Carrinho'
import { Procurar } from '../screens/Procurar'

import Cart from '../../assets/svgs/cart.svg'
import HomeIcon from '../../assets/svgs/Home-m.svg'
import Search from '../../assets/svgs/search-prod.svg'

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
                  <HomeIcon/>
                  <Text style={{
                    fontFamily: 'Inter-SemiBold', fontSize: 10, color: '#000'
                  }}>
                    Inicío
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
                    <HomeIcon/>
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
        <Tab.Screen 
          name="Procurar" 
          component={Procurar}
          options={{
            tabBarIcon: ({ focused }) => (
              focused ? (
                <View style={{
                  width: '100%',
                  paddingTop: 10,
                  paddingBottom: 10,
                  height: '100%', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Search/>
                  <Text style={{
                    fontFamily: 'Inter-SemiBold', fontSize: 10, color: '#000'
                  }}>
                    Procurar
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
                    <Search />
                    <Text style={{
                      fontFamily: 'Inter-SemiBold', fontSize: 10, color: '#A3A3A3'
                    }}>
                      
                      Procurar
                    </Text>
                  </View>
                )
            )
          }}
        />
        <Tab.Screen 
          name="Carrinho" 
          component={Carrinho}
          options={{
            tabBarIcon: ({ focused }) => (
              focused ? (
                <View style={{
                  width: '100%',
                  paddingTop: 10,
                  paddingBottom: 10,
                  height: '100%', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Cart/>
                  <Text style={{
                    fontFamily: 'Inter-SemiBold', fontSize: 10, color: '#000'
                  }}>
                    Carrinho
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
                    <Cart/>
                    <Text style={{
                      fontFamily: 'Inter-SemiBold', fontSize: 10, color: '#A3A3A3'
                    }}>
                      
                      Carrinho
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