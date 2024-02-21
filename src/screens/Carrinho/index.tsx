import React from 'react';
import { View, Text, Dimensions, StyleSheet,  Image} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height'

import ScreenBack from '../../../assets/svgs/arrow-right.svg'
import Menos from '../../../assets/svgs/menos.svg'
import Mais from '../../../assets/svgs/plus-svgrepo-com.svg'
import Close from '../../../assets/svgs/close.svg'



//@ts-ignore
export function Carrinho({navigation}) {
  const { width, height } = Dimensions.get("window")
  return (
    <View style={{ 
      width: width,
      height: height +getStatusBarHeight(),
      paddingTop: getStatusBarHeight(),
      flex: 1
    }}>
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
            fontSize: 20,
            alignSelf:'center',
            color: '#323232',}}
          >
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
                <Image source={require('../../../assets/images/coca.png')}/>
              </View>
              <View style={{width: '70%', height:'80%',justifyContent: 'center' }}>
                <View style={{ width: '100%', height:'50%', padding: 6}}>
                  <Text style={{color: '#000', fontWeight: 'bold'}}>Coca-Cola</Text>
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
                  <View style={styles.menosMais}>
                    <Menos  width={15} height={15}/>
                  </View>
                  <View>
                    <Text style={{color: '#000',fontWeight: 'bold', fontSize: 18}}>1</Text>
                  </View>
                  <View style={styles.menosMais}>
                    <Mais  width={15} height={15} fill="#333"/>
                  </View>
                </View>
              </View>
              
            </View>

            <View style={{
              width: '22%', 
              height:'50%', 
              justifyContent: 'space-between', 
              alignItems: 'flex-end'
            }}>
              <View style={{
                flexDirection: 'row', 
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}>
                <Close  width={15} height={15}/>
                
              </View>
              <View>
                <Text style={{color: '#000',fontWeight: 'bold', fontSize: 18}}>R$ 3,49</Text>
              </View>
            </View>
            
        </View>
         
      </ScrollView>

      <View style={{
        width: '100%',
        position: 'absolute',
        bottom: 85, // Ajuste conforme necessário
        left: 0,
        right: 0,
        alignItems: 'center',
      }}>
        
        <TouchableOpacity style={{
          backgroundColor: '#F2B705',
          paddingHorizontal: 76,
          paddingVertical: 13,
          borderRadius: 10
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold'
          }}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View> 

    </View>
  );
}
export const styles = StyleSheet.create({
  prodsCar: {
    width: '92%',
    height: 140,
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  menosMais: {
    width: 35, 
    height:35, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    borderColor:'#d2d2d2',
    borderWidth: .5,
  },
  
})