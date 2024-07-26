import { Alert, Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import ScreenBack from '../../assets/svgs/arrow-right.svg'

import { getStatusBarHeight } from "react-native-status-bar-height";

import { useEffect, useState } from "react"

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

export function AdressDetails({ navigation }: { navigation: any }) {

  const { width, height } = Dimensions.get("window")

  const [bairro, setBairro] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')
  const [referencia, setReferencia] = useState('')

  const atualizarDados = async () => {
    try {
      const currentUser = auth().currentUser;

      if (currentUser) {
        await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .update({
            bairro: bairro,
            rua: rua,
            numero: numero,
            complemento: complemento,
            referencia: referencia
          })

        Alert.alert('Usuário atualizado')
        navigation.goBack()
      }
    } catch (error) {
      Alert.alert('Erro ao atualizar usuario')

    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth().currentUser;

        if (currentUser) {
          const documentSnapshot = await firestore()
            .collection('users')
            .doc(currentUser.uid)
            .get();

          if (documentSnapshot.exists) {
            const data = documentSnapshot.data()
            //@ts-ignore
            setBairro(data.bairro)
            //@ts-ignore
            setRua(data.rua)
            //@ts-ignore
            setNumero(data.numero)
            //@ts-ignore
            setComplemento(data.complemento)
            //@ts-ignore
            setReferencia(data.referencia)
          }
        } else {
          console.log('No user is signed in');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData()
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
          paddingHorizontal: 20,
          backgroundColor: '#fff',
        }}
        keyboardShouldPersistTaps="handled"
      >
      <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />
      <View style={{
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
      }}>
        <TouchableOpacity
          style={{
            width: 20,
            height: 20,
            alignItems: 'center',
            justifyContent: 'center',
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
          fontSize: 18,
          alignSelf: 'center',
          color: '#323232',
          fontFamily: 'GeneralSans-Semibold'
        }}>
          Detalhes Endereço
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center'
        }}
      >
        <View
          style={{
            width: width,
            paddingHorizontal: 30,
            marginTop: 40,
            gap: 10
          }}
        >
          <View>
            <Text style={{
              fontSize: 18,
              color: '#000',
              fontFamily: 'GeneralSans-Semibold',
            }}>
              Bairro:
            </Text>
            <TextInput
              value={bairro}
              onChangeText={setBairro}
              placeholder="Ex: Centro"
              placeholderTextColor={'#0008'}
              style={styles.inputs}
            />
          </View>

          <View>
            <Text style={{
              fontSize: 18,
              color: '#000',
              fontFamily: 'GeneralSans-Semibold',
            }}>
              Rua:
            </Text>
            <TextInput
              value={rua}
              onChangeText={setRua}
              placeholder="Digite aqui..."
              placeholderTextColor={'#0008'}
              style={styles.inputs}
            />
          </View>

          <View>
            <Text style={{
              fontSize: 18,
              color: '#000',
              fontFamily: 'GeneralSans-Semibold',
            }}>
              Número:
            </Text>
            <TextInput
              value={numero}
              onChangeText={setNumero}
              placeholder="Digite aqui..."
              placeholderTextColor={'#0008'}
              style={styles.inputs}
            />
          </View>

          <View>
            <Text style={{
              fontSize: 18,
              color: '#000',
              fontFamily: 'GeneralSans-Semibold',
            }}>
              Complemento:
            </Text>
            <TextInput
              value={complemento}
              onChangeText={setComplemento}
              placeholder="Ex: Apto 03..."
              placeholderTextColor={'#0008'}
              style={styles.inputs}
            />
          </View>

          <View>
            <Text style={{
              fontSize: 18,
              color: '#000',
              fontFamily: 'GeneralSans-Semibold',
            }}>
              Referência:
            </Text>
            <TextInput
              value={referencia}
              onChangeText={setReferencia}
              placeholder="Perto de..."
              placeholderTextColor={'#0008'}
              style={styles.inputs}
            />
          </View>

          <TouchableOpacity
          onPress={() => {
            atualizarDados()
          }}
          style={{
            backgroundColor: '#EE2F2A',
            paddingHorizontal: 40,
            paddingVertical: 10,
            alignSelf: 'center',
            borderRadius: 40,
          }}
        >
          <Text style={{
            fontSize: 18,
            color: '#fff',
            fontFamily: 'GeneralSans-Semibold',
          }}>
            Atualizar
          </Text>
        </TouchableOpacity>

        </View>
        
        
        
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}
export const styles = StyleSheet.create({
  inputs: {
    borderColor: '#0008',
    borderWidth: 0.6,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: 'GeneralSans-Light',
    paddingLeft: 10,
    marginVertical: 10,
    color: '#0008',
  }
})