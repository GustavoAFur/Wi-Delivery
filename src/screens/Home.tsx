import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View, Pressable, 
  FlatList,
  Image,
} from 'react-native'

import { getStatusBarHeight } from 'react-native-status-bar-height'

import Limpeza from './../../assets/images/beauty-product.png'
import HortiFruti from './../../assets/images/horti-fruti.png'
import Acougue from './../../assets/images/meet-fish.png'
import Bebidas from './../../assets/images/heineken.png'
import Sereais from './../../assets/images/rice.png'

import IconNotification from '../../assets/svgs/notification.svg'

import SecoesListComponent from './SecoesListComponent'
import { ItensOferta } from './ItensOferta'
import { useEffect, useState } from 'react'

import firestore from '@react-native-firebase/firestore'

export function Home({ navigation }: { navigation: any }) {

  const sessoes = [
    {nome: 'Cereais', value: 'cereais', imagem: Sereais},
    {nome: 'Limpeza', value: 'limpeza', imagem: Limpeza},
    {nome: 'Açougue', value: 'acougue', imagem: Acougue},
    {nome: 'Bebidas', value: 'bebidas', imagem: Bebidas},
    {nome: 'Horti-Fruti', value: 'horti-fruti', imagem: HortiFruti},
  ]

  const horaAtual = new Date().getHours()
  let saudacaoApp

  if (horaAtual >= 5 && horaAtual < 12) {
    saudacaoApp = 'Bom dia,'
  } else if (horaAtual >= 12 && horaAtual < 18) {
    saudacaoApp = 'Boa tarde,'
  } else {
    saudacaoApp = 'Boa noite,'
  }
  
  const [kitsList, setKitsList] = useState([])

  useEffect(()=>{
    const kits = async () =>{
      try{
        const produtosSnapShot = await firestore()
        .collection('kits')
        .get()
        //@ts-ignore
        const arrayKits = []
        produtosSnapShot.forEach((kits)=>{
          const id = kits.id
          const kit = kits.data()
          arrayKits.push({id,...kit})
        })
        //@ts-ignore
        setKitsList(arrayKits)
      }catch(error) {
        console.error("Error fetching produtos: ", error)
      }
    }
    kits()
    console.log(kitsList)
  },[])

  return (
    <ScrollView 
      keyboardShouldPersistTaps="always" 
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={{
        paddingBottom: 100
      }}
      style={{
        backgroundColor: '#ffff',
        
      }}
    >

      <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />

      <View style={{
        marginTop: getStatusBarHeight() + 24,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              borderWidth: 2,
              borderColor: '#FDE933',
              backgroundColor: '#a0a0f7'
            }}
          >
            <Image 
                source={require('./../../assets/images/bolsa-de-compras.png')}
                style={{width: '100%', height: '100%'}}
              />
          </View>

          <View style={{
            marginLeft: 12,
            justifyContent: 'space-between'
          }}>

            <Text style={{
              fontSize: 13,
              fontFamily: 'GeneralSans-Medium',
              color: '#67697A',
            }}>
              {saudacaoApp}
            </Text>

            <Text style={{
              fontSize: 15,
              fontFamily: 'GeneralSans-Semibold',
              color: '#0F1121',
            }}>
              Gustavo
            </Text>


          </View>
        </View>

        <Pressable style={{
          width: 42,
          height: 42,
          alignItems: 'center',
          justifyContent: 'center',
        }}
          onPress={() => navigation.navigate('VideoFullScreen', { categoria: 'Entradas' })}
        >

          <IconNotification />
        </Pressable>
      </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            gap: 10
          }}
          style={{
            marginTop: 20,
            marginBottom: 10
          }}
        >
          {
            sessoes.map((item,index)=>(
              <SecoesListComponent 
                key={index}
                img={item.imagem} 
                name={item.nome}
                navTo={()=>{
                  navigation.navigate('ProdutosPorCategoria', { categoria: `${item.nome}`, filtroCategoria: `${item.value}`})
                }}
              />
            ))
          }
        </ScrollView>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        paddingHorizontal: 20,
      }}>
        <Text style={{
          color: '#030303',
          fontSize: 18,
          fontFamily: 'GeneralSans-Semibold',
        }}>
          Novidades
        </Text>
        <TouchableOpacity style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: 16,
            fontFamily: 'GeneralSans-Semibold',
            color: '#D9042B',
          }}>Ver mais</Text>

        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollViewContentNews}>
        <View style={styles.novidadesItem}></View>
        <View style={styles.novidadesItem}></View>
        <View style={styles.novidadesItem}></View>
      </ScrollView>

      <View style={styles.ofertas}>
        <View style={styles.ofertasInfo}>
          <Text style={{
            color: '#030303',
            fontSize: 18,
            fontFamily: 'GeneralSans-Semibold',
          }}>
            Destaques do dia
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Ofertas')
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{ 
              fontSize: 16,
              fontFamily: 'GeneralSans-Semibold',
              color: '#D9042B',
            }}>
              Ver mais
            </Text>
          </TouchableOpacity>

        </View>
      </View>

      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 30,
        }}
        data={kitsList}
        //  @ts-ignore
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ItensOferta
            //@ts-ignore
            name={item.nome}
            //@ts-ignore
            price={item.preco}
            //@ts-ignore
            imagem={item.imagem}
            //@ts-ignore
            navTo={() => {
              //@ts-ignore
              navigation.navigate('DetalhesKit', {item: item})
              //@ts-ignore
              console.log(item.id)
            }}

          />
        )}
      />

    </ScrollView>

  )
}
export const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    width: '88%',
    height: 45,
    alignSelf: 'center',
    borderRadius: 16,
    paddingLeft: 20,
    justifyContent: 'center'
  },
  header: {
    backgroundColor: '#F2B705',
    width: '100%',
    height: 195,
    paddingTop: 20
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '82%',
    alignItems: 'center'
  },
  notification: {
    backgroundColor: '#fff',
    width: 42,
    height: 42,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  userDetails: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },

  scrollViewContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  scrollViewContentOfertasNews: {
    paddingHorizontal: 20,

  },
  scrollViewContentNews: {
    paddingHorizontal: 30,
  },
  scrollViewMain: {
    backgroundColor: '#FFFFFF'
  },
  sectionsItens: {
    width: 88,
    height: 108,
    marginRight: 6,
    alignItems: 'center',

  },
  sectionsImg: {
    backgroundColor: '#FFF',
    width: 73,
    height: 73,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 37,
  },
  imageStyle: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  menuIcon: {
    backgroundColor: '#fff',
    width: 46,
    height: 46,
    borderRadius: 23
  },
  ofertas: {
    marginTop: 16,
    marginBottom: 15
  },
  ofertasInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  ofertasItem: {
    borderWidth: 0.5,
    borderColor: '#d2d2d2',
    width: 140,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',

  },
  novidadesInfo: {

  },
  novidadesItens: {
    paddingHorizontal: 10,
  },
  novidadesItem: {
    borderWidth: 1,
    borderColor: '#d2d2d2',
    backgroundColor: '#fff',
    width: 220,
    height: 130,
    borderRadius: 10,
    marginRight: 10,
  },
  btnAdicionar: {
    backgroundColor: '#D9042B',
    width: '100%',
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  imgProdView: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgProd: {
    width: 80,
    height: 80
  },
  detailsProd: {
    width: '86%',
    height: '45%',
    alignSelf: 'center',
    justifyContent: 'space-between',

  },
  menosMais: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#d2d2d2',
    borderWidth: .5,
  },

});