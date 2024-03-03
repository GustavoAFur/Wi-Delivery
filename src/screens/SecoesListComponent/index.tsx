import React from 'react';
import {Image,TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'

interface Props{
  name: string,
  img: any,
}

const SecoesListComponent = ({ name, img}: Props) => {

  const navigation = useNavigation();
 
  return (
    <TouchableOpacity onPress={() => {
      
    }} >
      <View style={styles.sectionsItens}>
        <View style={styles.sectionsImg}>
          <Image source={img} style={styles.imageStyle}/>
          
        </View>
        <View>
            <Text style={{
              color: '#000',
              fontWeight: '500',
              fontFamily: 'Manrope-SemiBold', 
            }}>{name}</Text>
          </View>
      </View>
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sectionsItens: {
    width: 160,
    height: 190,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderColor:'#d2d2d2',
    borderWidth: .5,
    overflow: 'hidden'
  },
  sectionsImg: {
    backgroundColor: '#fff',
    width: '100%',
    height: '70%',
    marginBottom:10,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  imageStyle: {
    width: '70%', 
    height: '70%',
    resizeMode: 'contain',
  },
});

export default SecoesListComponent;