import { View, Text, Dimensions, TextInput, StyleSheet, KeyboardAvoidingView, Platform, StatusBar, ScrollView } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { TouchableOpacity } from 'react-native-gesture-handler'
import React, { useEffect, useRef, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import MaskInput, { Masks } from 'react-native-mask-input'

import { useAuth } from '../hooks/auth'
//@ts-ignore
export function InfoPersonalDetails({ navigation }) {
  const { width, height } = Dimensions.get("window")

  const { 
    name,
    setName,
    cpfCnpj,
    setCpfCnpj,
    lastName,
    setLastName,
    phone,
    setPhone
  } = useAuth()

  const [userId, setUserId] = useState('')

  const inputRef1 = useRef(null)
  const inputRef2 = useRef(null)
  const inputRef3 = useRef(null)

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
          paddingTop: getStatusBarHeight(),
          paddingHorizontal: 20,
          backgroundColor: '#fff',
          alignItems: 'center'
        }}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />

        <View style={{ alignItems: 'center' }}>
          <Text style={{
            fontSize: 20,
            alignSelf: 'center',
            color: '#323232',
            fontFamily: 'DMSans-SemiBold'
          }}>
            Dados Pessoais
          </Text>
        </View>
        <View style={{ width: 20, height: 20 }}></View>
        <View style={{ flex: 1, width: width, backgroundColor: '#fff', alignItems: 'center' }}>

          <View style={{
            width: '86%',
            height: '82%',
            justifyContent: 'space-between',
            marginTop: 25,

          }}>
            <View>
              <View style={{ marginBottom: 30 }}>
                <Text style={styles.textos}>Primeiro nome</Text>
                <TextInput
                  returnKeyType="next"
                  //@ts-ignore
                  onSubmitEditing={() => inputRef1.current.focus()}
                  value={name}
                  onChangeText={setName}
                  placeholder='Digite aqui...'
                  placeholderTextColor={'#f1f1f1'}
                  style={styles.inputs}
                />
              </View>

              <View style={{ marginBottom: 30 }}>
                <Text style={styles.textos}>Sobrenome</Text>
                <TextInput
                  ref={inputRef1}
                  returnKeyType="next"
                  //@ts-ignore
                  onSubmitEditing={() => inputRef2.current.focus()}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder='Digite aqui...'
                  placeholderTextColor={'#f1f1f1'}
                  style={styles.inputs}
                />
              </View>

              <View style={{ marginBottom: 30 }}>
                <Text style={styles.textos}>CPF</Text>
                <MaskInput
                  ref={inputRef2}
                  returnKeyType="next"
                  keyboardType="decimal-pad"
                        autoComplete='off'
                        placeholder="CPF ou CNPJ"
                        autoCorrect={false}
                        mask={Masks.BRL_CPF_CNPJ}
                  //@ts-ignore
                  onSubmitEditing={() => inputRef3.current.focus()}
                  value={cpfCnpj}
                  onChangeText={setCpfCnpj}
                  placeholderTextColor={'#f1f1f1'}
                  style={styles.inputs}
                />
              </View>

              <View style={{ marginBottom: 30 }}>
                <Text style={styles.textos}>Telefone</Text>
                <MaskInput
                  ref={inputRef3}
                  value={phone}
                  mask={Masks.BRL_PHONE}
                  onChangeText={setPhone}
                  placeholder='Digite aqui...'
                  keyboardType="numeric"
                  placeholderTextColor={'#f1f1f1'}
                  style={styles.inputs}
                  returnKeyType="done"
                />
              </View>
            </View>


            <View style={{
              marginTop: 15,
              opacity: name == '' || lastName == '' || cpfCnpj == '' ? 0.5 : 1
            }}>
              <TouchableOpacity
              disabled={name == '' || lastName == '' || cpfCnpj == '' ? true : false}
                style={{
                  width: '100%',
                  height: 55,
                  paddingHorizontal: 20,
                  justifyContent: 'center',
                  backgroundColor: '#EE2F2A',
                  borderRadius: 10,
                  alignItems: 'center',
                }}
                onPress={() => {
                  navigation.navigate('InfoAdress')

                }}
              >
                <Text style={{
                  fontSize: 18,
                  fontFamily: 'DMSans-SemiBold',
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
    fontFamily: 'DMSans-SemiBold',
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
    fontFamily: 'DMSans-SemiBold',
  }
})