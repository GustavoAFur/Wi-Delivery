import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Pressable,
  FlatList,
  Image,
  Dimensions,
} from 'react-native'
import { useEffect, useState } from 'react'

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import { getStatusBarHeight } from 'react-native-status-bar-height'

import Limpeza from '../../assets/images/beauty-product.png'
import HortiFruti from '../../assets/images/horti-fruti.png'
import Acougue from '../../assets/images/meet-fish.png'
import Bebidas from '../../assets/images/heineken.png'
import Sereais from '../../assets/images/rice.png'

import Mais from '../../assets/images/icons8-mais-100.png'

import IconNotification from '../../assets/svgs/notification.svg'

import SectionsListComponent from '../components/SectionsListComponent'
import { ItensOffers } from '../components/ItensOffers'
import { YourAdress } from '../components/YourAdress'
import { Products } from '../components/Products'
import { ProductsList } from '../components/PorductsList'


 interface  product {
    id: string
    name: string
    price: string
    category: string
    images: string[]
  }

interface Kit {
  id: string;
  nome: string;
  preco: string;
  imagem: string;
}
interface DadosUsuario{
    nome?: string
    email?: string
    rua?: string
    numero?: string
    bairro?: string
    imagem?: string
}

const dadosUsuario: DadosUsuario = {}; // Initialize dadosUsuario with an empty object
export function Home({ navigation }: { navigation: any }) {

  const { width, height } = Dimensions.get("window")

  const sessoes = [
    { nome: 'Cereais', value: 'Cereais', imagem: Sereais },
    { nome: 'Limpeza', value: 'limpeza', imagem: Limpeza },
    { nome: 'Açougue', value: 'acougue', imagem: Acougue },
    { nome: 'Bebidas', value: 'bebidas', imagem: Bebidas },
    { nome: 'Horti-Fruti', value: 'horti-fruti', imagem: HortiFruti },
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

  const [kitsList, setKitsList] = useState<Kit[]>([])
  const [products, setProducts] = useState<product[]>([])

  const [dadosUsuario, setDadosUsuario] = useState<DadosUsuario> ({})

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
            setDadosUsuario({id, ...data});
          }
        } else {
          console.log('No user is signed in');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData()
  },[dadosUsuario])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const produtosSnapShot = await firestore()
          .collection('products')
          .limit(10)
          .get()

        const arrayProducts: any = []
        produtosSnapShot.forEach((items) => {
          const id = items.id
          const item = items.data()
          arrayProducts.push({ id, ...item })
        })
        
        setProducts(arrayProducts)
      } catch (error) {
        console.error("Error fetching produtos: ", error)
      }
    }
    fetchProducts()
  }, [])



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
              style={{ width: '100%', height: '100%' }}
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
              {dadosUsuario.nome ?? ''}
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

      <YourAdress
        navTo={() => navigation.navigate('AdressDetails')}
        street={dadosUsuario.rua ?? ''}
        number={dadosUsuario.numero ?? ''}
        neighborhood={dadosUsuario.bairro ?? ''}
      />

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
          sessoes.map((item, index) => (
            <SectionsListComponent
              key={index}
              img={item.imagem}
              name={item.nome}
              navTo={() => {
                navigation.navigate('ProductsByCategory', { categoria: `${item.nome}`, filtroCategoria: `${item.value}` })
              }}
            />
          ))
        }

        <SectionsListComponent
          img={Mais}
          name={'Mais'}
          navTo={() => {
            navigation.navigate('SecoesList')
          }}
        />

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
          Recomendados
        </Text>
      </View>
      
      <ProductsList navigation={navigation} product={products}/>

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
        
      </View>
      
      <View style={{
        width: '100%',
        height: 150,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 20,
      }}>
        <Image
          source={require('../../assets/images/banner03.jpg')}
          style={{ width: '100%', height: '100%',borderRadius: 10, }}
        />
      </View>

      <View style={styles.Orffers}>
        <View style={styles.OrffersInfo}>
          <Text style={{
            color: '#030303',
            fontSize: 18,
            fontFamily: 'GeneralSans-Semibold',
          }}>
            Destaques do dia
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Orffers')
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{
              fontSize: 16,
              fontFamily: 'GeneralSans-Semibold',
              color: '#EE2F2A',
            }}>
              Ver mais
            </Text>
          </TouchableOpacity>

        </View>
      </View>

      <ProductsList navigation={navigation} product={products}/>

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
  scrollViewContentOrffersNews: {
    paddingHorizontal: 20,

  },
  scrollViewContentNews: {
    paddingHorizontal: 20,
    gap: 10
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
  Orffers: {
    marginTop: 16,
    marginBottom: 15
  },
  OrffersInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  OrffersItem: {
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
    width: '100%',
    height: 150,
    borderRadius: 10,
    resizeMode: 'contain',
    overflow: 'hidden',
    alignSelf: 'center',
    marginHorizontal: 20
  },
  btnAdicionar: {
    backgroundColor: '#EE2F2A',
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