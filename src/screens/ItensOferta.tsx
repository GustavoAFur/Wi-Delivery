import React, { useEffect, useState } from 'react';
import { View, Text, PressableProps, StyleSheet, Image, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Menos from './../../assets/svgs/menos.svg'
import Mais from './../../assets/svgs/plus-svgrepo-com.svg'

export type ItensProps = {
  name: string,
  imagem: string,
  price: string,
  navTo: () => void,
}


export  function ItensOferta({name, imagem, price, navTo}: ItensProps & PressableProps) {

  
  
  return (
    <View style={styles.ofertasItem}>
      <View style={{
        backgroundColor: '#D9042B',
        width: 75,
        height: 20,
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 5
      }}>
        <Text style={{
          color: '#fff',
          fontFamily: 'Manrope-SemiBold',
        }}>Destaque</Text>
      </View>

      <View style={styles.imgProdView}>
      <Image
        source={{uri: imagem}}
        style={styles.imgProd} />
      </View>
      <View style={styles.detailsProd}>
        <View>
          <Text style={{ color: '#000', fontSize: 15, fontFamily: 'Manrope-SemiBold', }}>{name}</Text>
        </View>

        <View style={{ flexDirection: 'row',}}>
          <Text style={{ color: '#000', fontSize: 14, fontFamily: 'Manrope-SemiBold', }}>R$ {price}</Text>
        </View>

        <Pressable onPress={navTo}>
            
          <View style={styles.btnAdicionar}>
            <Text style={{ color: '#fff', }}>Adicionar</Text>
          </View>
            
        </Pressable>

        </View>

    </View>
  );
}
export const styles = StyleSheet.create({
  ofertas: {
    paddingTop: 20,
  },
  ofertasInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  ofertasItem: {
    width: 140,
    height: 240,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    
  },
  
  btnAdicionar: {
    backgroundColor: '#D9042B',
    width: '100%',
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  imgProdView: {
    height: '50%',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  imgProd: {
    width: 110,
    height: 110,
    resizeMode: 'contain'
  },
  detailsProd: {
    width: '86%', 
    height:'45%', 
    alignSelf: 'center', 
    gap: 12
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
});