import { View, Text, Dimensions, StatusBar, StyleSheet, TouchableOpacity, FlatList, Image, Pressable } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { TextInput } from 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

import firestore, { Filter } from '@react-native-firebase/firestore'

import { useCart } from '../cart/CartContext'

import ScreenBack from '../../assets/svgs/arrow-right.svg'
import Search from '../../assets/svgs/search-b.svg'
import { Products } from '../components/Products';

interface  product {
  id: string
  name: string
  price: string
  category: string
  images: string[]
}
export default function ProductsByCategory({ navigation }: { navigation: any }) {

  const { width, height } = Dimensions.get("window")

  const route = useRoute()

  const [productsList, setProductsList] = useState<product[]>([])
  const [lastDocument, setLastDocument] = useState();

  const [search, setSearch] = useState('')

  const { products } = useCart()

  const showProducts = async () => {
    try {
      let query = firestore()
        .collection('products')
        //@ts-ignore
        .where('category', '==', `${route.params.filtroCategoria}`)

        if(lastDocument != undefined) 
          query = query.startAfter(lastDocument)
        
        query.limit(10)
        .get()
        .then(querySnapshot => {
          //@ts-ignore
          setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);

          const arrayProd: any = []
          querySnapshot.forEach((produtos) => {
            const id = produtos.id
            const produto = produtos.data()
            arrayProd.push({ id, ...produto })
          })
          setProductsList(prev => [...prev, ...arrayProd])
        });

      
    } catch (error) {
      console.error("Error fetching produtos: ", error)
    }
  } 

  useEffect(() => {
    if(search.length >= 3) {
      const fetchProducts = async () => {
        try {
          const querySnapshot = await firestore()
            .collection('products')
            //@ts-ignore
            .where('category', '==', route.params.filtroCategoria)
            .where('name', '>=', search)
            .where('name', '<=', search + '\uf8ff')
            .get();
  
          if (querySnapshot.empty) {
            console.log('No products found');
            return;
          }
          //@ts-ignore
          setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);

          const arrayProd: any = [];
          querySnapshot.forEach((doc) => {
            const id = doc.id;
            const produto = doc.data()
            arrayProd.push({ id, ...produto });
          });
  
          setProductsList(arrayProd);
        } catch (error) {
          console.error("Error fetching products: ", error);
        }
      };
  
      fetchProducts();
      
    }
    //@ts-ignore
  }, [search, route.params.filtroCategoria])

  useEffect(() => {
    showProducts()
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
        paddingLeft: 10
      }}>
        <Search width={20} height={20} />
        <TextInput
          placeholder='Pesquisar Produto'
          placeholderTextColor={'#7C7C7C'}
          style={styles.input} 
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>

      {
        search !== '' && search.length < 3 && (
          <Text style={{
            alignSelf: 'center',
            color: '#EE2F2A',
            marginTop: 10,
            fontFamily: 'GeneralSans-Semibold',
          }}
          >
            Digite pelo menos 3 caracteres
          </Text>
        )
      }

      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 30
        }}
        data={productsList}
        renderItem={({ item }) => (
          <Products product={item} navigation={navigation} />
        )}
        ListFooterComponent={() => 
        {
          if (productsList.length >= 10) {
            return (
             <Pressable
              onPress={() => {
                showProducts()
              }}
              style={{
                paddingHorizontal: 20,
                marginVertical: 20,
                paddingVertical: 15,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255,160,122,0.5)',
              }}
             >
              <Text 
                style={{
                  color: '#EE2F2A',
                  fontFamily: 'GeneralSans-Semibold',
                }}
              >
                Mostrar mais
              </Text>
             </Pressable>
            )
          }
        }
        }
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