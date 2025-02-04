import { View, Text, Dimensions, StatusBar, Image, ScrollView, Pressable, Alert, TouchableOpacity, ScrollViewBase } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import React, { useEffect, useState } from 'react'

import { NavigationProp, useRoute } from '@react-navigation/native'
import { useAuth } from '../hooks/auth'

import ScreenBack from '../../assets/svgs/arrow-right.svg'
import More from '../../assets/svgs/mais-black.svg'
import Less from '../../assets/svgs/menos.svg'

export default function KitDetails({ navigation }: { navigation: any }) {

  const route = useRoute()

  const { width, height } = Dimensions.get("window")

  const { kitsCart, setKitsCart } = useAuth()

  const [qtsItens, setQtdItens] = useState(1)
  //@ts-ignore
  const [imageKit, setImageKit] = useState(route.params.item.images[0])
  const [indexImg, setIndexImg] = useState(1)
  function handleToggleAddCart(value: any, quantidade: number) {
    setKitsCart(prevObjetos => {
      //@ts-ignore
      const objetoExistente = prevObjetos.find(objeto => objeto.id === value.id)

      if (objetoExistente) {
        // Se o objeto já existir, atualize a quantidade
        return prevObjetos.map(objeto =>
          //@ts-ignore
          objeto.id === value.id ? { ...objeto, quantidade: objeto.quantidade + quantidade } : objeto
        )
      } else {
        // Se o objeto não existir, adicione-o com a quantidade especificada
        return [...prevObjetos, { ...value, quantidade }]
      }
    })

    navigation.goBack();
  }


  return (

    <ScrollView
      style={{
        width: width,
        paddingTop: getStatusBarHeight(),
        backgroundColor: '#fff',
      }}
    >
      <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />

      <View style={{
        width: width,
        paddingHorizontal: 20,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
      }}>
        <TouchableOpacity
          style={{
            width: 20,
            height: 20,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: 20
          }}
          onPress={() => {
            //@ts-ignore
            navigation.goBack()
          }}
        >
          <ScreenBack width={20} height={20} />
        </TouchableOpacity>
        <Text style={{
          fontSize: 18,
          alignSelf: 'center',
          color: '#323232',
          fontFamily: 'Manrope-SemiBold'
        }}>
          Detalhes do Kit
        </Text>
      </View>

      <View
        style={{
          width: '94%',
          height: 280,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: 20,
          backgroundColor: '#fff',
          shadowColor: "#9c9a9a",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.24,
          shadowRadius: 15.84,
          elevation: 10
        }}
      >
        <Image
          source={{ uri: imageKit }}
          style={{
            width: '80%',
            height: '80%',
            resizeMode: 'contain'
          }}
        />

        <View
          style={{
            width: 40,
            borderRadius: 10,
            backgroundColor: '#A9A9A9',
            position: 'absolute',
            bottom: 10,
            left: 20,
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              fontFamily: 'Manrope-SemiBold'
            }}
          >
            {/*@ts-ignore*/}
            {indexImg}/{route.params.item.images.length}
          </Text>
        </View>

      </View>


      {
        //@ts-ignore
        route.params.item.images.length > 1 && (
          <ScrollView
            horizontal
            style={{
              width: '100%',
              height: 80,
              marginVertical: 20
            }}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              paddingHorizontal: 20,
            }}
          >
            {
              //@ts-ignore
              route.params.item.images.map((image, index) => (
                <Pressable
                  onPress={() => {
                    setImageKit(image)
                    setIndexImg(index + 1)
                  }}
                  key={index}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    borderColor: imageKit === image ? '#EE2F2A' : '#9c9a9a',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    //@ts-ignore
                    source={{ uri: image }}
                    style={{
                      width: '80%',
                      height: '80%',
                      resizeMode: 'contain'
                    }}
                  />
                </Pressable>
              ))
            }

          </ScrollView>
        )
      }


      <View
        style={{
          width: width,
          paddingHorizontal: 20,
          paddingVertical: 15,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Text style={{
          fontSize: 18,
          color: '#4F4F4F',
          fontFamily: 'GeneralSans-Bold'
        }}>
          {/*@ts-ignore*/}
          {route.params.item.nome}
        </Text>

        <Text style={{
          fontSize: 18,
          color: '#A9A9A9',
          fontFamily: 'GeneralSans-Medium'
        }}>
          {/*@ts-ignore*/}
          R$ {route.params.item.preco}
        </Text>
      </View>

      <View
        style={{
          width: width,
          paddingLeft: 20,
          paddingRight: 20,
          paddingVertical: 15,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        
        <View
          style={{
            flexDirection: 'row',
            width: 120,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (qtsItens > 1)
                setQtdItens(qtsItens - 1)
            }}
            style={{
              width: 40,
              height: 30,
              borderColor: '#d2d2d2',
              borderWidth: .4,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Less width={15} height={15} />
          </TouchableOpacity>

          <View
            style={{
              width: 20,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{
              fontSize: 20,
              color: '#323232',
              fontFamily: 'GeneralSans-Bold'
            }}>
              {qtsItens}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setQtdItens(qtsItens + 1)
            }}
            style={{
              width: 40,
              height: 30,
              borderColor: '#d2d2d2',
              borderWidth: .4,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <More width={15} height={15} />
          </TouchableOpacity>

        </View>

        <Pressable
          onPress={() => {
            //@ts-ignore
            handleToggleAddCart(route.params.item, qtsItens)

          }}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: '#EE2F2A',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{
            fontSize: 18,
            color: '#fff',
            fontFamily: 'GeneralSans-Bold'
          }}>
            Adicionar
          </Text>
        </Pressable>

      </View>

      <View
        style={{
          width: width,
          paddingLeft: 20,
        }}
      >
        <Text style={{
          fontSize: 20,
          color: '#4F4F4F',
          fontFamily: 'GeneralSans-Bold'
        }}>
          Detalhes:
        </Text>
      </View>

      <View
        style={{
          width: width,
          paddingTop: 10,
          paddingBottom: 10,
          paddingHorizontal: 20,
          gap: 20
        }}
      >
        
          {
          //@ts-ignore
            route.params?.item?.detalhes !== undefined && 
            <Text
            style={{
              fontSize: 18,
              color: '#4F4F4F',
              fontFamily: 'GeneralSans-Medium'
            }}
            
          >
            {/*@ts-ignore*/}
            {route.params.item.detalhes}
            </Text>
          }
          
      </View>


    </ScrollView>
  );
}
