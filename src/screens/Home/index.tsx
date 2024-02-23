import { NavigationContainer } from '@react-navigation/native';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


import ArrowRight from '../../../assets/svgs/arrow-p.svg'
import Search from '../../../assets/svgs/search.svg'
import More from '../../../assets/svgs/more.svg'

import Rice from '../../../assets/images/rice.png'
import MeetFish from '../../../assets/images/meet-fish.png'
import HortiFruti from '../../../assets/images/horti-fruti.png'
import Beauty from '../../../assets/images/beauty-product.png'
import Clean from '../../../assets/images/Produtos-de-Limpeza.png'

//@ts-ignore
export function Home({navigation}) {
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
          <View style={styles.perfil}>
            <Image
              source={require('../../../assets/images/mercado.png')}
              style={{width: 56, height: 56}}
            />
          </View>
        </View>
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
          <TouchableOpacity 
            style={styles.input}
            onPress={()=>{navigation.navigate('Procurar')}}
          >
            <Text style={{color: '#c6c6c6', fontSize: 15,  fontFamily: 'Manrope-SemiBold', }}>Pesquisar Produto</Text>
          </TouchableOpacity>
        </View>

      </View>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent} showsHorizontalScrollIndicator={false}>
        <View style={styles.sectionsItens}>
          <View style={styles.sectionsImg}>
            <Image source={Rice} style={styles.imageStyle}/>
          </View>
          <View>
            <Text style={{
              color: '#000',
              fontWeight: '500',
              fontFamily: 'Manrope-SemiBold', 
            }}>Cereais</Text>
          </View>
        </View>
        <View style={styles.sectionsItens}>
          <View style={styles.sectionsImg}>
            <Image source={MeetFish} style={styles.imageStyle}/>
          </View>
          <View>
            <Text style={{
              color: '#000',
              fontWeight: '500',
              fontFamily: 'Manrope-SemiBold', 
            }}>Açougue</Text>
          </View>
        </View>
        <View style={styles.sectionsItens}>
          <View style={styles.sectionsImg}>
          <Image source={HortiFruti} style={styles.imageStyle}/>
          </View>
          <View>
            <Text style={{
              color: '#000',
              fontWeight: '500',
              fontFamily: 'Manrope-SemiBold', 
            }}>Horti-Fruti
            </Text>
          </View>
        </View>
        
        <View style={styles.sectionsItens}>
          <View style={styles.sectionsImg}>
          <Image source={Beauty} style={styles.imageStyle}/>
          </View>
          <View>
            <Text style={{
              color: '#000',
              fontWeight: '500',
              fontFamily: 'Manrope-SemiBold', 
            }}>Perfumaria
            </Text>
          </View>
        </View>
        <View style={styles.sectionsItens}>
          <View style={styles.sectionsImg}>
          <Image source={Clean} style={styles.imageStyle}/>
          </View>
          <View>
            <Text style={{
              color: '#000',
              fontWeight: '500',
              fontFamily: 'Manrope-SemiBold', 
            }}>Limpeza
            </Text>
          </View>
        </View>
        <View style={styles.sectionsItens}>
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
        </View>

      </ScrollView>


      <View style={styles.ofertas}>
        <View style={styles.ofertasInfo}>
          <Text style={{
            color: '#000',
            fontSize: 18,
            fontWeight: 'bold',
            paddingVertical: 10,
            fontFamily: 'Manrope-SemiBold',
          }}
          >Ofertas do dia</Text>
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}  contentContainerStyle={styles.scrollViewContentOfertasNews}>
          <View style={styles.ofertasItem}>
            <View style={{
              backgroundColor: '#D9042B',
              width: 55,
              height: 20,
              position: 'absolute',
              zIndex: 1,
              alignSelf: 'flex-start',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomRightRadius: 5
            }}>
              <Text style={{
                color: '#fff',
                fontFamily: 'Manrope-SBold',
              }}>Oferta</Text>
            </View>

            <View style={styles.imgProdView}>
            <Image
              source={require('../../../assets/images/arroz.png')}
              style={styles.imgProd} />
          </View>
          <View style={styles.detailsProd}>
            <View>
              <Text style={{ color: '#000', fontSize: 15, fontFamily: 'Manrope-SemiBold', }}>Arroz Branco Camil Kg</Text>
            </View>
            
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={{ color: '#000', fontSize: 14, fontFamily: 'Manrope-SemiBold', }}>R$ 5,85</Text>
                  <Text style={{ color: '#000', fontSize: 8 , fontFamily: 'Manrope-SemiBold',}}> Und</Text>
                </View>
                
            </View>

            </View>

          </View>
          <View style={styles.ofertasItem}></View>
          <View style={styles.ofertasItem}></View>
          <View style={styles.ofertasItem}></View>
          <View style={styles.ofertasItem}></View>
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
  perfil: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#D9042B',
    width: 46,
    height: 46,
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
    
  }
});