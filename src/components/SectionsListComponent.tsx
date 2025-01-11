import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Pressable,
  PressableProps,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

interface Props {
  name: string;
  img: any;
  navTo: () => void;
}

const SectionsListComponent = ({name, img, navTo}: Props & PressableProps) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={navTo}
      style={{
        flexDirection: 'row',
        height: 50,
        paddingHorizontal: 20,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFF',
        borderRadius: 30,
        borderColor: '#F2F3F2',
        borderWidth: 1,
      }}>
      <View
        style={{
          width: 30,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
        }}>
        <Image
          source={img}
          style={{
            width: 30,
            height: 30,
            padding: 10,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View>
        <Text
          style={{
            color: '#4F4F4F',
            fontFamily: 'GeneralSans-Semibold',
          }}>
          {name}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  sectionsItens: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderColor: '#d2d2d2',
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  sectionsImg: {
    backgroundColor: '#fff',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
});

export default SectionsListComponent;
