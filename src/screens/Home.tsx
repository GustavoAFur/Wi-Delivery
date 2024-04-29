import { 
  Image, 
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,Pressable, PressableProps, Alert,
  FlatList,
  Modal} from 'react-native'

import { NavigationProp, useRoute } from '@react-navigation/native'

import More from './../../assets/svgs/more.svg'

import Search from './../../assets/svgs/search.svg'
import ArrowRight from './../../assets/svgs/arrow-p.svg'

import Notification from './../../assets/svgs/notification.svg'

import Cereais from './../../assets/images/rice.png'
import Acougue from './../../assets/images/meet-fish.png'
import Hortifruti from './../../assets/images/horti-fruti.png'
import Perfumaria from './../../assets/images/beauty-product.png'
import Limpeza from './../../assets/images/Produtos-de-Limpeza.png'

import { useEffect, useState } from 'react'
import { ItensOferta } from './ItensOferta'

import firestore from '@react-native-firebase/firestore'
import { useAuth } from '../hooks/auth'

//@ts-ignore
export function Home({navigation}) {

  
  const route = useRoute()

  const sectionsObj = [
    { name: 'Cereais', img: Cereais },
    { name: 'Açougue', img: Acougue},
    { name: 'Horti-Fruti', img: Hortifruti },
    { name: 'Perfumaria', img: Perfumaria },
    { name: 'Limpeza', img: Limpeza },
  ]

  const kitBasico = "https://www.kitranchoescolhacerta.com.br/wp-content/uploads/2018/01/kit-rancho.png"
  const kitLimpeza = "https://calvo.com.br/wp-content/uploads/2022/08/CESTA-CLEAN-MASTER.png"
  const kitPremium = "https://calvo.com.br/wp-content/uploads/2022/10/KIT-ESMERALDA.png"
  const kitMaster = "https://calvo.com.br/wp-content/uploads/2022/10/KIT-ESMERALDA.png"

  const ofertas = [
    {id_: 1, nome: 'Kit Básico', preco: '50.00', caminho: kitBasico, itens: [{qtd: 3, item: 'Arroz'},{qtd: 2, item: 'Feijão'},{qtd: 5, item: 'Macarrão '},{qtd: 5, item: 'Macarrão '}]},
    {id_: 2, nome: 'Kit Limpeza', preco: '88.50', caminho: kitLimpeza, itens: [{qtd: 2, item: 'Detergente'}]},
    {id_: 3, nome: 'Kit Premium', preco: '659.00',caminho: kitPremium, itens: [{qtd: 1, item: 'Feijão'}]},
    {id_: 4, nome: 'Kit Master', preco: '799.00 ',caminho: kitMaster, itens: [{qtd: 4, item: 'Macarrão'}]},
  ]


  const {kitsCarrinho, setKitsCarrinho} = useAuth()

  const [modalVisible, setModalVisible] = useState(false)

  const limitedData = ofertas.slice(0, 5)

  useEffect(()=>{
    console.log(kitsCarrinho)
  },[kitsCarrinho])


  return (
    <View style={{ width: '100%', flex: 1, backgroundColor: '#F5F5F5' }}>

    <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />
    
    <ScrollView contentContainerStyle={styles.scrollViewMain}>
      <View style={styles.header}>
        <View style={styles.details}>

          <View style={styles.userDetails}>
            <Text style={{color: '#fff', fontSize: 12,  fontFamily: 'Manrope-SemiBold',  }}>Loja 1 - Reriutaba</Text>
            <Text style={{color: '#fff', fontSize: 15,  fontFamily: 'Manrope-SemiBold',  }}>Gustavo Furtado</Text>
          </View>
          <View style={styles.notification}>
            <Notification />
          </View>
        </View>
        <TouchableOpacity 
        onPress={()=>{navigation.navigate('Procurar')}}
        >
          <View style={{
            width: '90%',
            height: 45,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 10,
            marginTop: 20,
            paddingLeft: 10
          }}>
            <Search width={20} height={20} />
            <View 
              style={styles.input}
            >
              <Text style={{color: '#c6c6c6', fontSize: 15,  fontFamily: 'Manrope-SemiBold', }}>Pesquisar Produto</Text>
            </View>
          </View>
          
        </TouchableOpacity>

      </View>
      
      <View style={styles.ofertas}>
        <View style={styles.ofertasInfo}>
          <Text style={{
            color: '#030303',
            fontSize: 18,
            paddingVertical: 10,
            fontFamily: 'Manrope-Medium',
          }}>
            Destaques do dia
            </Text>
          <TouchableOpacity 
            onPress={()=>{
              navigation.navigate('Ofertas')
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
          }}>
            <Text style={{ color: '#D9042B', paddingRight: 5, fontFamily: 'Manrope-Semibold' }}>Ver mais</Text>
            <ArrowRight width={10} height={10} />
          </TouchableOpacity>

        </View>
        </View>

        <FlatList
        contentContainerStyle={{paddingHorizontal: 20}}
        data={limitedData}
        //  @ts-ignore
        keyExtractor={item=> item.id_}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {

          return(
              <ItensOferta 
                //@ts-ignore
                name={item.nome} 
                //@ts-ignore
                price={item.preco} 
                //@ts-ignore
                imagem={item.caminho}
                //@ts-ignore
                navTo={()=>{
                  navigation.navigate('DetalhesKit', {nome: item.nome, preco: item.preco, imagem: item.caminho, itens: item.itens, kit: item})
                }}
                
                />
              )
            }}
            />

      <View>
        <View style={styles.novidadesInfo}>
          <Text style={{
            color: '#030303',
            fontSize: 18,
            paddingVertical: 10,
            fontFamily: 'Manrope-Medium',
          }}>
            Novidades
          </Text>
          <TouchableOpacity style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Text style={{ color: '#D9042B', paddingRight: 5, fontFamily: 'Manrope-Semibold' }}>Ver mais</Text>
            <ArrowRight width={10} height={10} />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContentNews}>
          <View style={styles.novidadesItem}></View>
          <View style={styles.novidadesItem}></View>
          <View style={styles.novidadesItem}></View>
        </ScrollView>
      </View>
    </ScrollView>

    

  </View>
  );
}
export const styles = StyleSheet.create({
  input: {
    backgroundColor:'#fff',
    width:'88%',
    height: 45,
    alignSelf:'center',
    borderRadius: 16,
    paddingLeft: 20,
    justifyContent: 'center'
  },
  header: {
    backgroundColor:'#F2B705',
    width:'100%', 
    height: 195,
    paddingTop: 55
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
    paddingHorizontal: 20,
    marginBottom: 40
  },
  scrollViewMain: {
    paddingBottom: 50
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
    marginBottom:10,
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
    paddingTop: 20,
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
    borderColor:'#d2d2d2',
    width: 140,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    
  },
  novidadesInfo:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    height:'45%', 
    alignSelf: 'center', 
    justifyContent: 'space-between',
    
  },
  menosMais: {
    width: 25, 
    height:25, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor:'#d2d2d2',
    borderWidth: .5,
  },
  
});