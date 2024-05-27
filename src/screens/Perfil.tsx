import { View, Text, StyleSheet,Image, Dimensions, StatusBar } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import React, { useState } from 'react'

import auth from '@react-native-firebase/auth'

import DetliveryAdress from './../../assets/svgs/delivery-address.svg'
import Detalhes from './../../assets/svgs/details.svg'
import Arrow from './../../assets/svgs/back-arrow.svg'
import About from './../../assets/svgs/about icon.svg'
import Help from './../../assets/svgs/help icon.svg'
import Logout from './../../assets/svgs/logoutw.svg'

//@ts-ignore
export function Perfil({navigation}) {
  const { width, height } = Dimensions.get("window")

  return (
    <View style={{ 
      width: width,
      height: height +getStatusBarHeight(),
      paddingTop: getStatusBarHeight(),
      backgroundColor: '#fff'
    }}>
      <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      }}>
        <View style={styles.header}>
          <View style={styles.perfilFoto}>
            <View style={{
              width: 75,
              height: 75,
              borderRadius: 20,
              backgroundColor: '#a0a0f7'
            }}>
              <Image 
                source={require('./../../assets/images/bolsa-de-compras.png')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
          </View>
          <View style={styles.perfilInfos}>
            <Text style={{
              color: '#000',
              fontFamily: 'GeneralSans-Bold', 
              fontSize: 15,
            }}>
              Gustavo A. Furtado
            </Text>
            <Text style={{
              color: '#c6c6c6',
              fontFamily: 'GeneralSans-Semibold', 
              fontSize: 15
            }}>
              gustavoaragaof@gmail.com
            </Text>
          </View>
        </View>

        <View style={{width: '88%', alignSelf: 'center'}}>
          <TouchableOpacity>
            <View style={styles.optionsPerfil}>
              <View style={styles.iconText}>
                <Detalhes width={20} height={20}/>
                <Text style={styles.optionText}>Meus Detalhes</Text>
              </View>
              <Arrow width={15} height={15}/>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity>
            <View style={styles.optionsPerfil}>
              <View style={styles.iconText}>
                <DetliveryAdress width={20} height={20}/>
                <Text style={styles.optionText}>Detalhes Endereço</Text>
              </View>
              <Arrow width={15} height={15}/>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity>
            <View style={styles.optionsPerfil}>
              <View style={styles.iconText}>
                <About width={20} height={20}/>
                <Text style={styles.optionText}>Sobre</Text>
              </View>
              <Arrow width={15} height={15}/>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity>
            <View style={styles.optionsPerfil}>
              <View style={styles.iconText}>
                <Help width={20} height={20}/>
                <Text style={styles.optionText}>Ajuda</Text>
              </View>
              <Arrow width={15} height={15}/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=>{
              auth()
              .signOut()
              .then(() => console.log('User signed out!'))
            }}
          >
            <View style={styles.btnSair}>
              <Logout width={20} height={20} style={{position: 'absolute', left: 20}}/>
              <Text 
                style={{
                  color: '#fff', 
                  fontFamily: 'GeneralSans-Bold', 
                  fontSize: 18, 
                }}
              >
                Sair
              </Text>
            </View>
          </TouchableOpacity>
          

        </View>

      </View>
    </View>
    
  );
}
export const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 140,
    flexDirection: 'row',
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: .5
  },
  perfilFoto: {
    width: '35%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  perfilInfos: {
    width: '65%',
    height: '100%',
    justifyContent: 'center',
    
  },
  optionsPerfil:{
    flexDirection: 'row',
    justifyContent: 'space-between', 
    paddingVertical: 25,
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: .5
  },
  iconText: {
    width: '70%', 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  optionText: {
    color: '#181725', 
    fontFamily: 'GeneralSans-Semibold', 
    fontSize: 16,
    paddingLeft: 8
  },
  btnSair: {
    backgroundColor: '#EE2F2A',
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    width: '85%', 
    height: 55,
    alignSelf: 'center',
    marginTop: 80,
    borderRadius: 10,
  }
})
