import React, { useEffect, useState } from 'react';
import { View, Text, PressableProps, StyleSheet, Image, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Menos from './../../assets/svgs/menos.svg'
import Mais from './../../assets/svgs/plus-svgrepo-com.svg'

export type ItensProps = {
  name: string,
  imagem: string,
  quantidade : string,
  price: string,
  und: string,
  selected?: boolean,
  addToCart: () => void,
  addProd: () => void,
  decProd: () => void,
}


export  function ItensOferta({name, imagem, quantidade, price, und, selected = false, addToCart, addProd, decProd}: ItensProps & PressableProps) {

  
  
  return (
    <View style={styles.ofertasItem}>
      <View style={{
        backgroundColor: '#D9042B',
        width: 55,
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
          fontFamily: 'Manrope-SBold',
        }}>Oferta</Text>
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
  
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={{ color: '#000', fontSize: 14, fontFamily: 'Manrope-SemiBold', }}>R$ {price}</Text>
            <Text style={{ color: '#000', fontSize: 8 , fontFamily: 'Manrope-SemiBold',}}> {und}</Text>
          </View>
          <Pressable onPress={addToCart}>
              {
                selected ? (
                  <View style={{
                    width: '100%',
                    height: 28,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    borderRadius: 10
                  }}>
                    <Pressable onPress={decProd}>
                      <View style={styles.menosMais}>
                        <Menos  width={10} height={10}/>
                      </View>
                    </Pressable>
                    
                      <View>
                        {/* @ts-ignore */}
                        <Text style={{color: '#000',fontWeight: 'bold', fontSize: 18}}>{String(quantidade.qtd)}</Text>
                      </View>
                    
                    <Pressable onPress={addProd}>
                      <View style={styles.menosMais}>
                        <Mais  width={10} height={10} fill="#333"/>
                      </View>
                    </Pressable>
                  </View>
                ): 
                  <View style={styles.btnAdicionar}>
                    <Text style={{ color: '#fff', }}>Adicionar</Text>
                  </View>
              }
              
            </Pressable>
          
        </View>

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
    borderWidth: 0.5,
    borderColor:'#d2d2d2',
    width: 140,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: '#fff',
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
    justifyContent: 'center'
  },
  imgProd: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  detailsProd: {
    width: '86%', 
    height:'45%', 
    alignSelf: 'center', 
    justifyContent: 'space-between',
    
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