import { View, Text, PressableProps, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'

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
      style={{
        width: '95%',
        height: 140,
        flexDirection: 'row',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 10,
        marginRight: 10,
        backgroundColor: selected ? 'rgba(4, 217, 43, 0.1)' :'#FFF',
        borderColor: selected ? 'rgba(4, 217, 43, 0.1)' : '#c6c6c6',
        borderWidth: .5,
        alignItems: 'center',
      }}
    >
      <View style={styles.imgProdView}>
        <Image
          source={{uri: imagem}}
          style={styles.imgProd} />
      </View>
      <View style={styles.detailsProd}>
        <View>
          <Text style={{ color: '#323232', fontSize: 20, fontFamily: 'Manrope-Bold', }}>{name}</Text>
        </View>

        <View style={{ flexDirection: 'row',}}>
          <Text style={{ color: '#c6c6c6', fontSize: 16, fontFamily: 'Manrope-SemiBold', }}>R$ {price}</Text>
        </View>

        </View>

    </Pressable>
  );
}
export const styles = StyleSheet.create({
  Orffers: {
    paddingTop: 20,
  },
  OrffersInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  OrffersItem: {
    width: '95%',
    height: 140,
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: '#FFF',
    borderWidth: .3,
    alignItems: 'center',
    
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
    maxHeight: '100%',
    minHeight: '100%',
    maxWidth: '40%',
    minWidth: '40%',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  imgProd: {
    width: 110,
    height: 110,
    resizeMode: 'contain'
  },
  detailsProd: {
    width: '60%', 
    height:'45%', 
    alignSelf: 'center',
    justifyContent: 'space-between'
  }
});