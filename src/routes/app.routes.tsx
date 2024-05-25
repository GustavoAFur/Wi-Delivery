import React from 'react'
import { Image, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { Home } from '../screens/Home'
import { Perfil } from '../screens/Perfil'
import { Ofertas } from '../screens/Ofertas'
import { Procurar } from '../screens/Procurar'
import { Carrinho } from '../screens/Carrinho'
import { InfosDadosPessoais } from '../screens/InfosDadosPessoais'

import IconShop from '../../assets/images/shop-icon.png'
import IconSearch from '../../assets/images/icons8-search-100.png'
import PerfilIcon from '../../assets/images/icons8-usuário-100.png'

import HomeFocused from '../../assets/images/home-focused.png'
import HomeUnfocused from '../../assets/images/home-unfocused.png'
import SearchFocused from '../../assets/images/search-focused.png'
import SearchUnfocused from '../../assets/images/search-unfocused.png'
import CartUnfocused from '../../assets/images/cart-unfocused.png'
import CartFocused from '../../assets/images/cart-focused.png'
import ProfileFocused from '../../assets/images/profile-focused.png'
import ProfileUnfocused from '../../assets/images/profile-unfocused.png'

import HomeIcon from '../../assets/svgs/Home-m.svg'
import { InfosEndereco } from '../screens/InfosEndereco'
import { InfosPagamento } from '../screens/InfosPagamento'
import SecoesList from '../screens/SecoesList'
import ProdutosPorCategoria from '../screens/ProdutosPorCategoria'
import { useAuth } from '../hooks/auth'
import { SelecionarKit } from '../screens/SelecionarKit'
import DetalhesProduto from '../screens/DetalhesProduto'
import DetalhesKit from '../screens/DetalhesKit'


export function AppRoutes() {

  const { Navigator, Screen } = createStackNavigator()

  const { kitsCarrinho, setKitsCarrinho } = useAuth()

  function TabNavigation() {

    const Tab = createBottomTabNavigator()

    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={() => ({
          tabBarStyle: {
            right: 10,
            left: 10,
            position: 'absolute',
            height: 65,
            borderRadius: 20,
            backgroundColor: '#FFFFFF', //F6F6F7
            bottom: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderTopColor: '#F1F1F1',
            borderTopWidth: 0.8,
            shadowColor: "#0005",
            shadowOffset: {
              width: 0,
              height: 11,
            },
            shadowOpacity: 0.23,
            shadowRadius: 11.78,
            elevation: 15
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
                  height: '100%',
                  paddingVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <Image
                    source={HomeFocused}
                    resizeMode='contain'
                    style={{
                      width: 32,
                      height: 32,
                    }} />
                  <Text style={{
                    fontFamily: 'GeneralSans-Semibold', fontSize: 10, color: '#000'
                  }}>
                    Inicío
                  </Text>
                </View>
              ) :
                (
                  <View style={{
                    height: '100%',
                    paddingVertical: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <Image
                      source={HomeUnfocused}
                      resizeMode='contain'
                      style={{
                        width: 32,
                        height: 32,
                      }} />
                    <Text style={{
                      fontFamily: 'GeneralSans-Semibold', fontSize: 10, color: '#A3A3A3'
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
                  height: '100%',
                  paddingVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <Image
                    source={SearchFocused}
                    resizeMode='contain'
                    style={{
                      width: 32,
                      height: 32,
                    }} />
                  <Text style={{
                    fontFamily: 'GeneralSans-Semibold', fontSize: 10, color: '#000'
                  }}>
                    Procurar
                  </Text>
                </View>
              ) :
                (
                  <View style={{
                    height: '100%',
                    paddingVertical: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <Image
                      source={SearchUnfocused}
                      resizeMode='contain'
                      style={{
                        width: 32,
                        height: 32,
                      }} />
                    <Text style={{
                      fontFamily: 'GeneralSans-Semibold', fontSize: 10, color: '#A3A3A3'
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
                  height: '100%',
                  paddingVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  {
                    kitsCarrinho.length > 0 && (
                      <View
                        style={{
                          backgroundColor: '#D9042B',
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          zIndex: 3,
                          position: 'absolute',
                          top: 5,
                          right: 0,
                          borderColor: '#fff',
                          borderWidth: 2,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Text style={{
                          fontSize: 10,
                          color: '#fff',
                          fontFamily: 'GeneralSans-Semibold',
                        }}>
                          {kitsCarrinho.length}
                        </Text>
                      </View>
                    )
                  }
                  <Image
                      source={CartFocused}
                      resizeMode='contain'
                      style={{
                        width: 32,
                        height: 32,
                      }} />
                  <Text style={{
                    fontFamily: 'GeneralSans-Semibold', fontSize: 10, color: '#000'
                  }}>
                    Carrinho
                  </Text>
                </View>
              ) :
                (
                  <View style={{
                    height: '100%',
                    paddingVertical: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    {
                      kitsCarrinho.length > 0 && (
                        <View
                          style={{
                            backgroundColor: '#D9042B',
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            zIndex: 3,
                            position: 'absolute',
                            top: 5,
                            right: 0,
                            borderColor: '#fff',
                            borderWidth: 2,
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <Text style={{
                            fontSize: 10,
                            color: '#fff',
                            fontFamily: 'GeneralSans-Semibold',
                          }}>
                            {kitsCarrinho.length}
                          </Text>
                        </View>
                      )
                    }
                    <Image
                      source={CartUnfocused}
                      resizeMode='contain'
                      style={{
                        width: 32,
                        height: 32,
                      }} />
                    <Text style={{
                      fontFamily: 'GeneralSans-Semibold', fontSize: 10, color: '#A3A3A3'
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
                  height: '100%',
                  paddingVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <Image
                      source={ProfileFocused}
                      resizeMode='contain'
                      style={{
                        width: 32,
                        height: 32,
                      }} />
                  <Text style={{
                    fontFamily: 'GeneralSans-Semibold', fontSize: 10, color: '#000'
                  }}>
                    Perfil
                  </Text>
                </View>
              ) :
                (
                  <View style={{
                    height: '100%',
                    paddingVertical: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <Image
                      source={ProfileUnfocused}
                      resizeMode='contain'
                      style={{
                        width: 32,
                        height: 32,
                      }} />
                    <Text style={{
                      fontFamily: 'GeneralSans-Semibold', fontSize: 10, color: '#A3A3A3'
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
      <Screen name="SelecionarKit" component={SelecionarKit} />
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

      <Screen
        name="ProdutosPorCategoria"
        component={ProdutosPorCategoria}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Screen
        name="DetalhesKit"
        component={DetalhesKit}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Screen
        name="DetalhesProduto"
        component={DetalhesProduto}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Navigator>
  )
}