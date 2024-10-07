import { View, Text, Dimensions, StatusBar, Image, ScrollView, Pressable, Alert, TouchableOpacity, ToastAndroid } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import React, { useEffect, useState } from 'react'

import firestore from '@react-native-firebase/firestore'

import { useRoute} from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native';

import { useCart } from '../cart/CartContext'

import ScreenBack from '../../assets/svgs/arrow-right.svg'
import More from '../../assets/svgs/mais-black.svg'
import Less from '../../assets/svgs/menos.svg'
import { ProductsList } from '../components/PorductsList'

interface product {
  id: string
  name: string
  price: string
  category: string
  images: string[]
}


export default function ProductDetails({ navigation }: { navigation: any }) {

  const route = useRoute()

  const { width, height } = Dimensions.get("window")

  const [productsData, setProductsData] = useState<product[]>([])

  const { products, addProduct } = useCart()

  const [qtsItens, setQtdItens] = useState(1)
  //@ts-ignore
  const [imageProduct, setImageProduct] = useState()
  const [indexImg, setIndexImg] = useState(1)

  const attProductRelevance = (productId: string) => {
    const postReference = firestore().doc(`products/${productId}`);

    return firestore().runTransaction(async transaction => {
      // Get post data first
      const productSnapshot = await transaction.get(postReference);

      if (!productSnapshot.exists) {
        throw 'Post does not exist!';
      }

      const currentRelevance = productSnapshot.data()?.relevance || 0;

      transaction.update(postReference, {
        relevance: currentRelevance + 1,
      });
    });
  }
  const hadleAddProduct =  (item : any, qtsItens: number) => {
    addProduct(item, qtsItens)
    attProductRelevance(item.id)
  }

  useEffect(() => {
    //@ts-ignore
    setImageProduct(route.params.item.images[0])
  },[])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const produtosSnapShot = await firestore()
          .collection('products')
          //@ts-ignore
          .where('category', '==', `${route.params.item.category}`)
          .limit(11)
          .get()

        const arrayProducts: any = []
        produtosSnapShot.forEach((items) => {
          const id = items.id
          const item = items.data()
          arrayProducts.push({ id, ...item })
        })
        //@ts-ignore
        const productsFiltered = arrayProducts.filter((item: any) => item.id !== route.params.item.id)
        setProductsData(productsFiltered)

      } catch (error) {
        console.error("Error fetching produtos: ", error)
      }
    }
    fetchProducts()
  }, [])

  return (

    <ScrollView
      style={{
        width: width,
        paddingTop: getStatusBarHeight(),
        backgroundColor: '#fff',
      }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 40
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
            navigation.goBack()
          }}
        >
          <ScreenBack width={20} height={20} />
        </TouchableOpacity>
        <Text style={{
          fontSize: 18,
          alignSelf: 'center',
          color: '#323232',
          fontFamily: 'GeneralSans-Semibold',
        }}>
          Detalhes do Produto
        </Text>
      </View>

      <View
        style={{
          width: '95%',
          height: 260,
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
          //@ts-ignore
          source={{ uri: imageProduct }}
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
              marginTop: 20
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
                    setImageProduct(image)
                    setIndexImg(index + 1)
                  }}
                  key={index}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    borderColor: imageProduct === image ? '#EE2F2A' : '#9c9a9a',
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
          marginTop: 10,
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
          {route.params.item.name}
        </Text>


      </View>

      <View
        style={{
          width: width,
          paddingLeft: 20,
          paddingRight: 20,
          paddingVertical: 10,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >

        <Text style={{
          fontSize: 18,
          color: '#A9A9A9',
          fontFamily: 'GeneralSans-Medium'
        }}>
          {/*@ts-ignore*/}
          R$ {route.params.item.price}
        </Text>

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
              paddingHorizontal: 10,
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

      </View>
      {
        //@ts-ignore
        route.params.item.details !== '' && (
          <>
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
              <Text
                style={{
                  fontSize: 18,
                  color: '#A9A9A9',
                  fontFamily: 'GeneralSans-Medium'
                }}
              >
                {/*@ts-ignore*/}
                {route.params.item.details}
              </Text>
            </View>
          </>
        )
      }


      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        paddingHorizontal: 20,
      }}>
        <Text style={{
          fontSize: 20,
          color: '#4F4F4F',
          fontFamily: 'GeneralSans-Bold'
        }}>
          Semelhantes
        </Text>

      </View>

      <ProductsList product={productsData} navigation={navigation} />

      <Pressable
        onPress={() => {
          //@ts-ignore
          hadleAddProduct(route.params.item, qtsItens)
          navigation.goBack()
          ToastAndroid.show('Adicionado ao carrinho', ToastAndroid.SHORT)
        }}
        style={{
          paddingHorizontal: 20,
          marginHorizontal: 20,
          marginVertical: 20,
          paddingVertical: 15,
          backgroundColor: '#EE2F2A',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',

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

    </ScrollView>
  );
}
