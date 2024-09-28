import { View, Text, TouchableOpacity, Image, StyleSheet, PressableProps, Pressable } from 'react-native';
import React from 'react'

import Mais from './../../assets/svgs/plus-svgrepo-com.svg'
import Menos from './../../assets/svgs/menos.svg'
import Close from './../../assets/svgs/close.svg'

import { useCart } from '../cart/CartContext'
interface Props {
  product: {
    id: string
    name: string
    price: string
    images: string[]
    category: string
    quantity?: number
  }
}


export default function ItensCart ({product}: Props & PressableProps) {

  const { deleteProduct, decreaseProductQuantity, increaseProductQuantity } = useCart()

  return (
    <View style={{
      width: '92%',
      height: 135,
      borderBottomColor: '#E2E2E2',
      borderBottomWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      flexDirection: 'row'
    }}>
      <View style={{
        width: '72%', 
        height:'84%', 
        flexDirection:'row', 
        alignItems: 'center',
      }}>
        <View style={{
          width: '35%', 
          height:'100%', 
          alignItems: 'center', 
          justifyContent: 'center'
        }}>
          <Image 
            source={{uri: product.images[0] }}
            style={styles.imageStyle}
          />
        </View>
        <View 
          style={{
            width: '65%', 
            height:'80%',
            justifyContent: 'center'
          }}
        >
          <View 
            style={{ 
              width: '100%', 
              height:'50%', 
              paddingVertical: 4,
              justifyContent: 'center',
              paddingLeft: 6
            }}
          >
            {/*@ts-ignore*/}      
            <Text 
              style={{
                color: '#1A1926', 
                fontFamily: 'GeneralSans-Semibold'
              }}
            >
              {product.name}
            </Text>
          </View>
          <View style={{ 
            width: '100%', 
            height:'50%', 
            flexDirection: 'row',
            alignItems: 'center', 
            gap: 14, 
            paddingLeft: 6,
          }}>

            <Pressable onPress={()=>{
              if(product.quantity === 1){
                deleteProduct(product.id)
              }
              decreaseProductQuantity(product)
            }}>
              <View style={styles.menosMais}>
                <Menos  width={15} height={15}/>
              </View>
            </Pressable>
            
              <View>
                <Text style={{color: '#000',fontWeight: 'bold', fontSize: 18}}>{product.quantity}</Text>
              </View>
            
            <Pressable onPress={()=>{
              increaseProductQuantity(product)
            }}>
              <View style={styles.menosMais}>
                <Mais  width={15} height={15} fill="#333"/>
              </View>
            </Pressable>
            
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
          <Pressable 
            style={{
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={()=>{
              deleteProduct(product.id)
            }}
          >
            <Close  width={15} height={15}/> 
          </Pressable>
        </View>
        <View
          style={{
            width: 80,
           
          }}
        >
          <Text style={{
            color: '#000',
            fontFamily: 'GeneralSans-Semibold',
            fontSize: 15
            }}>
              R$ {(parseFloat(product.price) * (product.quantity || 1)).toFixed(2)}
          </Text>
        </View>
      </View> 
    </View>
  );
}
const styles = StyleSheet.create({
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