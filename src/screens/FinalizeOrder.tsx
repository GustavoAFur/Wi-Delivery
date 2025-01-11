import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export function FinalizeOrder() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <StatusBar
        translucent
        backgroundColor={'#00000000'}
        barStyle={'dark-content'}
      />

      <LinearGradient
        colors={['#FFE6C9', '#FCFCFD']}
        style={{
          width: '100%',
          height: 180,
        }}>
        <View
          style={{
            marginTop: getStatusBarHeight() + 5,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}></View>
      </LinearGradient>
    </View>
  );
}
