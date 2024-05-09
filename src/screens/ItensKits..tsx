import React, { useEffect, useState } from 'react';
import { View, Text, PressableProps, StyleSheet, Image, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Menos from './../../assets/svgs/menos.svg'
import Mais from './../../assets/svgs/plus-svgrepo-com.svg'

export type ItensProps = {
  name: string,
  imagem: string,
  price: string,
  selected?: boolean,
  selecionar: () => void,
}


export  function ItensKits({name, imagem, price,selected = false, selecionar}: ItensProps & PressableProps) {

  return (
    <Pressable 
      onPress={selecionar}
      style={[styles.ofertasItem,{borderColor: selected ? '#f00' : '#000'}]}
    >
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

        </View>

    </Pressable>
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
    width: '95%',
    height: 140,
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    borderWidth: .3,
    alignItems: 'center'
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