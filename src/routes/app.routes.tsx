import React from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { Home } from '../screens/Home'
import { Perfil } from '../screens/Perfil'
import { Ofertas } from '../screens/Ofertas'
import { Procurar } from '../screens/Procurar'
import { Carrinho } from '../screens/Carrinho'
import { InfosDadosPessoais } from '../screens/InfosDadosPessoais'

import Cart from '../../assets/svgs/cart.svg'
import HomeIcon from '../../assets/svgs/Home-m.svg'
import PerfilIcon from '../../assets/svgs/perfil.svg'
import Search from '../../assets/svgs/search-prod.svg'
import { InfosEndereco } from '../screens/InfosEndereco'
import { InfosPagamento } from '../screens/InfosPagamento'
import SecoesList from '../screens/SecoesList'


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
                    fontFamily: 'Manrope-SemiBold', fontSize: 10, color: '#000'
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
                      fontFamily: 'Manrope-SemiBold', fontSize: 10, color: '#A3A3A3'
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
                    fontFamily: 'Manrope-SemiBold', fontSize: 10, color: '#000'
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
                      fontFamily: 'Manrope-SemiBold', fontSize: 10, color: '#A3A3A3'
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
                    fontFamily: 'Manrope-SemiBold', fontSize: 10, color: '#000'
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
                      fontFamily: 'Manrope-SemiBold', fontSize: 10, color: '#A3A3A3'
                    }}>
                      
                      Carrinho
                    </Text>
                  </View>
                )
            )
          }}
        />
        <Tab.Screen 
          name="Perfil" 
          component={Perfil}
          options={{
            tabBarIcon: ({ focused }) => (
              focused ? (
                <View style={{
                  width: '100%',
                  paddingTop: 10,
                  paddingBottom: 10,
                  height: '100%', alignItems: 'center', justifyContent: 'center'
                }}>
                  <PerfilIcon/>
                  <Text style={{
                    fontFamily: 'Manrope-SemiBold', fontSize: 10, color: '#000'
                  }}>
                    Perfil
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
                    <PerfilIcon/>
                    <Text style={{
                      fontFamily: 'Manrope-SemiBold', fontSize: 10, color: '#A3A3A3'
                    }}>
                      
                      Perfil
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
      <Screen 
        name="InfosDadosPessoais" 
        component={InfosDadosPessoais}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Screen 
        name="InfosEndereco" 
        component={InfosEndereco}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Screen 
        name="InfosPagamento" 
        component={InfosPagamento}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Screen 
        name="SecoesList" 
        component={SecoesList}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Navigator>
  )
}