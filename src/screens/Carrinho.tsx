import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, StatusBar, FlatList, Alert, Modal, Pressable, Animated, TextInput } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import React, { useEffect, useRef, useState } from 'react'

import DropDownPicker from 'react-native-dropdown-picker'

import ItensCarrinho from './ItensCarrinho'
import { useAuth } from '../hooks/auth'

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import ScreenBack from './../../assets/svgs/arrow-right.svg'
import Close from './../../assets/svgs/close.svg'
import LottieView from 'lottie-react-native'

export function Carrinho({ navigation }: { navigation: any }) {

  const dataAtual = new Date()

  const { width, height } = Dimensions.get("window")

  const { kitsCarrinho, setKitsCarrinho } = useAuth()

  const [modalVisible, setModalVisible] = useState(false)
  const [modalFinalizarVisible, setModalFinalizarVisible] = useState(false)
  const [totalCompra, setTotalCompra] = useState(0)
  const [finalizando, setFinalizando] = useState(false)

  const [idItemRef, setIdItemRef] = useState(0)
  const [dadosUsuario, setDadosUsuario] = useState({})

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
            //@ts-ignore
            setDadosUsuario({ id, ...data })
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

  useEffect(() => {
    const dataArray = kitsCarrinho.map((item) => {
      //@ts-ignore
      const valorItem = parseFloat(item.preco) * parseFloat(item.quantidade);
      return { valorItem };
    });

    const valorTotal = dataArray.reduce((total, item) => total + item.valorItem, 0);
    setTotalCompra(valorTotal);
  }, [kitsCarrinho]);

  function addQtd(idProd: any) {
    setKitsCarrinho(prevObjetos =>
      prevObjetos.map(objeto =>
        //@ts-ignore
        objeto.id === idProd ? { ...objeto, quantidade: objeto.quantidade + 1 } : objeto
      )
    )
  }

  function decQtd(idProd: any) {
    //@ts-ignore
    setKitsCarrinho(prevObjetos =>
      prevObjetos.map(objeto =>
        //@ts-ignore
        objeto && objeto.id === idProd ? { ...objeto, quantidade: objeto.quantidade - 1 } : objeto
      )
    );
  }

  function delProdCart(value: string) {
    //@ts-ignore
    setKitsCarrinho((state) => state.filter(item => item.id !== value))
  }

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
          valor: totalCompra.toFixed(2)
        })
      await Promise.all(kitsCarrinho.map(async (itens) => {
        await firestore()
          .collection('pedidos')
          .doc(idSnapshot.id)
          .collection('itens')
          .add({
            //@ts-ignore
            nome: itens.nome,
            //@ts-ignore
            preco: itens.preco,
            //@ts-ignore
            quantidade: itens.quantidade
          })
      }))

      Alert.alert("Pedido Cadastrado")
      setKitsCarrinho([])
      navigation.goBack()

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

      <View style={{
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: .5
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
          fontFamily: 'GeneralSans-Semibold'
        }}>
          Meu Carrinho
        </Text>

      </View>
      {
        kitsCarrinho.length <= 0 ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{
              fontSize: 18,
              color: '#c6c6c6',
              fontFamily: 'GeneralSans-SemiBold',
            }}>
              Não há nenhum ítem no seu carinho
            </Text>
          </View> :
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 10, }}
            style={{
              marginBottom: 140
            }}
            data={kitsCarrinho}
            //  @ts-ignore
            keyExtractor={item => item.id}

            renderItem={({ item }) => {
              //@ts-ignore
              let qtdProdutoSelecionado = kitsCarrinho.find(objeto => objeto.id === item.id)

              return (
                <ItensCarrinho
                  //@ts-ignore
                  name={item.nome}
                  //@ts-ignore
                  price={parseFloat(item.preco)}
                  //@ts-ignore
                  imagem={item.imagem}
                  //@ts-ignore
                  und={item.und}
                  //@ts-ignore
                  quantidade={qtdProdutoSelecionado}

                  addProd={() => {
                    //@ts-ignore
                    addQtd(item.id)
                  }}
                  decProd={() => {
                    //@ts-ignore
                    if (qtdProdutoSelecionado.quantidade <= 1) {
                      //@ts-ignore
                      setIdItemRef(item.id)
                      setModalVisible(!modalVisible)
                    } else {
                      //@ts-ignore
                      decQtd(item.id)
                    }
                  }}
                  delProd={() => {
                    //@ts-ignore
                    setIdItemRef(item.id)
                    setModalVisible(!modalVisible)

                  }}
                />
              )
            }} />
      }

      <TouchableOpacity
        disabled={kitsCarrinho.length <= 0 ? true : false}
        onPress={() => {
          //@ts-ignore
          const hasKit = kitsCarrinho.some(item => item.categoria === 'kit')
          if(hasKit)
            setModalFinalizarVisible(!modalFinalizarVisible)
          else
            Alert.alert('Você precisa ter pelo menos um KIT no seu carrino')
        }}
        style={{
          position: 'absolute',
          backgroundColor: '#EE2F2A',
          opacity: kitsCarrinho.length <= 0 ? .5 : 1,
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
          fontFamily: 'GeneralSans-Semibold',
        }}>
          Finalizar Compra
        </Text>
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            backgroundColor: '#FF5F5A',
            right: 10,
            borderRadius: 5
          }}
        >
          <Text style={{
            fontSize: 12,
            color: '#fff',
            fontFamily: 'GeneralSans-Semibold',
          }}>
            R$ {totalCompra.toFixed(2)}
          </Text>
        </View>

      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Deseja mesmo Excluir item?</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '85%',
              }}
            >
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible)
                }
                }>
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonExcluir]}
                onPress={() => {
                  //@ts-ignore
                  delProdCart(idItemRef)
                  setModalVisible(!modalVisible)
                }
                }>
                <Text style={styles.textStyle}>Excluir</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </Modal>

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
                fontFamily: 'GeneralSans-Semibold',
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
                fontFamily: 'GeneralSans-Medium',
              }}
            >
              Total:
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#000',
                fontFamily: 'GeneralSans-Semibold',
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
                fontFamily: 'GeneralSans-Medium',
                textAlign: 'left'
              }}
            >
              Retirada:
            </Text>
            <DropDownPicker
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
                fontFamily: 'GeneralSans-Medium',
                textAlign: 'left'
              }}
            >
              Forma de Pagamento:
            </Text>
            <DropDownPicker
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
                  fontFamily: 'GeneralSans-Medium',
                  textAlign: 'left'
                }}
              >
                Troco para:
              </Text>
              <TextInput
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
                fontFamily: 'GeneralSans-Medium',
              }}
            >
              Ao comprar você concorda com nossos termos de
              <Text
                style={{
                  fontSize: 12,
                  color: '#000',
                  fontFamily: 'GeneralSans-Semibold',
                }}
              >
                {' '}uso{' '}
              </Text>
              e
              <Text
                style={{
                  fontSize: 12,
                  color: '#000',
                  fontFamily: 'GeneralSans-Semibold',
                }}
              >
                {' '}condições{' '}
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              finalizarPedido(dadosUsuario)
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
                  fontFamily: 'GeneralSans-Semibold',
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
    fontFamily: 'Manrope-SemiBold'
  },
})