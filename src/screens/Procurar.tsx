import { View, Text, StyleSheet, Image, Dimensions, StatusBar } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import React from 'react'

import Search from './../../assets/svgs/search-b.svg'

export function Procurar({ navigation }: { navigation: any }) {
  const { width, height } = Dimensions.get("window")
  return (
    <View style={{
      width: width,
      height: height + getStatusBarHeight(),
      paddingTop: getStatusBarHeight(),
      backgroundColor: '#fff'
    }}>
      <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />
      <View style={{
        width: '90%',
        height: 45,
        backgroundColor: '#F2F3F2',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 16,
        marginTop: 30,
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
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '98%',
        height: '80%',
      }}>
        <Text style={{
          fontSize: 18,
          color: '#c6c6c6',
          fontFamily: 'GeneralSans-SemiBold',
        }}>
          Procure por um produto da loja.
        </Text>
      </View>
    </View>

  );
}
export const styles = StyleSheet.create({
  OrffersItem: {
    borderWidth: 1,
    borderColor: '#d2d2d2',
    width: 110,
    height: 198,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  input: {
    backgroundColor: '#F2F3F2',
    width: '88%',
    height: 45,
    alignSelf: 'center',
    fontFamily: 'GeneralSans-Semibold',
    borderRadius: 16,
    paddingLeft: 20,
    color: '#7C7C7C'

  },
  btnAdicionar: {
    backgroundColor: '#EE2F2A',
    width: '100%',
    height: 32,
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
    height: '45%',
    alignSelf: 'center',
    justifyContent: 'space-between'
  }
})