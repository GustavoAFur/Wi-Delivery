import {
  View,
  Text,
  StatusBar,
  TextInput,
  FlatList,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {sections} from '../data/sections';

export function Categories({navigation}: {navigation: any}) {
  const searchRef = useRef(null);

  const gap = Dimensions.get('window').width * 0.02;
  const itemWidth = Dimensions.get('window').width / 2 - gap * 4.5;

  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState('');
  const [filteredData, setFilteredData] = useState(sections);

  const handleSearch = (text: string) => {
    setSearch(text);

    const filtered = sections.filter(item =>
      item.nome.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

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
        colors={['#FFFFFF', 'transparent']}
        style={{
          width: '100%',
          height: 144,
          position: 'absolute',
          zIndex: 1,
        }}>
        <View
          style={{
            marginTop: getStatusBarHeight() + 5,
            paddingHorizontal: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'DMSans-SemiBold',
              color: '#0F1121',
            }}>
            Categorias
          </Text>
        </View>

        <View
          style={{
            marginTop: 16,
            paddingHorizontal: 30,
          }}>
          <View
            style={{
              width: '100%',
              height: 50,
              borderRadius: 12,
              backgroundColor: '#FFFF',
              padding: 12,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: isFocused == 'searchRef' ? '#D82C3C' : '#EFEFEF',
              shadowColor: '#0003',
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.37,
              shadowRadius: 7.49,

              elevation: 12,
            }}>
            {/* <IconSearch /> */}

            <View
              style={{
                width: '100%',
                height: 48,
              }}>
              <TextInput
                ref={searchRef}
                keyboardType="default"
                autoComplete="email"
                placeholder="Procure por algo..."
                placeholderTextColor={'#B6B6B6'}
                autoCorrect={false}
                returnKeyType="go"
                showSoftInputOnFocus={true}
                selectTextOnFocus={true}
                onChangeText={handleSearch}
                value={search}
                onFocus={() => {
                  setIsFocused('searchRef');
                }}
                onBlur={() => {
                  setIsFocused('');
                }}
                style={{
                  width: '100%',
                  fontSize: 14,
                  fontFamily: 'DMSans-Medium',
                  color: '#0F1121',
                  height: 48,
                  marginLeft: 10,
                }}
              />
            </View>
          </View>
        </View>
      </LinearGradient>

      <FlatList
        data={filteredData}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginHorizontal: 20,
          marginTop: 20,
          paddingBottom: 120,
          width: '100%',
        }}
        style={{
          zIndex: -1,
          marginTop: 130,
        }}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              navigation.navigate('ProductsByCategory', {
                categoria: `${item.nome}`,
                filtroCategoria: `${item.value}`,
              });
            }}
            style={{
              width: itemWidth,
              height: 140,
              backgroundColor: '#F5F5F5',
              borderRadius: 16,
              padding: 18,
              margin: gap,
              overflow: 'hidden',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'DMSans-SemiBold',
                color: '#0F1121',
              }}>
              {item.nome}
            </Text>

            <Image
              source={item.imagem}
              resizeMode="cover"
              style={{
                width: 147,
                height: 124,
                right: -30,
                bottom: -30,
                position: 'absolute',
                zIndex: 1,
              }}
            />
          </Pressable>
        )}
      />
    </View>
  );
}
