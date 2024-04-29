import React from 'react'
import { View, Text, Dimensions, TextInput, StyleSheet } from 'react-native'

import Search from './../../assets/svgs/search.svg'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import Cereais from './../../assets/images/rice.png'
import SecoesListComponent from './SecoesListComponent'
import Acougue from './../../assets/images/meet-fish.png'
import Hortifruti from './../../assets/images/horti-fruti.png'
import Perfumaria from './../../assets/images/beauty-product.png'
import Limpeza from './../../assets/images/Produtos-de-Limpeza.png'
//@ts-ignore
export default function SecoesList({navigation}) {

  const sectionsObj = [
    { name: 'Cereais', img: Cereais },
    { name: 'Açougue', img: Acougue},
    { name: 'Horti-Fruti', img: Hortifruti },
    { name: 'Perfumaria', img: Perfumaria },
    { name: 'Limpeza', img: Limpeza },
  ];

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
          placeholder='Pesquisar Secao'
          placeholderTextColor={'#d2d2d2'}
          style={styles.input} />
      </View>

      <View style={{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15,
        rowGap: 8,
        flexWrap: 'wrap',
        }}>
          {
            sectionsObj.map((secoes, index)=>(
              <SecoesListComponent name={secoes.name} img={secoes.img} key={index}/> 
            ))
          }
     </View>
    </View>
    
  );
}
export const styles = StyleSheet.create({
  input: {
    backgroundColor:'#fff',
    width:'88%',
    height: 45,
    alignSelf:'center',
    borderRadius: 16,
    paddingLeft: 20,
    color: '#000',

  },
})