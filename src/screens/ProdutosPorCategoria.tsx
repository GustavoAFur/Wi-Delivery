import React from 'react';
import { View, Text, Dimensions, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useRoute } from '@react-navigation/native'

import Search from './../../assets/svgs/search.svg'
import ScreenBack from './../../assets/svgs/arrow-right.svg'

import { TextInput } from 'react-native-gesture-handler';

export default function ProdutosPorCategoria({ navigation }: { navigation: any }) {

  const { width, height } = Dimensions.get("window")
  const route = useRoute()
  return (
    <View style={{ 
      width: width, 
      height: height +getStatusBarHeight(),
      flex: 1
    }}>
      <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />
      <View style={{
        width: width,
        paddingHorizontal: 20,
        marginTop: 0,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: .5
      }}>
        <View
          style={{
            position: 'absolute',
            left: 20
          }}
        >
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
            fontSize: 18,
            alignSelf:'center',
            color: '#323232',
            fontFamily: 'Manrope-SemiBold'
          }}>
            {/* @ts-ignore */}
            {route.params.categoria}
          </Text>
        </View>
      </View>

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