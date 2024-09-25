import { View, Text, Dimensions, StatusBar, StyleSheet, TouchableOpacity, FlatList, Image, Pressable } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { TextInput } from 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

import firestore from '@react-native-firebase/firestore'

import { useCart } from '../cart/CartContext'

import ScreenBack from '../../assets/svgs/arrow-right.svg'
import Search from '../../assets/svgs/search-b.svg'
import Cart from '../../assets/images/icons8-carrinho-de-compras-carregado-100.png'
import CartBlack from '../../assets/svgs/cart.svg'
import { useAuth } from '../hooks/auth';
import { Products } from '../components/Products';

export default function ProductsByCategory({ navigation }: { navigation: any }) {

  const { width, height } = Dimensions.get("window")

  const route = useRoute()

  const [produtosList, setProdutosList] = useState([])

  const { kitsCart, setKitsCart } = useAuth()
  const { products } = useCart()

  useEffect(() => {
    const produtos = async () => {
      try {
        const produtosSnapShot = await firestore()
          .collection('products')
          //@ts-ignore
          .where('category', '==', `${route.params.filtroCategoria}`)
          .get()

        const arrayProd: any = []
        produtosSnapShot.forEach((produtos) => {
          const id = produtos.id
          const produto = produtos.data()
          arrayProd.push({ id, ...produto })
        })

        setProdutosList(arrayProd)
      } catch (error) {
        console.error("Error fetching produtos: ", error)
      }
    }
    produtos()
    console.log(produtosList)
  }, [])

  return (
    <View style={{
      width: width,
      height: height + getStatusBarHeight(),
      paddingTop: getStatusBarHeight(),
      backgroundColor: '#fff',
      flex: 1
    }}>
      <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />
      <View style={{
        width: width,
        paddingHorizontal: 30,
        marginTop: 0,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#fff',
      }}>

        <TouchableOpacity
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
          fontFamily: 'GeneralSans-SemiBold'
        }}>
          {/* @ts-ignore */}
          {route.params.categoria}
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Cart')
          }}
          style={{
            width: 24,
            height: 24,
          }}
        >
          {
            products.length > 0 && (
              <View
                style={{
                  backgroundColor: '#EE2F2A',
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  zIndex: 3,
                  position: 'absolute',
                  top: -5,
                  right: -15,
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
            source={require('../../assets/images/cart-unfocused.png')}
            resizeMode='contain'
            style={{
              width: 32,
              height: 32,
            }} />
        </TouchableOpacity>
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
          <Products product={item} navigation={navigation} />
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
    width: '88%',
    height: 45,
    alignSelf: 'center',
    fontFamily: 'GeneralSans-Semibold',
    borderRadius: 16,
    paddingLeft: 20,
    color: '#7C7C7C'

  },
})