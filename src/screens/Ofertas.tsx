import React, { useState } from 'react';
import { View, Text, StyleSheet,Image, Dimensions } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height'

import ScreenBack from './../../assets/svgs/arrow-right.svg'
import Mais from './../../assets/svgs/plus-svgrepo-com.svg'
import Search from './../../assets/svgs/search.svg'
import Menos from './../../assets/svgs/menos.svg'
import Cart from './../../assets/svgs/cart.svg'
//@ts-ignore
export function Ofertas({navigation}) {
  const { width, height } = Dimensions.get("window")
  const [modoEditar, setModoEditar] = useState(false)
  const [quantidade, setQuantidade] = useState(1)
  //@ts-ignore
  const handleAdicionarCarrinho = () => {
    setModoEditar(true);
  };

  return (
    <View style={{ 
      width: width,
      height: height +getStatusBarHeight(),
      paddingTop: getStatusBarHeight(),
      
    }}>
      <View style={{
        width: width,
        paddingHorizontal: 20,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#fff'
      }}>
        <View>
          <TouchableOpacity
            onPress={()=>{
              //@ts-ignore
              navigation.goBack()
            }}
          >
            <ScreenBack  width={20} height={20}/>
          </TouchableOpacity>
        </View>
        
        <View style={{alignItems: 'center'}}>
          <Text style={{
            fontSize: 20,
            alignSelf:'center',
            color: '#323232',}}>
              Ofertas
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={()=>{
              navigation.navigate('Carrinho')
            }}
          >
            <Cart width={25} height={25}/>
          </TouchableOpacity>
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
        marginTop: 30,
        marginBottom: 30,
        paddingLeft: 10
      }}>
        <Search width={20} height={20} />
        <TextInput
          placeholder='Pesquisar Produto'
          placeholderTextColor={'#d2d2d2'}
          style={styles.input} />
      </View>

      <View style={{
        flexDirection: 'row', 
        alignItems: 'center',
        alignSelf: 'center', 
        width: '98%',
        paddingHorizontal: 8,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        }}>

        <View style={styles.ofertasItem}>
          <View style={styles.imgProdView}>
            <Image
              source={require('./../../assets/images/arroz.png')}
              style={styles.imgProd} />
          </View>
          <View style={styles.detailsProd}>
            <View>
              <Text style={{ color: '#000', fontSize: 15 }}>Arroz Branco Camil Kg</Text>
            </View>
            
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={{ color: '#000', fontSize: 14 }}>R$ 5,85</Text>
                  <Text style={{ color: '#000', fontSize: 8 }}> Und</Text>
                </View>

                <TouchableOpacity onPress={handleAdicionarCarrinho}>
                  {
                    modoEditar ? (
                      <View style={{
                        width: '100%',
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        borderRadius: 10
                      }}>
                        <TouchableOpacity onPress={()=>{
                          setQuantidade(quantidade-1)
                        }}>
                          <View style={styles.menosMais}>
                            <Menos  width={10} height={10}/>
                          </View>
                        </TouchableOpacity>
                        
                          <View>
                            <Text style={{color: '#000',fontWeight: 'bold', fontSize: 18}}>{quantidade}</Text>
                          </View>
                        
                        <TouchableOpacity onPress={()=>{
                          setQuantidade(quantidade+1)
                        }}>
                          <View style={styles.menosMais}>
                            <Mais  width={10} height={10} fill="#333"/>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ): 
                      <View style={styles.btnAdicionar}>
                        <Text style={{ color: '#fff', }}>Adicionar</Text>
                      </View>
                  }
                  
                </TouchableOpacity>
                
            </View>

          </View>
        </View>

     </View>
    </View>
    
  );
}
export const styles = StyleSheet.create({
  ofertasItem: {
    borderWidth: 1,
    borderColor:'#d2d2d2',
    width: 140,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  input: {
    backgroundColor:'#fff',
    width:'88%',
    height: 45,
    alignSelf:'center',
    
    borderRadius: 16,
    paddingLeft: 20,
    color: '#000',

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
    justifyContent: 'space-between'
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
})