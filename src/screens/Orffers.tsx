import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { View, Text, StyleSheet,Image, Dimensions, StatusBar, Pressable } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import React, { useState } from 'react'

import ScreenBack from '../../assets/svgs/arrow-right.svg'
import Mais from '../../assets/svgs/plus-svgrepo-com.svg'
import Search from '../../assets/svgs/search.svg'
import Menos from '../../assets/svgs/menos.svg'
import Cart from '../../assets/svgs/cart.svg'
import { useAuth } from '../hooks/auth'
//@ts-ignore
export function Orffers({navigation}) {
  const { width, height } = Dimensions.get("window")
  const [modoEditar, setModoEditar] = useState(false)
  const [quantidade, setQuantidade] = useState(1)

  const { kitsCart, setKitsCart } = useAuth()

  //@ts-ignore
  const handleAdicionarCart = () => {
    setModoEditar(true);
  };

  return (
    <View style={{ 
      width: width,
      height: height +getStatusBarHeight(),
      paddingTop: getStatusBarHeight(),
      backgroundColor: '#fff',
    }}>

      <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />

      <View style={{
        width: width,
        paddingHorizontal: 20,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#fff'
      }}>
        <View>
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
            fontSize: 20,
            alignSelf:'center',
            color: '#323232',}}>
              Destaques do Dia
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={()=>{
              navigation.navigate('Cart')
            }}
          >
            {
          kitsCart.length > 0 && (
            <View
              style={{
                backgroundColor: '#EE2F2A',
                width: 20,
                height: 20,
                borderRadius: 10,
                zIndex: 3,
                position: 'absolute',
                top: -10,
                right: -10,
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
                {kitsCart.length}
              </Text>
            </View>
          )
        }
            <Cart width={25} height={25}/>
          </TouchableOpacity>
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

      <View style={{
        flexDirection: 'row', 
        alignItems: 'center',
        alignSelf: 'center', 
        width: '98%',
        paddingHorizontal: 8,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        }}>

        

     </View>
    </View>
    
  );
}
export const styles = StyleSheet.create({
  OrffersItem: {
    borderWidth: 1,
    borderColor:'#d2d2d2',
    width: 140,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  input: {
    backgroundColor:'#F2F3F2',
    width:'88%',
    height: 45,
    alignSelf:'center',
    borderRadius: 16,
    paddingLeft: 20,
    color: '#7C7C7C',
    fontFamily: 'GeneralSans-Semibold',
  },
  btnAdicionar: {
    backgroundColor: '#EE2F2A',
    width: '100%',
    height: 28,
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
    height:'45%', 
    alignSelf: 'center', 
    justifyContent: 'space-between'
  },
  menosMais: {
    width: 25, 
    height:25, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor:'#d2d2d2',
    borderWidth: .5,
  },
})