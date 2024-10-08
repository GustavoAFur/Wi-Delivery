import React, { useEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { useCart } from '../cart/CartContext'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import { Home } from '../screens/Home'
import { Profile } from '../screens/Profile'
import { Orffers } from '../screens/Orffers'
import { SearchScreen } from '../screens/SearchScreen'
import { Cart } from '../screens/Cart'
import { InfoPersonalDetails } from '../screens/InfoPersonalDetails'

import HomeFocused from '../../assets/images/home-focused.png'
import HomeUnfocused from '../../assets/images/home-unfocused.png'
import SearchFocused from '../../assets/images/search-focused.png'
import SearchUnfocused from '../../assets/images/search-unfocused.png'
import CartUnfocused from '../../assets/images/cart-unfocused.png'
import CartFocused from '../../assets/images/cart-focused.png'
import ProfileFocused from '../../assets/images/profile-focused.png'
import ProfileUnfocused from '../../assets/images/profile-unfocused.png'

import { InfoAdress } from '../screens/InfoAdress'
import { InfoPayment } from '../screens/InfoPayment'
import SecoesList from '../screens/SecoesList'
import ProductsByCategory from '../screens/ProductsByCategory'
import { useAuth } from '../hooks/auth'
import { SelectKit } from '../screens/SelectKit'
import ProductDetails from '../screens/ProductDetails'
import KitDetails from '../screens/KitDetails'
import { SignIn } from '../screens/SignIn'
import { InserirDadosInfo } from '../screens/InserirDadosInfo'
import { MyDetails } from '../screens/MyDetails'
import { AdressDetails } from '../screens/AdressDetails'
import { SignUp } from '../screens/SignUp'
import { CustomWebView } from '../screens/CustomWebView'
import { About } from '../screens/About'
import { Help } from '../screens/Help'
import { Cadastros } from '../screens/Cadastros'
import { SeeMoreHighlights } from '../screens/SeeMoreHighlights'
import { MyOrders } from '../screens/MyOrders'

export function AppRoutes() {

  const { Navigator, Screen } = createStackNavigator()

  const { kitsCart } = useAuth()
  const { products } = useCart()

  const [isComplete, setIsComplete] = useState<boolean | null>(true)

  useEffect(() => {
    const currentUser = auth().currentUser;
    let unsubscribe: (() => void) | null = null;

    if (currentUser) {
      const userDocRef = firestore()
        .collection('users')
        .doc(currentUser.uid);

      unsubscribe = userDocRef.onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          const userData = documentSnapshot.data()

          if (userData?.completo === false) {
            setIsComplete(false)
            console.log('Usuário incompleto:', userData)
          } else {
            setIsComplete(true)
            console.log('Usuário completo')
          }
        } else {
          console.log('Documento do usuário não encontrado')
        }
      }, error => {
        console.error('Erro ao obter documento do usuário:', error)
      })
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  function TabNavigation() {

    const Tab = createBottomTabNavigator()

    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={() => ({
          tabBarStyle: {
            keyboardHidesTabBar : true,
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
          name="SearchScreen"
          component={SearchScreen}
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
          name="Cart"
          component={Cart}
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
                    products.length > 0 && (
                      <View
                        style={{
                          backgroundColor: '#D9042B',
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          zIndex: 3,
                          position: 'absolute',
                          top: 5,
                          right: -5,
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
                          {products.length}
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
                    Cart
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
                      products.length > 0 && (
                        <View
                          style={{
                            backgroundColor: '#D9042B',
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            zIndex: 3,
                            position: 'absolute',
                            top: 5,
                            right: -5,
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
                            {products.length}
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

                      Cart
                    </Text>
                  </View>
                )
            )
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
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
                    Profile
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

                      Profile
                    </Text>
                  </View>
                )
            )
          }}
        />

      </Tab.Navigator>
    )
  }

  if (isComplete) {
    return (
      <Navigator
        initialRouteName="TabNavigation"
        screenOptions={{
          headerShown: false,
        }}>

        <Screen name="TabNavigation" component={TabNavigation} />
        <Screen name="Home" component={Home} />
        <Screen name="SelectKit" component={SelectKit} />
        <Screen name="Cadastros" component={Cadastros} />
        <Screen
          name="SeeMoreHighlights"
          component={SeeMoreHighlights}
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
          name="ProductsByCategory"
          component={ProductsByCategory}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />

        <Screen
          name="KitDetails"
          component={KitDetails}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />

        <Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Screen
          name="MyDetails"
          component={MyDetails}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Screen
          name="AdressDetails"
          component={AdressDetails}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Screen
          name="CustomWebView"
          component={CustomWebView}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Screen
          name="About"
          component={About}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Screen
          name="Help"
          component={Help}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Screen
          name="MyOrders"
          component={MyOrders}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
      </Navigator>
    )

  } else {
    return (
      <Navigator
        initialRouteName="InfoPersonalDetails"
        screenOptions={{
          headerShown: false,
        }}>
        <Screen
          name="InserirDadosInfo"
          component={InserirDadosInfo}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Screen
          name="InfoPersonalDetails"
          component={InfoPersonalDetails}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Screen
          name="InfoAdress"
          component={InfoAdress}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Screen
          name="InfoPayment"
          component={InfoPayment}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
      </Navigator>
    )
  }


}