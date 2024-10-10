import { View, Text, Dimensions, TextInput, StyleSheet, KeyboardAvoidingView, Platform, StatusBar, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import { getStatusBarHeight } from 'react-native-status-bar-height'

import ScreenBack from '../../assets/svgs/arrow-right.svg'

import { useAuth } from '../hooks/auth'

export function InfoAdress({ navigation }: { navigation: any }) {

  const { width, height } = Dimensions.get("window")
  const [userId, setUserId] = useState('')

  const {
    province,
    setProvince,
    street,
    setStreet,
    number,
    setNumber,
    complement,
    setComplement,  
    reference,
    setReference,
    name,
    cpfCnpj,
    lastName,
    phone,
  } = useAuth()


  const inputRef1 = useRef(null)
  const inputRef2 = useRef(null)
  const inputRef3 = useRef(null)
  const inputRef4 = useRef(null)

  useEffect(() => {
    const currentUser = auth().currentUser
    //@ts-ignore
    setUserId(currentUser.uid)
  }, [])

  async function createClient() {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        access_token: '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwODA1MDU6OiRhYWNoX2M2ZjcxNTQzLTc0MzMtNGJjZi1hNzNhLTQyNmIxMzJlMjYzNQ==',
      },
      body: JSON.stringify({
        name: name + '' + lastName,
        cpfCnpj: cpfCnpj,
        email: auth().currentUser?.email,
        mobilePhone: phone,
        address: street,
        addressNumber: number,
        complement: complement,
        province: province,
        notificationDisabled: false,
      })
    };
  
    try {
      const response = await fetch('https://sandbox.asaas.com/api/v3/customers', options);
  
      if (!response.ok) {
        const errorMessage = await response.text();  // Captura a mensagem de erro da resposta
        Alert.alert('Erro', `Request failed with status ${response.status}: ${errorMessage}`);
        throw new Error(`Request failed with status ${response.status}: ${errorMessage}`);
      }
  
      const data = await response.json();
      await firestore()
      .collection('users')
      .doc(`${userId}`)
      .update(
        data
      );
      
      console.log('Client created and Firestore updated successfully');
    } catch (err) {
      console.error('Error:',err);
    }
  }
  

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
              navigation.goBack()
            }}
          >
            <ScreenBack width={20} height={20} />
          </TouchableOpacity>


          <Text style={{
            fontSize: 20,
            fontFamily: 'DMSans-SemiBold',
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
                  value={province}
                  onChangeText={setProvince}
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
                  value={street}
                  onChangeText={setStreet}
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
                  value={number}
                  onChangeText={setNumber}
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
                  value={complement}
                  onChangeText={setComplement}
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
                  value={reference}
                  onChangeText={setReference}
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
                  createClient()
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