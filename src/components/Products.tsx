import { Image, Pressable, PressableProps, Text, View } from "react-native"
import Cart from '../../assets/images/icons8-carrinho-de-compras-carregado-100.png'
interface Props {
  product: {
    id: string
    name: string
    price: string
    images: string[]
    category: string
  }
}
export function Products({ product, navigation }: Props & PressableProps & { navigation: any }) {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('ProductDetails', { item: product })
      }}
      style={{
        width: 150,
        paddingVertical: 20,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: '#F1F3F5',
        gap: 8,
        margin: 5
      }}
    >
      <View
        style={{
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center'

        }}
      >
        <Image
          source={{ uri: product.images[0] }}
          style={{
            width: 80,
            height: 80,
            resizeMode: 'contain'
          }}
        />
      </View>

      <Text
        style={{
          color: '#0F1121',
          fontSize: 15,
          fontFamily: 'GeneralSans-Semibold'
        }}
      >
        {product.name}
      </Text>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            color: '#7C7C7C',
            fontSize: 15,
            fontFamily: 'GeneralSans-Semibold'
          }}
        >
          R$ {product.price}
        </Text>

      </View>

    </Pressable>
  )
}