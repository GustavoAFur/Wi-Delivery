import {
  Dimensions,
  Image,
  Pressable,
  PressableProps,
  Text,
  View,
} from 'react-native';
import Cart from '../../assets/images/icons8-carrinho-de-compras-carregado-100.png';
interface Props {
  product: {
    id: string;
    name: string;
    price: string;
    images: string[];
    category: string;
  };
}
export function Products({
  product,
  navigation,
}: Props & PressableProps & {navigation: any}) {
  const gap = Dimensions.get('window').width * 0.02;
  const itemWidth = Dimensions.get('window').width / 2 - gap * 4.5;

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('ProductDetails', {item: product});
      }}
      style={{
        width: itemWidth,
        paddingVertical: 20,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: '#F1F3F5',
        margin: gap,
      }}>
      <View
        style={{
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: product.images[0]}}
          style={{
            width: 80,
            height: 80,
            resizeMode: 'contain',
          }}
        />
      </View>

      <View
        style={{
          width: '100%',
        }}>
        <Text
          style={{
            color: '#0F1121',
            fontSize: 15,
            fontFamily: 'DMSans-SemiBold',
          }}>
          {product.name}
        </Text>

        <Text
          style={{
            color: '#7C7C7C',
            fontSize: 15,
            fontFamily: 'DMSans-SemiBold',
            marginTop: 5,
          }}>
          R$ {product.price}
        </Text>
      </View>
    </Pressable>
  );
}
