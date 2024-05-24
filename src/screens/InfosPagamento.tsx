import { View, Text, Dimensions, TextInput, StyleSheet } from 'react-native'
import React from 'react'

import { getStatusBarHeight } from 'react-native-status-bar-height'
import { TouchableOpacity } from 'react-native-gesture-handler'

import ScreenBack from './../../assets/svgs/arrow-right.svg'

//@ts-ignore
export function InfosPagamento({navigation}) {
  const { width, height } = Dimensions.get("window")
  return (
    <View style={{
      width: width,
      height: height +getStatusBarHeight(),
      paddingTop: getStatusBarHeight(),
    }}>
      <View style={{
        width: width,
        paddingHorizontal: 20,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#fff'
      }}>
        <View>
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
            fontSize: 20,
            alignSelf:'center',
            color: '#323232',
          }}>
            Forma de Pagamento
          </Text>
        </View>
        <View style={{width: 20, height: 20}}></View>
      </View>
      <View style={{flex: 1, width: width, backgroundColor: '#fff', alignItems: 'center'}}>
        <View style={{ 
            width: '86%',
            marginTop: 25,
            gap: 10
        }}>
          <TouchableOpacity style={styles.formasPag}>
            <Text style={styles.textos}>Dinheiro</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.formasPag}>
            <Text style={styles.textos}>Pix</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.formasPag}>
            <Text style={styles.textos}>Crédito</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.formasPag}>
            <Text style={styles.textos}>Débito</Text>
          </TouchableOpacity>

          
        </View>

        <View style={{
            marginTop: 15,
            width: '90%'
          }}>
            <TouchableOpacity  
              style={{
              width: '100%',
              height: 55,
              paddingHorizontal: 20,
              justifyContent: 'center',
              backgroundColor: '#F2B705',
              borderRadius: 10,
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 18,
                fontFamily: 'Manrope-SemiBold',
                color: '#fff',
              }}>
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>

      </View>
    </View>
  );
}
export const styles = StyleSheet.create({
  textos: {
    fontSize: 14,
    fontFamily: 'Manrope-SemiBold',
    color: '#323232',
    zIndex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8
  },
  inputs: {
    width: '100%',
    height: 50,
    borderColor: '#F2F2F2',
    borderWidth: 1,
    borderRadius: 5,
    color: '#0008',
    paddingHorizontal: 18,
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
  },
  formasPag: {
    width: '90%',
    paddingVertical: 15,
    borderColor: '#F2F2F2',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
})