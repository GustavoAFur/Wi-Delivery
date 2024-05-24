import { View, Text, Dimensions, StatusBar, StyleSheet, TouchableOpacity, FlatList, Image, Pressable } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import {TextInput } from 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

import firestore from '@react-native-firebase/firestore'

import ScreenBack from './../../assets/svgs/arrow-right.svg'
import Search from './../../assets/svgs/search-b.svg'
import Cart from './../../assets/images/icons8-carrinho-de-compras-carregado-100.png'

export default function ProdutosPorCategoria({ navigation }: { navigation: any }) {

  const { width, height } = Dimensions.get("window")
  
  const route = useRoute()
  
  const [produtosList, setProdutosList] = useState([])

  useEffect(()=>{
    const produtos = async () =>{
      try{
        const produtosSnapShot = await firestore()
        .collection('avulsos')
        //@ts-ignore
        .where('categoria', '==',`${route.params.filtroCategoria}`)
        .get()
        //@ts-ignore
        const arrayProd = []
        produtosSnapShot.forEach((produtos)=>{
          const id = produtos.id
          const produto = produtos.data()
          arrayProd.push({id,...produto})
        })
        //@ts-ignore
        setProdutosList(arrayProd)
      }catch(error) {
        console.error("Error fetching produtos: ", error)
      }
    }
    produtos()
    console.log(produtosList)
  },[])

  return (
    <View style={{ 
      width: width, 
      height: height +getStatusBarHeight(),
      paddingTop: getStatusBarHeight(),
      backgroundColor: '#fff',
      flex: 1
    }}>
      <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />
      <View style={{
        width: width,
        paddingHorizontal: 20,
        marginTop: 0,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
      }}>
        <View
          style={{
            position: 'absolute',
            left: 20
          }}
        >
          <TouchableOpacity
            onPress={()=>{
              //@ts-ignore
              navigation.goBack()
            }}
          >
            <ScreenBack  width={20} height={20}/>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{
            fontSize: 18,
            alignSelf:'center',
            color: '#323232',
            fontFamily: 'GeneralSans-SemiBold'
          }}>
            {/* @ts-ignore */}
            {route.params.categoria}
          </Text>
        </View>
      </View>

      <View style={{
        width: '90%',
        height: 45,
        backgroundColor: '#F2F3F2',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 16,
        marginTop: 20,
        marginBottom: 30,
        paddingLeft: 10
      }}>
        <Search width={20} height={20} />
        <TextInput
          placeholder='Pesquisar Produto'
          placeholderTextColor={'#7C7C7C'}
          style={styles.input} />
      </View>

      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        data={produtosList}
        
        renderItem={({ item }) => (
          <View
            style={{
              width: 150,
              height: 230,
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              borderColor: '#F1F3F5',
              gap: 8,
              margin: 5
            }}
          >
            <View
              style={{
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center'

              }}
            >
              <Image 
                //@ts-ignore
                source={{uri:item.imagem}}
                style={{
                  width: 80,
                  height: 80,
                  resizeMode: 'contain'
                }}
              />
            </View>

            <Text
              style={{
                color: '#0F1121',
                fontSize: 15,
                fontFamily: 'GeneralSans-Semibold'
              }}
            >
              {/*@ts-ignore*/}
              {item.nome}
            </Text>
            
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
            <Text
              style={{
                color: '#7C7C7C',
                fontSize: 15,
                fontFamily: 'GeneralSans-Semibold'
              }}
            >
              {/*@ts-ignore*/}
              R$ {item.preco}
            </Text>
            <Pressable
              onPress={()=>{
                navigation.navigate('DetalhesProduto', {item: item})
              }}
              style={{
                width: 44,
                height: 44,
                backgroundColor:'#F2B705',
                borderRadius: 22,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                source={Cart}
                resizeMode='contain'
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </Pressable>
            
            </View>
            
          </View>
        )}
        //@ts-ignore
        keyExtractor={item => item.id}  
        numColumns={2}
      />
    </View>
  );
}
export const styles = StyleSheet.create({
  
  input: {
    width:'88%',
    height: 45,
    alignSelf:'center',
    fontFamily: 'GeneralSans-Semibold',
    borderRadius: 16,
    paddingLeft: 20,
    color: '#7C7C7C'

  },
})