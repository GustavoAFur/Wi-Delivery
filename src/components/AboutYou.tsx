import React from 'react';
import { Text, View } from 'react-native';

import Arrow from '../../assets/svgs/arrow-p.svg'
// import { Container } from './styles';

export const AboutYou = () => {
  return (
    <View
      style={{
        marginTop: 20,
        backgroundColor: '#F2F3F2',
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 10,
        marginHorizontal: 20,
        borderRadius: 5,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <View>
        <Text style={{
          fontSize: 15,
          fontFamily: 'GeneralSans-Medium',
          color: '#0F1121',
        }}>
          Nos conte mais!
        </Text>
        <Text style={{
          fontSize: 12,
          fontFamily: 'GeneralSans-Light',
          color: '#67697A',
        }}>
          Precisamos saber mais sobre você.
        </Text>
      </View>

      <Arrow />

    </View>
  )
}
