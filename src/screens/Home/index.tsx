import { 
  Image, 
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,Pressable, PressableProps, Alert} from 'react-native'

import More from '../../../assets/svgs/more.svg'

import Search from '../../../assets/svgs/search.svg'
import ArrowRight from '../../../assets/svgs/arrow-p.svg'

import Notification from '../../../assets/svgs/notification.svg'

import Cereais from '../../../assets/images/rice.png'
import Acougue from '../../../assets/images/meet-fish.png'
import Hortifruti from '../../../assets/images/horti-fruti.png'
import Perfumaria from '../../../assets/images/beauty-product.png'
import Limpeza from '../../../assets/images/Produtos-de-Limpeza.png'

import Arroz from '../../../assets/images/arroz.png'
import Feijao from '../../../assets/images/feijao.png'
import Cerveja from '../../../assets/images/heineken.png'
import OvoPascoa from '../../../assets/images/ovo-pascoa.png'

import SectionsComponent from '../../components/SectionsComponent'
import { useEffect, useState } from 'react'
import { ItensOferta } from '../ItensOferta'

//@ts-ignore
export function Home({navigation}) {

  const sectionsObj = [
    { name: 'Cereais', img: Cereais },
    { name: 'Açougue', img: Acougue},
    { name: 'Horti-Fruti', img: Hortifruti },
    { name: 'Perfumaria', img: Perfumaria },
    { name: 'Limpeza', img: Limpeza },
  ]

  const ofertas = [
    {id_: 1, nome: 'Arroz Branco Camil Kg', preco: '5,85', und: 'Und', qtd: 1, caminho: "https://lojacentraldealimentos.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/m/embalagem-2020-leve-arroz-tio-urbano.png"},
    {id_: 2, nome: 'Feijao Preto Camil Kg', preco: '8,85', und: 'Und', qtd: 1, caminho: "https://lojacentraldealimentos.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/m/embalagem-2020-leve-arroz-tio-urbano.png"},
    {id_: 3, nome: 'Cerv. Heineken 330 ml', preco: '6,59', und: 'Und', qtd: 1, caminho: "https://lojacentraldealimentos.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/m/embalagem-2020-leve-arroz-tio-urbano.png"},
    {id_: 4, nome: 'Ovo da pascoa Arcor', preco: '55,99 ', und: 'Und', qtd: 1, caminho: "https://lojacentraldealimentos.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/m/embalagem-2020-leve-arroz-tio-urbano.png"},
  ]

  const [modoEditar, setModoEditar] = useState<String[]>([])
  const [quantidade, setQuantidade] = useState(1)

  function handleToggleEdit (value: string){
    //@ts-ignore
    setModoEditar((state)=>[...state, value])
    console.log(modoEditar)
  }

  function delProdCart (value: string){
    Alert.alert(
      "Excluir Produto",
      "Deseja mesmo excluir? ",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => setModoEditar((state)=> state.filter(item => item !== value)) 
        }
      ]
    );
                    
  }
  

  return (
    <View style={{ width: '100%', flex: 1, backgroundColor: '#fff' }}>

    <StatusBar
      translucent
      backgroundColor={"#F2B705"}
      barStyle={"light-content"} />
    
    <ScrollView contentContainerStyle={styles.scrollViewMain}>
      <View style={styles.header}>
        <View style={styles.details}>

          <View style={styles.userDetails}>
            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 12,  fontFamily: 'Manrope-SemiBold',  }}>Loja 1 - Reriutaba</Text>
            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 15,  fontFamily: 'Manrope-SemiBold',  }}>Gustavo Furtado</Text>
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
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent} showsHorizontalScrollIndicator={false}>
        {
          sectionsObj.map((objeto, index)=>(
            <SectionsComponent page={objeto.name} name={objeto.name} img={objeto.img} key={index}/>
          ))
        }

        <TouchableOpacity 
          onPress={()=>{
            navigation.navigate('SecoesList')
          }}
          style={styles.sectionsItens}
        >
          <View style={styles.sectionsImg}>
            <More/>
          </View>
          <View>
            <Text style={{
              color: '#000',
              fontWeight: '500',
              fontFamily: 'Manrope-SemiBold', 
            }}>Mais
            </Text>
          </View>
        </TouchableOpacity>

      </ScrollView>


      <View style={styles.ofertas}>
        <View style={styles.ofertasInfo}>
          <Text style={{
            color: '#000',
            fontSize: 18,
            fontWeight: 'bold',
            paddingVertical: 10,
            fontFamily: 'Manrope-SemiBold',
          }}>
            Ofertas do dia
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
            <Text style={{ color: '#D9042B', paddingRight: 5 }}>Ver mais</Text>
            <ArrowRight width={10} height={10} />
          </TouchableOpacity>

        </View>
        <ScrollView 
          horizontal showsHorizontalScrollIndicator={false}  
          contentContainerStyle={styles.scrollViewContentOfertasNews}
        >
          {
            //@ts-ignore
            ofertas.map((itens,index)=>(
              
              <ItensOferta 
                key={index}
                name={itens.nome} 
                price={itens.preco} 
                imagem={itens.caminho}
                und={itens.und}
                selected={modoEditar.length <= 0 ? false :  modoEditar.includes(String(itens.id_))}
                addToCart={()=>{
                  console.log(itens.caminho)
                  handleToggleEdit(String(itens.id_))
                  }
                }
                addProd={()=>{
                  itens.qtd = itens.qtd+1
                  console.log(itens.qtd)
                }}
                decProd={()=>{
                  itens.qtd = itens.qtd-1
                  if(itens.qtd <= 0){
                    delProdCart(String(itens.id_))
                  }
                  console.log(itens.qtd)
                }}
                //@ts-ignore
                qtd={itens.qtd}
                />
            ))
          }
          
          
        </ScrollView>
      </View>

      <View>
        <View style={styles.novidadesInfo}>
          <Text style={{
            color: '#000',
            fontSize: 18,
            fontWeight: 'bold',
            paddingVertical: 10,
          }}
          >Novidades</Text>
          <TouchableOpacity style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Text style={{ color: '#D9042B', paddingRight: 5 }}>Ver mais</Text>
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
    height: 155,
    marginTop: 35,
    paddingTop: 15
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
    backgroundColor: '#fff',
    width: '80%',
    height: '70%',
    marginBottom:10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor:'#d2d2d2',
    borderWidth: .5,
  },
  imageStyle: {
    width: '90%', 
    height: '90%',
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