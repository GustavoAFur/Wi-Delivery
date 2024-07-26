import { Alert, Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import ScreenBack from '../../assets/svgs/arrow-right.svg'
import { getStatusBarHeight } from "react-native-status-bar-height";

import { useEffect, useState } from "react"

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

export function MyDetails({ navigation }: { navigation: any }) {

  const { width, height } = Dimensions.get("window")

  const [dadosUsuario, setDadosUsuario] = useState({})
  //@ts-ignore
  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [telefone, setTelefone] = useState('')

  const atualizarDados = async () => {
    try {
      const currentUser = auth().currentUser;

      if (currentUser) {
        await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .update({
            nome: nome,
            sobrenome: sobrenome,
            telefone: telefone
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
            const id = documentSnapshot.id
            const data = documentSnapshot.data()
            //@ts-ignore
            setNome(data.nome)
            //@ts-ignore
            setSobrenome(data.sobrenome)
            //@ts-ignore
            setTelefone(data.telefone)
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
          Meus Detalhes
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
            width: 120,
            height: 120,
            alignSelf: 'center',
            marginTop: 20
          }}
        >
          <View
            style={{
              backgroundColor: '#a0a0f7',
              opacity: .3,
              width: 120,
              height: 120,
              borderRadius: 60
            }}
          >

          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#00f',
              width: 30,
              height: 30,
              borderRadius: 15,
              position: 'absolute',
              bottom: 5,
              right: 5,
              borderColor: '#fff',
              borderWidth: 2,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Image
              source={require('../../assets/images/icon-mais.png')}
              style={{
                width: 15,
                height: 15
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: width,
            paddingHorizontal: 30,
            paddingVertical: 20,
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
              Nome:
            </Text>
            <TextInput
              value={nome}
              onChangeText={setNome}
              placeholder="Seu nome"
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
              Sobrenome:
            </Text>
            <TextInput
              value={sobrenome}
              onChangeText={setSobrenome}
              placeholder="Seu nome"
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
              Telefone:
            </Text>
            <TextInput
              value={telefone}
              onChangeText={setTelefone}
              placeholder="Seu telefone"
              placeholderTextColor={'#0008'}
              style={styles.inputs}
            />
          </View>

        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              atualizarDados()
            }}
            style={{
              backgroundColor: '#EE2F2A',
              paddingHorizontal: 40,
              paddingVertical: 10,
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