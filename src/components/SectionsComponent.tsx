import React from 'react';
import {Image,TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface Props{
  name: string,
  img: any
}
//@ts-ignore
const SectionsComponent = ({ name, img }: Props) => {
  return (
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
  );
};

const styles = StyleSheet.create({
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
});

export default SectionsComponent;