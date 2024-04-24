import React, { useState } from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { View, Text, Dimensions, StyleSheet,  Image, StatusBar} from 'react-native'

import Menos from './../../assets/svgs/menos.svg'
import Close from './../../assets/svgs/close.svg'
import Mais from './../../assets/svgs/plus-svgrepo-com.svg'


//@ts-ignore
export function Carrinho({navigation}) {

  const { width, height } = Dimensions.get("window")

  const [quantidade, setQuantidade] = useState(1)
  const preco = 3.49

  return (
    <View style={{ 
      width: width, 
      height: height +getStatusBarHeight(),
      paddingTop: getStatusBarHeight(),
      flex: 1
    }}>

    <StatusBar
      translucent
      backgroundColor={"#FFFF"}
      barStyle={"dark-content"} />

      <View style={{
        width: width,
        paddingHorizontal: 20,
        marginTop: 0,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: .5
      }}>
        <View style={{alignItems: 'center'}}>
          <Text style={{
            fontSize: 18,
            alignSelf:'center',
            color: '#323232',
            fontFamily: 'Manrope-SemiBold'
          }}>
            Meu Carrinho
          </Text>
        </View>
      </View>
      <ScrollView style={{backgroundColor:'#fff'}}>
        <View style={styles.prodsCar}>
            <View style={{
              width: '72%', 
              height:'84%', 
              flexDirection:'row', 
              alignItems: 'center'
            }}>
              <View style={{
                width: '30%', 
                height:'100%', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <Image 
                  source={{uri: 'https://lojacentraldealimentos.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/m/embalagem-2020-leve-arroz-tio-urbano.png'}}
                  style={styles.imageStyle}
                />
              </View>
              <View style={{width: '70%', height:'80%',justifyContent: 'center' }}>
                <View style={{ width: '100%', height:'50%', padding: 6}}>
                  <Text style={{color: '#000', fontWeight: 'bold'}}>Arroz Branco Camil</Text>
                  <Text style={{color: '#7C7C7C'}}>1 Kg</Text>
                </View>
                <View style={{ 
                  width: '100%', 
                  height:'50%', 
                  flexDirection: 'row',
                  alignItems: 'center', 
                  gap: 14, 
                  paddingLeft: 6,
                }}>

                  <TouchableOpacity onPress={()=>{
                    setQuantidade(quantidade-1)
                  }}>
                    <View style={styles.menosMais}>
                      <Menos  width={15} height={15}/>
                    </View>
                  </TouchableOpacity>
                  
                    <View>
                      <Text style={{color: '#000',fontWeight: 'bold', fontSize: 18}}>{quantidade}</Text>
                    </View>
                  
                  <TouchableOpacity onPress={()=>{
                    setQuantidade(quantidade+1)
                  }}>
                    <View style={styles.menosMais}>
                      <Mais  width={15} height={15} fill="#333"/>
                    </View>
                  </TouchableOpacity>
                  
                </View>
              </View>
              
            </View>

            <View style={{
              width: '22%', 
              height:'50%', 
              justifyContent: 'space-between', 
              alignItems: 'flex-end',
              paddingRight: 5
            }}>
              <View >
                <TouchableOpacity>
                  <Close  width={15} height={15}/> 
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{
                  color: '#000',
                  fontFamily: 'Manrope-SemiBold', 
                  fontSize: 15
                  }}>
                    R$ {parseFloat((quantidade*preco).toFixed(2))}
                </Text>
              </View>
            </View>
            
        </View>
        
        <View style={styles.prodsCar}>
            <View style={{
              width: '72%', 
              height:'84%', 
              flexDirection:'row', 
              alignItems: 'center'
            }}>
              <View style={{
                width: '30%', 
                height:'100%', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <Image 
                  source={{uri: 'https://apoioentrega.vteximg.com.br/arquivos/ids/541936/178415.png?v=638419050718770000'}}
                  style={styles.imageStyle}
                />
              </View>
              <View style={{width: '70%', height:'80%',justifyContent: 'center' }}>
                <View style={{ width: '100%', height:'50%', padding: 6}}>
                  <Text style={{color: '#000', fontWeight: 'bold'}}>Cerv. Heineken</Text>
                  <Text style={{color: '#7C7C7C'}}>350 ml</Text>
                </View>
                <View style={{ 
                  width: '100%', 
                  height:'50%', 
                  flexDirection: 'row',
                  alignItems: 'center', 
                  gap: 14, 
                  paddingLeft: 6,
                }}>

                  <TouchableOpacity onPress={()=>{
                    setQuantidade(quantidade-1)
                  }}>
                    <View style={styles.menosMais}>
                      <Menos  width={15} height={15}/>
                    </View>
                  </TouchableOpacity>
                  
                    <View>
                      <Text style={{color: '#000',fontWeight: 'bold', fontSize: 18}}>{quantidade}</Text>
                    </View>
                  
                  <TouchableOpacity onPress={()=>{
                    setQuantidade(quantidade+1)
                  }}>
                    <View style={styles.menosMais}>
                      <Mais  width={15} height={15} fill="#333"/>
                    </View>
                  </TouchableOpacity>
                  
                </View>
              </View>
              
            </View>

            <View style={{
              width: '22%', 
              height:'50%', 
              justifyContent: 'space-between', 
              alignItems: 'flex-end',
              paddingRight: 5
            }}>
              <View >
                <TouchableOpacity>
                  <Close  width={15} height={15}/> 
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{
                  color: '#000',
                  fontFamily: 'Manrope-SemiBold', 
                  fontSize: 15
                  }}>
                    R$ {parseFloat((quantidade*preco).toFixed(2))}
                </Text>
              </View>
            </View>
            
        </View>
      </ScrollView>
      
      <TouchableOpacity 
          onPress={()=>{
            navigation.navigate('InfosDadosPessoais')
          }}
      >
        <View style={{
          position: 'absolute',
          backgroundColor: '#F2B705',
          flexDirection: 'row',
          alignItems: 'center', 
          justifyContent: 'center',
          width: '85%', 
          height: 55,
          alignSelf: 'center',
          borderRadius: 10,
          bottom: 100
        }}>
          <Text style={{
            fontSize: 18,
            color: '#fff',
            fontFamily: 'Manrope-SemiBold',
          }}>Finalizar Compra</Text>
        </View> 
      </TouchableOpacity>

    </View>
  );
}
export const styles = StyleSheet.create({
  prodsCar: {
    width: '92%',
    height: 135,
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  menosMais: {
    width: 32, 
    height:32, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    borderColor:'#d2d2d2',
    borderWidth: .5,
  },
  imageStyle: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  detalhesEntrega: {
    justifyContent: 'space-between', 
    flexDirection: 'row', 
    borderBottomColor: '#d2d2d2',
    borderBottomWidth: .5,
    paddingBottom: 6
  }
})