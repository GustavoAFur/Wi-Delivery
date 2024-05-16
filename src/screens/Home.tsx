import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View, Pressable, 
  FlatList,
} from 'react-native'

import { NavigationProp, useRoute } from '@react-navigation/native'

import ArrowRight from './../../assets/svgs/arrow-p.svg'
import IconNotification from '../../assets/svgs/notification.svg'

import { ItensOferta } from './ItensOferta'

import firestore from '@react-native-firebase/firestore'
import { useAuth } from '../hooks/auth'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export function Home({ navigation }: { navigation: any }) {

  const kitBasico = "https://www.kitranchoescolhacerta.com.br/wp-content/uploads/2018/01/kit-rancho.png"
  const kitLimpeza = "https://calvo.com.br/wp-content/uploads/2022/08/CESTA-CLEAN-MASTER.png"
  const kitPremium = "https://calvo.com.br/wp-content/uploads/2022/10/KIT-ESMERALDA.png"
  const kitMaster = "https://calvo.com.br/wp-content/uploads/2022/10/KIT-ESMERALDA.png"

  const ofertas = [
    { id_: 1, nome: 'Kit Básico', preco: '50.00', caminho: kitBasico, itens: [{ qtd: 3, item: 'Arroz' }, { qtd: 2, item: 'Feijão' }, { qtd: 5, item: 'Macarrão ' }, { qtd: 5, item: 'Macarrão ' }] },
    { id_: 2, nome: 'Kit Limpeza', preco: '88.50', caminho: kitLimpeza, itens: [{ qtd: 2, item: 'Detergente' }] },
    { id_: 3, nome: 'Kit Premium', preco: '659.00', caminho: kitPremium, itens: [{ qtd: 1, item: 'Feijão' }] },
    { id_: 4, nome: 'Kit Master', preco: '799.00 ', caminho: kitMaster, itens: [{ qtd: 4, item: 'Macarrão' }] },
  ]

  const { kitsCarrinho, setKitsCarrinho } = useAuth()

  const limitedData = ofertas.slice(0, 5)

  const horaAtual = new Date().getHours()
  let saudacaoApp

  if (horaAtual >= 5 && horaAtual < 12) {
    saudacaoApp = 'Bom dia,'
  } else if (horaAtual >= 12 && horaAtual < 18) {
    saudacaoApp = 'Boa tarde,'
  } else {
    saudacaoApp = 'Boa noite,'
  }
  
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
              backgroundColor: '#4A68FF'
            }}
          >
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

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
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
        data={limitedData}
        //  @ts-ignore
        keyExtractor={item => item.id_}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ItensOferta
            //@ts-ignore
            name={item.nome}
            //@ts-ignore
            price={item.preco}
            //@ts-ignore
            imagem={item.caminho}
            //@ts-ignore
            navTo={() => {
              navigation.navigate('DetalhesKit', { nome: item.nome, preco: item.preco, imagem: item.caminho, itens: item.itens, kit: item })
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