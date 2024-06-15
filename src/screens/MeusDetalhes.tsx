import { Alert, Dimensions, Image, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";

import ScreenBack from './../../assets/svgs/arrow-right.svg'
import { getStatusBarHeight } from "react-native-status-bar-height";

import { useEffect, useState } from "react"

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

export function MeusDetalhes({navigation} : {navigation : any}){

  const { width, height } = Dimensions.get("window")

  const [dadosUsuario, setDadosUsuario] = useState({})
  //@ts-ignore
  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [telefone, setTelefone] = useState('')

  const atualizarDados = async () =>{
    try{
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
    }catch(error){
      Alert.alert('Erro ao atualizar usuario')
      
    }
  }

  useEffect(()=>{
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
  },[])

  return(
    <View
      style={{
        width: width,
        height: height + getStatusBarHeight(),
        paddingTop: getStatusBarHeight(),
        flex: 1,
        backgroundColor: '#fff'
      }}
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
          Meus Detalhes
        </Text>
      </View>

      <View
        style={{
          flex: 1
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
            gap: 20
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
              style={{
                borderBottomColor: '#0008',
                borderBottomWidth: .5,
                color: '#0008',
              }}
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
              style={{
                borderBottomColor: '#0008',
                borderBottomWidth: .5,
                color: '#0008',
              }}
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
              style={{
                borderBottomColor: '#0008',
                borderBottomWidth: .5,
                color: '#0008',
              }}
            />
          </View>
          
        </View>

        <TouchableOpacity
        onPress={()=>{
          atualizarDados()
        }}
        style={{
          backgroundColor: '#EE2F2A',
          paddingHorizontal: 40,
          paddingVertical: 10,
          alignSelf: 'center',
          borderRadius: 40,
          marginTop: 60
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
  )
}