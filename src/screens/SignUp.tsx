import React, { useState } from 'react'
import { Dimensions, Image, KeyboardAvoidingView, Platform, StatusBar, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import firestore from '@react-native-firebase/firestore'

import auth from '@react-native-firebase/auth'
import LottieView from 'lottie-react-native'
//@ts-ignore
export function SignUp({ navigation }: { navigation: any }) {

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
            source={require('../../assets/images/Mobile-login-bro.png')}
            resizeMode='contain'
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>

        <Text style={{
          fontSize: 24,
          fontFamily: 'DMSans-Light',
          color: '#0F1121',
          textAlign: 'center',
          marginVertical: 20,
        }}>
          Crie sua conta!
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
            fontFamily: 'DMSans-Light',
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
            fontFamily: 'DMSans-Light',
            paddingLeft: 10,
            marginBottom: 20,
          }}
        />

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
        <TouchableOpacity
          disabled={!email || !password ? true : false}
          onPress={() => {
            setIsCreating(true)
            auth()
              .createUserWithEmailAndPassword(`${email}`, `${password}`)
              .then(userCredential => {
                // Cria um documento no Firestore com o mesmo ID do usuário
                return firestore()
                  .collection('users')
                  .doc(userCredential.user.uid)
                  .set({
                    completo: false,
                    email: userCredential.user.email,
                    dataCriacao: new Date()
                  });
              })
              .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                  Alert.alert('Este e-mail já está em uso!');
                }

                if (error.code === 'auth/invalid-email') {
                  Alert.alert('E-mail inválido!');
                }

                console.error(error);
              }).finally(() => {
                setIsCreating(false)
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
            isCreating ?
              <LottieView
                autoPlay
                loop
                source={require('../../assets/json/Animation-Red.json')}
                style={{ width: 60, height: 60 }}
              /> :
              <Text style={{
                fontSize: 16,
                fontFamily: 'DMSans-SemiBold',
                color: '#fff',
              }}>
                Criar conta
              </Text>
          }

        </TouchableOpacity>
        </View>
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
            fontFamily: 'DMSans-Medium',
            color: '#7C7C7C',
          }}>
            Já tem uma conta?
          </Text>
          <TouchableOpacity
            onPress={()=>{
              navigation.navigate('SignIn')
            }}
          >
            <Text style={{
              fontSize: 16,
              fontFamily: 'DMSans-SemiBold',
              color: '#EE2F2A',
            }}>
              Entrar
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
