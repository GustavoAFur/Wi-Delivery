import React, { useState } from 'react';
import { View, Text, StyleSheet,Image, Dimensions } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height'

import ScreenBack from '../../../assets/svgs/arrow-right.svg'
import Mais from '../../../assets/svgs/plus-svgrepo-com.svg'
import Search from '../../../assets/svgs/search.svg'
import Menos from '../../../assets/svgs/menos.svg'
import Cart from '../../../assets/svgs/cart.svg'
//@ts-ignore
export function Perfil({navigation}) {
  const { width, height } = Dimensions.get("window")
  const [modoEditar, setModoEditar] = useState(false)
  const [quantidade, setQuantidade] = useState(1)
  //@ts-ignore
  const handleAdicionarCarrinho = () => {
    setModoEditar(true);
  };

  return (
    <View style={{ 
      width: width,
      height: height +getStatusBarHeight(),
      paddingTop: getStatusBarHeight(),
      
    }}>
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      }}>
        <View style={styles.header}>
          <View style={styles.perfilFoto}>
            <View style={{
              width: 75,
              height: 75,
              borderRadius: 20,
              backgroundColor: '#a0a0f7'
            }}>
              <Image 
                source={require('../../../assets/images/bolsa-de-compras.png')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
          </View>
          <View style={styles.perfilInfos}>
            <Text style={{
              color: '#000',
              fontFamily: 'Manrope-SemiBold', 
              fontSize: 15,
              fontWeight: 'bold'
            }}>
              Gustavo A. Furtado
            </Text>
            <Text style={{
              color: '#c6c6c6',
              fontFamily: 'Manrope-SemiBold', 
              fontSize: 15
            }}>
              gustavoaragaof@gmail.com
            </Text>
          </View>
        </View>
      </View>
    </View>
    
  );
}
export const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 140,
    flexDirection: 'row',
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: .5
  },
  perfilFoto: {
    width: '35%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  perfilInfos: {
    width: '65%',
    height: '100%',
    justifyContent: 'center',
    
  }
})
