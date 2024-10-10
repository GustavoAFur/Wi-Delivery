import { View, Text, StyleSheet, Image, Dimensions, StatusBar, FlatList, Pressable } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import React, { useEffect, useState } from 'react'

import firestore from '@react-native-firebase/firestore'

import Search from '../../assets/svgs/search-b.svg'
import { Products } from '../components/Products'

interface product {
  id: string
  name: string
  price: string
  category: string
  images: string[]
}
export function SearchScreen({ navigation }: { navigation: any }) {

  const [search, setSearch] = useState('')

  const { width, height } = Dimensions.get("window")

  const [productsList, setProductsList] = useState<product[]>([])
  const [lastDocument, setLastDocument] = useState();

  const showProducts = async () => {
    try {
      let query = firestore()
        .collection('products')
        .orderBy('name', 'asc')

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
  }, [search])

  return (
    <View style={{
      width: width,
      height: height + getStatusBarHeight(),
      paddingTop: getStatusBarHeight(),
      backgroundColor: '#fff'
    }}>
      <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />
      <View style={{
        width: '90%',
        height: 45,
        backgroundColor: '#F2F3F2',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 16,
        marginTop: 30,
        marginBottom: 30,
        paddingLeft: 10
      }}>
        <Search width={20} height={20} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder='Pesquisar Produto'
          placeholderTextColor={'#7C7C7C'}
          style={styles.input} />
      </View>

      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
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
        ListEmptyComponent={() => (
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
          }}>
            <Text style={{
              fontSize: 18,
              color: '#c6c6c6',
              fontFamily: 'GeneralSans-SemiBold',
            }}>
              Procure por um produto da loja.
            </Text>
          </View>

        )}
        keyExtractor={item => item.id}
        numColumns={2}
      />

     
    </View>

  );
}
export const styles = StyleSheet.create({
  OrffersItem: {
    borderWidth: 1,
    borderColor: '#d2d2d2',
    width: 110,
    height: 198,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  input: {
    backgroundColor: '#F2F3F2',
    width: '88%',
    height: 45,
    alignSelf: 'center',
    fontFamily: 'GeneralSans-Semibold',
    borderRadius: 16,
    paddingLeft: 20,
    color: '#7C7C7C'

  },
  btnAdicionar: {
    backgroundColor: '#EE2F2A',
    width: '100%',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  imgProdView: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgProd: {
    width: 80,
    height: 80
  },
  detailsProd: {
    width: '86%',
    height: '45%',
    alignSelf: 'center',
    justifyContent: 'space-between'
  }
})