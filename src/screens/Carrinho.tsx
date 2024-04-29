import React, { useState } from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { View, Text, Dimensions, StyleSheet,  Image, StatusBar, FlatList, Alert, Modal, Pressable} from 'react-native'

import Menos from './../../assets/svgs/menos.svg'
import Close from './../../assets/svgs/close.svg'
import Mais from './../../assets/svgs/plus-svgrepo-com.svg'
import { useAuth } from '../hooks/auth'
import ItensCarrinho from './ItensCarrinho'


//@ts-ignore
export function Carrinho({navigation}) {

  const { width, height } = Dimensions.get("window")

  const {kitsCarrinho, setKitsCarrinho} = useAuth()

  const [modalVisible, setModalVisible] = useState(false)
  const [idItemRef, setIdItemRef] = useState(0)
  const [quantidade, setQuantidade] = useState(1)


  function addQtd (idProd: any){
    setKitsCarrinho(prevObjetos => 
      prevObjetos.map(objeto => 
        //@ts-ignore
        objeto.id_ === idProd ? { ...objeto, quantidade: objeto.quantidade+1 } : objeto
      )
    )
  }

  function decQtd(idProd: any) {
    //@ts-ignore
    setKitsCarrinho(prevObjetos =>
      prevObjetos.map(objeto =>
        //@ts-ignore
        objeto && objeto.id_ === idProd ?  { ...objeto, quantidade: objeto.quantidade - 1 }: objeto
      )
    );
  }

  function delProdCart (value: string){
    //@ts-ignore
    setKitsCarrinho((state)=> state.filter(item => item.id_ !== value)) 
                        
  }

  return (
    <View style={{ 
      width: width, 
      height: height +getStatusBarHeight(),
      paddingTop: getStatusBarHeight(),
      flex: 1,
      backgroundColor: '#fff'
    }}>

     <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />

      <View style={{
        width: width,
        paddingHorizontal: 20,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: .5
      }}>
        <View style={{alignItems: 'center'}}>
          <Text style={{
            fontSize: 18,
            alignSelf:'center',
            color: '#323232',
            fontFamily: 'Manrope-SemiBold'
          }}>
            Meu Carrinho
          </Text>
        </View>
      </View>
      

      <FlatList
        contentContainerStyle={{paddingHorizontal: 10, }}
        style={{
          marginBottom: 140
        }}
        data={kitsCarrinho}
        //  @ts-ignore
        keyExtractor={item=> item.id_}

        renderItem={({item}) => {
          //@ts-ignore
          let qtdProdutoSelecionado = kitsCarrinho.find(objeto => objeto.id_ === item.id_)

          return(
            <ItensCarrinho
            //@ts-ignore
            name={item.nome} 
            //@ts-ignore
            price={parseFloat(item.preco)} 
            //@ts-ignore
            imagem={item.caminho}
            //@ts-ignore
            und={item.und}
            //@ts-ignore
            quantidade={qtdProdutoSelecionado}

            addProd={()=>{
              //@ts-ignore
              addQtd(item.id_)
            }}
            decProd={()=>{
              //@ts-ignore
              qtdProdutoSelecionado.quantidade <= 1 ?  delProdCart (item.id_) : decQtd(item.id_)
            }}
            delProd={()=>{
              //@ts-ignore
              setIdItemRef(item.id_)
              setModalVisible(!modalVisible)
              
            }}
            />
          )
        }}/>

      <TouchableOpacity 
        onPress={()=>{
          navigation.navigate('InfosDadosPessoais')
        }}
      >
        <View style={{
          position: 'absolute',
          backgroundColor: '#F2B705',
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
            fontSize: 18,
            color: '#fff',
            fontFamily: 'Manrope-SemiBold',
          }}>Finalizar Compra</Text>
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
                  delProdCart (idItemRef)
                  setModalVisible(!modalVisible)
                }
                }>
                <Text style={styles.textStyle}>Excluir</Text>
            </Pressable>
            </View>
            
          </View>
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
    height:32, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    borderColor:'#d2d2d2',
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
    backgroundColor: '#D9042B',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    alignSelf:'center',
    color: '#323232',
    fontFamily: 'Manrope-SemiBold'
  },
})