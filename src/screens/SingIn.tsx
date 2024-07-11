import React, { useState } from 'react';
import { Dimensions, Image, KeyboardAvoidingView, Platform, StatusBar, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'

import auth from '@react-native-firebase/auth'
import LottieView from 'lottie-react-native';
//@ts-ignore
export function SingIn({ navigation }: { navigation: any }) {

  const { width, height } = Dimensions.get("window")

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: getStatusBarHeight(),
          paddingHorizontal: 20,
          backgroundColor: '#fff',
        }}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />

        <View
          style={{
            width: width,
            height: height * 0.4, // Ajuste de altura
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center'
          }}>
          <Image
            source={require('./../../assets/images/Product-hunt-bro.png')}
            resizeMode='contain'
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>

        <Text style={{
          fontSize: 24,
          fontFamily: 'GeneralSans-Light',
          color: '#0F1121',
          textAlign: 'left',
          marginVertical: 20,
        }}>
          Faça SingIn para uma melhor experiência
        </Text>

        <TextInput
          placeholder='E-mail'
          placeholderTextColor={'#7C7C7C'}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            borderColor: '#F2F3F3',
            borderWidth: 0.6,
            borderRadius: 8,
            color: '#000',
            fontSize: 16,
            fontFamily: 'GeneralSans-Light',
            paddingLeft: 10,
            marginBottom: 20,
          }}
        />

        <TextInput
          placeholder='Senha'
          placeholderTextColor={'#7C7C7C'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            borderColor: '#F2F3F3',
            borderWidth: 0.6,
            borderRadius: 8,
            color: '#000',
            fontSize: 16,
            fontFamily: 'GeneralSans-Light',
            paddingLeft: 10,
            marginBottom: 20,
          }}
        />

        <TouchableOpacity
          disabled={!email || !password ? true : false}
          onPress={() => {
            setIsLoading(true)

            auth()
              .signInWithEmailAndPassword(`${email}`, `${password}`)
              .catch(error => {
                if (error.code === 'auth/email-already-in-use') 
                  Alert.alert('That email address is already in use!')
                
                if (error.code === 'auth/invalid-email') 
                  Alert.alert('That email address is invalid!')
                
                console.error(error)
              }).finally(() => {
                setIsLoading(false)
              })
          }}
          style={{
            backgroundColor: '#EE2F2A',
            borderRadius: 8,
            width: '95%',
            height: 50,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          {
            isLoading ?
              <LottieView
                autoPlay
                loop
                source={require('../../assets/json/Animation-Red.json')}
                style={{ width: 60, height: 60 }}
              /> :
              <Text style={{
                fontSize: 16,
                fontFamily: 'GeneralSans-Semibold',
                color: '#fff',
              }}>
                Entrar
              </Text>
          }
        </TouchableOpacity>

        <View
          style={{
            width: '95%',
            height: 50,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            flexDirection: 'row',
            gap: 5
          }}
        >
          <Text style={{
            fontSize: 16,
            fontFamily: 'GeneralSans-Medium',
            color: '#7C7C7C',
          }}>
            Ainda não tem conta?
          </Text>
          <TouchableOpacity
            onPress={()=>{
              navigation.navigate('SignUp')
            }}
          >
            <Text style={{
              fontSize: 16,
              fontFamily: 'GeneralSans-Semibold',
              color: '#7C7C7C',
            }}>
              Criar conta
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
