import React, { useEffect, useState } from 'react';
import { View, Text, PressableProps, StyleSheet, Image, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import IconFav from './../../assets/images/favorit.png'
import IconStar from './../../assets/images/star.png'
import IconStarN from './../../assets/images/star-n.png'
import Mais from './../../assets/svgs/plus-svgrepo-com.svg'

export type ItensProps = {
  name: string,
  imagem: string,
  price: string,
  navTo: () => void,
}

export function ItensOferta({ name, imagem, price, navTo }: ItensProps & PressableProps) {

  return (
    <View style={styles.ofertasItem}>

      <View style={{
        width: 260,
        height: 285,
        borderRadius: 10,
        marginRight: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F1F3F5',
      }}>
        <View style={{
          position: 'absolute',
          padding: 15,
          zIndex: 1,
        }}>

          <View style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <View style={{
              backgroundColor: '#FFEAEE',
              alignSelf: 'flex-start',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20
            }}>
              <Text style={{
                fontSize: 13,
                lineHeight: 14,
                marginVertical: 7,
                marginHorizontal: 10,
                fontFamily: 'GeneralSans-Medium',
                color: '#D9042B',
              }}>Destaque</Text>
            </View>

            <Pressable onPress={() => {

            }}>
              <Image
                resizeMode='contain'
                style={{
                  width: 30,
                  height: 30,
                }}
                source={IconFav}
              />

            </Pressable>

          </View>

        </View>

        <Image
          resizeMode='contain'
          source={{ uri: imagem }}
          style={styles.imgProd}
        />

      </View>

      <View style={styles.detailsProd}>
        <View style={{
          marginTop: 16,
        }}>
          <Text style={{
            color: '#0F1121',
            fontSize: 15,
            fontFamily: 'GeneralSans-Semibold'
          }}>
            {name}
          </Text>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          marginVertical: 5
        }}>
          <Image
            resizeMode='contain'
            style={{
              width: 18,
              height: 18,
            }}
            source={IconStar}
          />

          <Image
            resizeMode='contain'
            style={{
              width: 18,
              height: 18,
            }}
            source={IconStar}
          />

          <Image
            resizeMode='contain'
            style={{
              width: 18,
              height: 18,
            }}
            source={IconStar}
          />

          <Image
            resizeMode='contain'
            style={{
              width: 18,
              height: 18,
            }}
            source={IconStarN}
          />

          <Image
            resizeMode='contain'
            style={{
              width: 18,
              height: 18,
            }}
            source={IconStarN}
          />
        </View>

        <View style={{
          alignItems: 'flex-start'
        }}>
          <Text style={{
            color: '#67697A',
            fontSize: 12,
            fontFamily: 'GeneralSans-Regular'
          }}>
            R$ {price}
          </Text>

          <Text style={{
            color: '#67697A',
            fontSize: 14,
            fontFamily: 'GeneralSans-Medium'
          }}>
            R$ {price}
          </Text>
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
  },
  ofertasInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  ofertasItem: {
    width: 260,
    height: 400,
    borderRadius: 10,
    marginRight: 20,
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
    borderRadius: 10,
    marginRight: 20,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F3F5',
  },
  imgProd: {
    width: 220,
    height: 300,
    alignSelf: 'center'
  },
  detailsProd: {
    width: '100%',
    height: '45%',
    alignSelf: 'center',
  },
  menosMais: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#d2d2d2',
    borderWidth: .5,
  },
});