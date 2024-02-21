import React from 'react';
import { View, Text, StyleSheet,Image, Dimensions } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height'

import ScreenBack from '../../../assets/svgs/arrow-right.svg'
import Search from '../../../assets/svgs/search.svg'
//@ts-ignore
export function Procurar({navigation}) {
  const { width, height } = Dimensions.get("window")
  return (
    <View style={{ 
      width: width,
      height: height +getStatusBarHeight(),
      paddingTop: getStatusBarHeight(),
      
    }}>
      
      <View style={{
        width: '90%',
        height: 45,
        backgroundColor: '#fff',
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
          placeholderTextColor={'#d2d2d2'}
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
  ofertasItem: {
    borderWidth: 1,
    borderColor:'#d2d2d2',
    width: 110,
    height: 198,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  input: {
    backgroundColor:'#fff',
    width:'88%',
    height: 45,
    alignSelf:'center',
    
    borderRadius: 16,
    paddingLeft: 20,
    color: '#000',

  },
  btnAdicionar: {
    backgroundColor: '#f00',
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
    height:'45%', 
    alignSelf: 'center', 
    justifyContent: 'space-between'
  }
})