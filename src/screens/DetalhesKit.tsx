import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StatusBar, Image, ScrollView, Pressable, Alert, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { NavigationProp, useRoute } from '@react-navigation/native'
import { useAuth } from '../hooks/auth';

import More from './../../assets/svgs/mais-black.svg'
import Less from './../../assets/svgs/menos.svg'

export default function DestalhesKit({ navigation }: { navigation: any }) {

  const route = useRoute()

  const { width, height } = Dimensions.get("window")

  const {kitsCarrinho, setKitsCarrinho} = useAuth()

  const [qtsItens, setQtdItens] = useState(1)

  const [objetoKit, setObjetoKit] = useState({})

  function handleToggleAddCart(value: any, quantidade: number) {
    setKitsCarrinho(prevObjetos => {
      //@ts-ignore
      const objetoExistente = prevObjetos.find(objeto => objeto.id_ === value.id_)
  
      if (objetoExistente) {
        // Se o objeto já existir, atualize a quantidade
        return prevObjetos.map(objeto =>
          //@ts-ignore
          objeto.id_ === value.id_ ? { ...objeto, quantidade: objeto.quantidade + quantidade } : objeto
        )
      } else {
        // Se o objeto não existir, adicione-o com a quantidade especificada
        return [...prevObjetos, { ...value, quantidade }]
      }
    })
  
    navigation.goBack();
  }

  return (
    <>
    <View
      style={{
        width: width,
        height: 90,
        zIndex: 1,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity:  0.21,
        shadowRadius: 8.19,
        elevation: 11
      }}
    >
      <Pressable
        onPress={()=>{
          //@ts-ignore
          handleToggleAddCart(route.params.kit, qtsItens )

        }}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor:'#F2B705',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{
          fontSize: 18,
          color: '#fff',
          fontFamily: 'Manrope-SemiBold',
        }}>
          Adicionar ao Carrinho
        </Text>
      </Pressable>
    </View>
    
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
        <View style={{ alignItems: 'center' }}>
          <Text style={{
            fontSize: 18,
            alignSelf: 'center',
            color: '#323232',
            fontFamily: 'Manrope-SemiBold'
          }}>
            Detalhes do Kit
          </Text>
        </View>
      </View>

      <View
        style={{
          width: width,
          height: 280,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image
        //@ts-ignore
        source={{uri: route.params.imagem}}
        style={{
          width: '80%',
          height: '80%',
          resizeMode: 'contain'
        }}
        />
      </View>
      
      <View
        style={{
          width: width,
          paddingLeft: 20,
          paddingVertical: 15
        }}
      >
        <Text style={{
          fontSize: 18,
          color: '#323232',
          fontFamily: 'Manrope-SemiBold'
        }}>
          {/*@ts-ignore*/}
          {route.params.nome}
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
        <View>
          <Text style={{
            fontSize: 18,
            color: '#323232',
            fontFamily: 'Manrope-SemiBold'
          }}>
            {/*@ts-ignore*/}
            R$ {route.params.preco}
          </Text>
        </View>
        
        <View
          style={{
            flexDirection: 'row',
            width: 90,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <TouchableOpacity
            onPress={()=>{
              if(qtsItens > 1)
                setQtdItens(qtsItens-1)
            }}
            style={{
              width: 30,
              height: 30,
              borderColor: '#d2d2d2',
              borderWidth: .4,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Less width={20} height={20}/>
          </TouchableOpacity>
          
          <View
            style={{
              width: 20,
              height: 20,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{
              fontSize: 18,
              color: '#323232',
              fontFamily: 'Manrope-SemiBold'
            }}>
              {qtsItens}
            </Text>
          </View>
          
          <TouchableOpacity
            onPress={()=>{
              setQtdItens(qtsItens+1)
            }}
            style={{
              width: 30,
              height: 30,
              borderColor: '#d2d2d2',
              borderWidth: .4,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <More width={20} height={20}/>
          </TouchableOpacity>
          

        </View>

      </View>

      <View
        style={{
          width: width,
          paddingLeft: 20,
          paddingVertical: 15
        }}
      >
        <Text style={{
          fontSize: 15,
          color: '#323232',
          fontFamily: 'Manrope-SemiBold'
        }}>
          Detalhes do Kit:
        </Text>
      </View>

      <View
        style={{
          width: width,
          paddingTop: 20,
          paddingBottom: 130,
          gap: 20
        }}
      >
        {
          //@ts-ignore
          route.params.itens.map((itens, index)=>(
            <View
              key={index}
              style={{
                width: '50%',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{
                fontSize: 15,
                color: '#323232',
                fontFamily: 'Manrope-SemiBold'
              }}>
                {itens.qtd} x
              </Text>
              <Text style={{
                fontSize: 15,
                color: '#323232',
                fontFamily: 'Manrope-SemiBold'
              }}>
                {itens.item}
              </Text>
            </View>
          ))
        }
      </View>

    </ScrollView>
    </>
  );
}
