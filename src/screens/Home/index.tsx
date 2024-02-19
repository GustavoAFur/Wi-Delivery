import { NavigationContainer } from '@react-navigation/native';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


import ArrowRight from '../../../assets/svgs/arrow-p.svg'
import Search from '../../../assets/svgs/search.svg'

//@ts-ignore
export function Home({navigation}) {
  return (
    <View style={{ backgroundColor: '#fff', width: '100%', flex: 1 }}>

    <StatusBar
      translucent
      backgroundColor={"#EB3738"}
      barStyle={"light-content"} />
    <View style={styles.header}>
      <View style={styles.details}>

        <View style={styles.userDetails}>
          <Text style={{ fontWeight: 'bold', color: '#c6c6c6', fontSize: 12 }}>Loja 1 - Reriutaba</Text>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 15 }}>Gustavo Furtado</Text>
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
        borderRadius: 16,
        marginTop: 20,
        paddingLeft: 10
      }}>
        <Search width={20} height={20} />
        <TextInput
          placeholder='Pesquisar Produto'
          placeholderTextColor={'#d2d2d2'}
          style={styles.input} />
      </View>

    </View>
    <ScrollView>

      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent} showsHorizontalScrollIndicator={false}>
        <View style={styles.sectionsItens}>
          <View style={styles.sectionsImg}>

          </View>
          <View>
            <Text style={{
              color: '#000',
              fontWeight: '500',
            }}>Cereais</Text>
          </View>
        </View>
        <View style={styles.sectionsItens}>
          <View style={styles.sectionsImg}>
          </View>
          <View>
            <Text style={{
              color: '#000',
              fontWeight: '500',
            }}>Acougue</Text>
          </View>
        </View>
        <View style={styles.sectionsItens}>
          <View style={styles.sectionsImg}>
          </View>
          <View>
            <Text style={{
              color: '#000',
              fontWeight: '500',
            }}>Horti-Fruti
            </Text>
          </View>
        </View>
        <View style={styles.sectionsItens}>
          <View style={styles.sectionsImg}>
          </View>
          <View>
            <Text style={{
              color: '#000',
              fontWeight: '500',
            }}>Frios
            </Text>
          </View>
        </View>
        <View style={styles.sectionsItens}>
          <View style={styles.sectionsImg}>
          </View>
          <View>
            <Text style={{
              color: '#000',
              fontWeight: '500',
            }}>Perfumaria
            </Text>
          </View>
        </View>
        <View style={styles.sectionsItens}>
          <View style={styles.sectionsImg}>
          </View>
          <View>
            <Text style={{
              color: '#000',
              fontWeight: '500',
            }}>Limpeza
            </Text>
          </View>
        </View>
        <View style={styles.sectionsItens}>
          <View style={styles.sectionsImg}>
          </View>
          <View>
            <Text style={{
              color: '#000',
              fontWeight: '500',
            }}>Infantil
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
            <Text style={{ color: '#EB3738', paddingRight: 5 }}>Ver mais</Text>
            <ArrowRight width={10} height={10} />
          </TouchableOpacity>


        </View>
        <ScrollView horizontal contentContainerStyle={styles.scrollViewContentOfertasNews}>
          <View style={styles.ofertasItem}>
            <View style={{
              backgroundColor: '#f00',
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
                fontWeight: 'bold',
              }}>Oferta</Text>
            </View>
            <View style={{ height: 115, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={require('../../../assets/images/arroz.png')}
                style={{ width: 90, height: 90 }} />
            </View>
            <View style={{ width: '86%', alignSelf: 'center' }}>
              <View>
                <Text style={{ color: '#000', fontSize: 18 }}>Arroz Camil</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={{ color: '#000', }}>R$ 5,85</Text>
                  <Text style={{ color: '#000', fontSize: 8 }}> Und</Text>
                </View>
                <View style={{
                  backgroundColor: '#f00',
                  width: 32,
                  height: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10
                }}>
                  <Text style={{ color: '#fff', }}>+</Text>
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
            <Text style={{ color: '#EB3738', paddingRight: 5 }}>Ver mais</Text>
            <ArrowRight width={10} height={10} />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal contentContainerStyle={styles.scrollViewContentNews}>
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
    color: '#000',

  },
  header: {
    backgroundColor:'#EB3738',
    width:'100%', 
    height: 155,
    marginTop: 35,
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
  sectionsItens: {
    width: 88,
    height: 108,
    marginRight: 10,
    alignItems: 'center'
  },
  sectionsImg: {
    backgroundColor: '#f7f49c',
    width: 78,
    height: 78,
    borderRadius: 39,
    marginBottom:10
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
    borderWidth: 1,
    borderColor:'#d2d2d2',
    width: 140,
    height: 190,
    borderRadius: 10,
    marginRight: 10,
    overflow: 'hidden'
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
    width: 220,
    height: 130,
    borderRadius: 10,
    marginRight: 10,
  }
});