import { 
  Image, 
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,Pressable, PressableProps, Alert,
  FlatList} from 'react-native'

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

  const ofertas = [
    {id_: 1, nome: 'Arroz Branco Urbano Kg', preco: '5,85', und: 'Und', caminho: "https://lojacentraldealimentos.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/m/embalagem-2020-leve-arroz-tio-urbano.png"},
    {id_: 2, nome: 'Feijao Preto Camil Kg', preco: '8,85', und: 'Und', caminho: "https://www.camil.com.br/wp-content/uploads/sites/12/2020/06/1582828742-mkp-feijao-preto-1kg-3-768x768.png"},
    {id_: 3, nome: 'Cerv. Heineken 330 ml', preco: '6,59', und: 'Und', caminho: "https://apoioentrega.vteximg.com.br/arquivos/ids/541936/178415.png?v=638419050718770000"},
    {id_: 4, nome: 'Caixa de Bombons Nestle', preco: '55,99 ', und: 'Und',  caminho: "https://upside.vteximg.com.br/arquivos/ids/164912-1000-1000/29878.png?v=637594707434230000"},
  ]


  const [produtosCarrinho, setProdutosCarrinho] = useState<String[]>([])
  const [quantidade, setQuantidade] = useState(1)

  useEffect(()=>{
    console.log(produtosCarrinho)
  },[produtosCarrinho])


  function handleToggleAddCart (value: any, qtd: number){
    //@ts-ignore
    setProdutosCarrinho((state)=>[...state, {...value, qtd}])
    console.log(produtosCarrinho)
  }

  function addQtd (idProd: any){
    setProdutosCarrinho(prevObjetos => 
      prevObjetos.map(objeto => 
        //@ts-ignore
        objeto.id_ === idProd ? { ...objeto, qtd: objeto.qtd+1 } : objeto
      )
    )
  }

  function decQtd(idProd: any) {
    //@ts-ignore
    setProdutosCarrinho(prevObjetos =>
      prevObjetos.map(objeto =>
        //@ts-ignore
        objeto && objeto.id_ === idProd ?  { ...objeto, qtd: objeto.qtd - 1 }: objeto
      )
    );
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
          //@ts-ignore
          onPress: () => setProdutosCarrinho((state)=> state.filter(item => item.id_ !== value)) 
        }
      ]
    );
                    
  }
  

  return (
    <View style={{ width: '100%', flex: 1, backgroundColor: '#fff' }}>

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
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent} showsHorizontalScrollIndicator={false}>
        {
          sectionsObj.map((objeto, index)=>(
            <TouchableOpacity 
              key={index}
              onPress={() => {
                navigation.navigate('ProdutosPorCategoria', { categoria: objeto.name })
              }} 
              style={styles.sectionsItens}>
                <View style={styles.sectionsImg}>
                  <Image source={objeto.img} style={styles.imageStyle}/>
                </View>
                <View>
                  <Text style={{
                    color: '#3E423F',
                    fontFamily: 'Manrope-SemiBold', 
                    fontSize: 14
                  }}>{objeto.name}</Text>
                </View>
              </TouchableOpacity>
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
            color: '#030303',
            fontSize: 18,
            paddingVertical: 10,
            fontFamily: 'Manrope-Medium',
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
            <Text style={{ color: '#D9042B', paddingRight: 5, fontFamily: 'Manrope-Semibold' }}>Ver mais</Text>
            <ArrowRight width={10} height={10} />
          </TouchableOpacity>

        </View>
        </View>
        <FlatList
        contentContainerStyle={{paddingHorizontal: 20}}
        data={ofertas}
        //  @ts-ignore
        keyExtractor={item=> item.id}
        horizontal={true}
        renderItem={({item,index}) => {
        
          //@ts-ignore
          let qtdProdutoSelecionado = produtosCarrinho.find(objeto => objeto.id_ === item.id_)

          return(
              <ItensOferta 
                key={index}
                name={item.nome} 
                price={item.preco} 
                imagem={item.caminho}
                und={item.und}
                //@ts-ignore
                selected={produtosCarrinho.length <= 0 ? false :  produtosCarrinho.some(objeto => objeto.id_ === item.id_)}
                addToCart={()=>{
                  handleToggleAddCart(item, 1)

                  }
                }
                addProd={()=>{
                  addQtd(item.id_)
                }}
                decProd={()=>{
                  //@ts-ignore
                  qtdProdutoSelecionado.qtd <= 1 ?  delProdCart (item.id_) : decQtd(item.id_)
                }}
                //@ts-ignore
                quantidade={qtdProdutoSelecionado}
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