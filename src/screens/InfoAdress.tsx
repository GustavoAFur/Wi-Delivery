import { View, Text, Dimensions, TextInput, StyleSheet, KeyboardAvoidingView, Platform, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import { getStatusBarHeight } from 'react-native-status-bar-height'

import ScreenBack from './../../assets/svgs/arrow-right.svg'
//@ts-ignore
export function InfoAdress({ navigation }) {

  const { width, height } = Dimensions.get("window")
  const [userId, setUserId] = useState('')
  
  const [bairro, setBairro] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')
  const [referencia, setReferencia] = useState('')

  const inputRef1 = useRef(null)
  const inputRef2 = useRef(null)
  const inputRef3 = useRef(null)
  const inputRef4 = useRef(null)

  useEffect(() => {
    const currentUser = auth().currentUser
    //@ts-ignore
    setUserId(currentUser.uid)
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: getStatusBarHeight(),
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />

        <View style={{
        width: width,
        paddingHorizontal: 30,
        marginTop: 0,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
      }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: 20
            }}
            onPress={() => {
              //@ts-ignore
              navigation.goBack()
            }}
          >
            <ScreenBack width={20} height={20} />
          </TouchableOpacity>

        
          <Text style={{
            fontSize: 20,
            alignSelf: 'center',
            color: '#323232',
          }}>
            Endereço
          </Text>
        </View>
      
        <View style={{ flex: 1, width: width, backgroundColor: '#fff', alignItems: 'center' }}>
          <View style={{
            width: '86%',
            height: '82%',
            justifyContent: 'space-between',
            marginTop: 25
          }}>
            <View>
              <View style={{ marginBottom: 30 }}>
                <Text style={styles.textos}>Bairro</Text>
                <TextInput
                  value={bairro}
                  onChangeText={setBairro}
                  placeholder='Digite aqui...'
                  placeholderTextColor={'#f1f1f1'}
                  style={styles.inputs}
                  //@ts-ignore
                  onSubmitEditing={() => inputRef1.current.focus()}
                  returnKeyType="next"
                />
              </View>

              <View style={{ marginBottom: 30 }}>
                <Text style={styles.textos}>Rua</Text>
                <TextInput
                  ref={inputRef1}
                  value={rua}
                  onChangeText={setRua}
                  placeholder='Digite aqui...'
                  placeholderTextColor={'#f1f1f1'}
                  style={styles.inputs}
                  //@ts-ignore
                  onSubmitEditing={() => inputRef2.current.focus()}
                  returnKeyType="next"
                />
              </View>

              <View style={{ marginBottom: 30 }}>
                <Text style={styles.textos}>Número</Text>
                <TextInput
                  ref={inputRef2}
                  value={numero}
                  onChangeText={setNumero}
                  keyboardType='numeric'
                  placeholder='Número de construção/casa'
                  placeholderTextColor={'#f1f1f1'}
                  style={styles.inputs}
                  //@ts-ignore
                  onSubmitEditing={() => inputRef3.current.focus()}
                  returnKeyType="next"
                />
              </View>

              <View style={{ marginBottom: 30 }}>
                <Text style={styles.textos}>Complemento</Text>
                <TextInput
                  ref={inputRef3}
                  value={complemento}
                  onChangeText={setComplemento}
                  placeholder='Apartamento, edificio,...'
                  placeholderTextColor={'#f1f1f1'}
                  style={styles.inputs}
                  //@ts-ignore
                  onSubmitEditing={() => inputRef4.current.focus()}
                  returnKeyType="next"
                />
              </View>

              <View style={{ marginBottom: 30 }}>
                <Text style={styles.textos}>Referência</Text>
                <TextInput
                  ref={inputRef4}
                  value={referencia}
                  onChangeText={setReferencia}
                  placeholder='Perto de...'
                  placeholderTextColor={'#f1f1f1'}
                  style={styles.inputs}
                  returnKeyType="done"
                />
              </View>
            </View>


            <View style={{
              marginTop: 15,
            }}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: 55,
                  paddingHorizontal: 20,
                  justifyContent: 'center',
                  backgroundColor: '#EE2F2A',
                  borderRadius: 10,
                  alignItems: 'center'
                }}
                onPress={() => {
                  firestore()
                    .collection('users')
                    .doc(`${userId}`)
                    .update({
                      bairro: bairro,
                      rua: rua,
                      numero: numero,
                      complemento: complemento,
                      referencia: referencia,
                      completo: true
                    })
                }}
              >
                <Text style={{
                  fontSize: 18,
                  fontFamily: 'Manrope-SemiBold',
                  color: '#fff',
                }}>
                  Continuar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>



  );
}
export const styles = StyleSheet.create({
  textos: {
    position: 'absolute',
    fontSize: 14,
    fontFamily: 'Manrope-SemiBold',
    color: '#323232',
    marginLeft: 10,
    marginTop: -12,
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
  }
})