import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, StatusBar, FlatList, Alert, Modal, Pressable, Animated, TextInput } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import React, { useEffect, useMemo, useRef, useState } from 'react'

//@ts-ignore
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'
import DropDownPicker from 'react-native-dropdown-picker'

import ItensCart from '../components/ItensCart'
import { useAuth } from '../hooks/auth'

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import ScreenBack from '../../assets/svgs/arrow-right.svg'
import Close from '../../assets/svgs/close.svg'
import LottieView from 'lottie-react-native'
import InAppBrowser from 'react-native-inappbrowser-reborn'

import { useCart } from '../cart/CartContext'
import { HeaderScreens } from '../components/HeaderScreens'

export function Cart({ navigation }: { navigation: any }) {

  const dataAtual = new Date()

  const { width, height } = Dimensions.get("window")

  const { kitsCart, setKitsCart } = useAuth()

  const { products } = useCart()

  const [url, setUrl] = useState('https://github.com/')

  const [modalVisible, setModalVisible] = useState(false)
  const [modalFinalizarVisible, setModalFinalizarVisible] = useState(false)
  const [totalCompra, setTotalCompra] = useState(0)
  const [finalizando, setFinalizando] = useState(false)

  const [troco, setTroco] = useState('')

  const [idItemRef, setIdItemRef] = useState(0)
  const [userData, setUserData] = useState({})

  const [openRet, setOpenRet] = useState(false)
  const [valueRet, setValueRet] = useState(null)
  const [itemsRet, setItemsRet] = useState([
    { label: 'Delivery', value: 'delivery' },
    { label: 'Retirar na loja', value: 'retirar' },
  ])

  const [openPag, setOpenPag] = useState(false)
  const [valuePag, setValuePag] = useState(null)
  const [itemsPag, setItemsPag] = useState([
    { label: 'Dinheiro', value: 'dinheiro' },
    { label: 'Pix', value: 'pix' },
    { label: 'Cartão', value: 'cartao' }
  ])

  const handleOpenLink = async () => {
    try {
      await InAppBrowser.open(url)
    } catch (error) {
      console.error('Failed to open link:', error)
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth().currentUser

        if (currentUser) {
          const documentSnapshot = await firestore()
            .collection('users')
            .doc(currentUser.uid)
            .get();

          if (documentSnapshot.exists) {
            const id = documentSnapshot.id
            const data = documentSnapshot.data()
            setUserData({ id, ...data })
          }
        } else {
          console.log('No user is signed in')
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData()
  }, [])

  useMemo(() => {
    const dataArray = products.map((item) => {
      const valorItem = parseFloat(item.price) * (item.quantity || 1)
      return { valorItem }
    })

    const valorTotal = dataArray.reduce((total, item) => total + item.valorItem, 0)
    setTotalCompra(valorTotal)
  }, [products])



  async function finalizarPedido(usuario: any) {
    setFinalizando(true)
    try {
      const idSnapshot = await firestore()
        .collection('pedidos')
        .add({
          formaPagamento: valuePag,
          formaRetirada: valueRet,
          status: 'aberto',
          usuario: usuario.id,
          data: dataAtual,
          valor: totalCompra.toFixed(2),
          troco: troco !== '' ? parseFloat(troco) - totalCompra : 'Finalizadora sem troco'
        })
      await Promise.all(products.map(async (itens) => {
        await firestore()
          .collection('pedidos')
          .doc(idSnapshot.id)
          .collection('itens')
          .add({
            name: itens.name,
            price: itens.price,
            quantity: itens.quantity || 1,
          })
      })).then(() => {
        setKitsCart([])
      }).finally(() => {
        handleOpenLink()
      })


    } catch (error) {
      Alert.alert('Erro ao salvar pedido')
      console.error('Erro ao salvar produtos no Firestore:', error)
    }
    setFinalizando(false)
  }

  return (
    <View style={{
      width: width,
      height: height + getStatusBarHeight(),
      paddingTop: getStatusBarHeight(),
      flex: 1,
      backgroundColor: '#fff'
    }}>

      <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />

      <HeaderScreens
        navigation={navigation}
        title={'Carrinho'}
      />

      {
        products.length <= 0 ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{
              fontSize: 18,
              color: '#c6c6c6',
              fontFamily: 'DMSans-SemiBold',
            }}>
              Não há nenhum ítem no seu carrinho
            </Text>
          </View> :
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 10, }}
            style={{
              marginBottom: 140
            }}
            data={products}
            extraData={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <ItensCart product={item} />
              )
            }}
          />
      }


      <TouchableOpacity
        disabled={products.length <= 0 ? true : false}
        onPress={() => {
          const hasKit = products.some(item => item.category === 'Kits')
          if (hasKit)
            setModalFinalizarVisible(!modalFinalizarVisible)
          else
            Alert.alert('Você precisa ter pelo menos um KIT no seu carrino')
        }}
        style={{
          position: 'absolute',
          backgroundColor: '#EE2F2A',
          opacity: products.length <= 0 ? .5 : 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '85%',
          height: 55,
          alignSelf: 'center',
          borderRadius: 10,
          bottom: 80
        }}>
        <Text style={{
          fontSize: 16,
          color: '#fff',
          fontFamily: 'DMSans-SemiBold',
        }}>
          Finalizar Compra
        </Text>
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            opacity: products.length <= 0 ? .5 : 1,
            backgroundColor: '#FF5F5A',
            right: 10,
            borderRadius: 5
          }}
        >
          <Text style={{
            fontSize: 12,
            color: '#fff',
            fontFamily: 'DMSans-SemiBold',
          }}>
            R$ {totalCompra.toFixed(2)}
          </Text>
        </View>

      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalFinalizarVisible}
        onRequestClose={() => {
          setModalFinalizarVisible(!modalFinalizarVisible);
        }}
      >
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#fff',
            width: width,
            maxHeight: 'auto',
            flexGrow: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingBottom: 40,
            paddingTop: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.45,
            shadowRadius: 4,
            elevation: 10,
          }}
        >

          <View
            style={{
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: '#000',
                fontFamily: 'DMSans-SemiBold',
              }}
            >
              Checkout
            </Text>
            <TouchableOpacity
              style={{
                padding: 10
              }}
              onPress={() => {
                setModalFinalizarVisible(!modalFinalizarVisible)
              }}
            >
              <Close />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#000',
                fontFamily: 'DMSans-Medium',
              }}
            >
              Total:
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#000',
                fontFamily: 'DMSans-SemiBold',
              }}
            >
              R$ {totalCompra.toFixed(2)}
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 10,
              gap: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#000',
                fontFamily: 'DMSans-Medium',
                textAlign: 'left'
              }}
            >
              Retirada:
            </Text>
            <DropDownPicker
              placeholder='Selecione'
              open={openRet}
              value={valueRet}
              items={itemsRet}
              setOpen={setOpenRet}
              setValue={setValueRet}
              setItems={setItemsRet}
              zIndex={3000}
              zIndexInverse={1000}
              dropDownDirection='BOTTOM'
              style={{
                borderWidth: .5,
                borderRadius: 3
              }}
              dropDownContainerStyle={{
                borderWidth: .5,
                borderRadius: 3
              }}
            />
          </View>

          <View
            style={{
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 10,
              gap: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#000',
                fontFamily: 'DMSans-Medium',
                textAlign: 'left'
              }}
            >
              Forma de Pagamento:
            </Text>
            <DropDownPicker
              placeholder='Selecione'
              open={openPag}
              value={valuePag}
              items={itemsPag}
              setOpen={setOpenPag}
              setValue={setValuePag}
              setItems={setItemsPag}
              zIndex={2000}
              dropDownDirection='BOTTOM'
              style={{
                borderWidth: .5,
                borderRadius: 3
              }}
              dropDownContainerStyle={{
                borderWidth: .5,
                borderRadius: 3
              }}
            />
          </View>

          {
            valuePag === 'dinheiro' &&
            <View
              style={{
                width: '100%',
                paddingHorizontal: 20,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 10
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  fontFamily: 'DMSans-Medium',
                  textAlign: 'left'
                }}
              >
                Troco para:
              </Text>
              <TextInput
                value={troco}
                onChangeText={setTroco}
                placeholder='Ex: R$ 100,00'
                placeholderTextColor={'#7C7C7C'}
                keyboardType='numeric'
                style={{
                  color: '#7C7C7C',
                  flex: 1,
                  borderColor: '#000',
                  borderWidth: .3,
                  borderRadius: 3,
                  alignItems: 'center',
                  paddingVertical: 5,
                  paddingHorizontal: 10
                }}
              />
            </View>
          }

          <View
            style={{
              width: '70%',
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Text
              style={{
                fontSize: 12,
                color: '#000',
                fontFamily: 'DMSans-Medium',
              }}
            >
              Ao comprar você concorda com nossos termos de
              <Text
                style={{
                  fontSize: 12,
                  color: '#000',
                  fontFamily: 'DMSans-SemiBold',
                }}
              >
                {' '}uso{' '}
              </Text>
              e
              <Text
                style={{
                  fontSize: 12,
                  color: '#000',
                  fontFamily: 'DMSans-SemiBold',
                }}
              >
                {' '}condições{' '}
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              finalizarPedido(userData)
            }}
            style={{
              backgroundColor: '#EE2F2A',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '85%',
              height: 50,
              alignSelf: 'center',
              borderRadius: 10,
              marginTop: 10
            }}>
            {
              finalizando ?
                <LottieView
                  autoPlay
                  loop
                  source={require('../../assets/json/Animation-Red.json')}
                  style={{ width: 60, height: 60 }}
                /> :
                <Text style={{
                  fontSize: 16,
                  color: '#fff',
                  fontFamily: 'DMSans-SemiBold',
                }}>
                  Finalizar Compra
                </Text>
            }

          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
}
export const styles = StyleSheet.create({
  prodsCar: {
    width: '92%',
    height: 135,
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  menosMais: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    borderColor: '#d2d2d2',
    borderWidth: .5,
  },
  imageStyle: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  detalhesEntrega: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: '#d2d2d2',
    borderBottomWidth: .5,
    paddingBottom: 6
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    gap: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 80,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#c6c6c6',
  },
  buttonExcluir: {
    backgroundColor: '#EE2F2A',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#323232',
    fontFamily: 'DMSans-SemiBold'
  },
})