import React from 'react';
import { View, Text, Dimensions, StyleSheet,  Image} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height'

import ScreenBack from '../../../assets/svgs/arrow-right.svg'
import Menos from '../../../assets/svgs/menos.svg'
import Mais from '../../../assets/svgs/plus-svgrepo-com.svg'
import Left from '../../../assets/svgs/close-left.svg'
import Right from '../../../assets/svgs/close-right.svg'


//@ts-ignore
export function Carrinho({navigation}) {
  const { width, height } = Dimensions.get("window")
  return (
    <View style={{ 
      width: width,
      height: height +getStatusBarHeight(),
      paddingTop: getStatusBarHeight(),
    }}>
      <View style={{
        width: width,
        paddingHorizontal: 20,
        marginTop: 0,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#fff',
        
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: .5
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
            color: '#323232',}}
          >
            Carrinho
          </Text>
        </View>
        <View style={{width: 20, height: 20}}></View>
      </View>
      <ScrollView style={{backgroundColor:'#fff'}}>
        <View style={styles.prodsCar}>
            <View style={{width: '72%', height:'84%', flexDirection:'row'}}>
              <View style={{width: '30%', height:'100%', alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../../../assets/images/coca.png')}/>
              </View>
              <View style={{width: '70%', height:'100%'}}>
                <View style={{ width: '100%', height:'50%', padding: 6}}>
                  <Text style={{color: '#000', fontWeight: 'bold'}}>Coca-Cola</Text>
                  <Text style={{color: '#7C7C7C'}}>350 ml</Text>
                </View>
                <View style={{ width: '100%', height:'50%', flexDirection: 'row', alignItems: 'center', gap: 10, paddingLeft: 6}}>
                  <View style={styles.menosMais}>
                    <Menos  width={20} height={20}/>
                  </View>
                  <View>
                    <Text style={{color: '#000'}}>1</Text>
                  </View>
                  <View style={styles.menosMais}>
                    <Mais  width={20} height={20} fill="#333"/>
                  </View>
                </View>
              </View>
              
            </View>

            <View style={{width: '18%', height:'60%', justifyContent: 'space-between', alignItems: 'flex-end'}}>
              <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center',paddingHorizontal: 10,}}>
                <Right  width={20} height={20} style={styles.close}/>
                <Left  width={20} height={20} style={styles.close}/>
              </View>
              <View>
                <Text style={{color: '#000'}}>R$ 3,49</Text>
              </View>
            </View>
            
        </View>
        <View style={styles.prodsCar}>

        </View>
      </ScrollView>

    </View>
  );
}
export const styles = StyleSheet.create({
  prodsCar: {
    width: '100%',
    height: 150,
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: .5,
    alignItems: 'center',
    justifyContent: 'center',
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
  close: { 
    marginRight:-13
  }
})