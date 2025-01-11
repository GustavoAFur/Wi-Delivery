import {FlatList, View} from 'react-native';
import {Products} from './Products';
interface product {
  id: string;
  name: string;
  price: string;
  category: string;
  images: string[];
}

interface Props {
  product: product[];
  navigation: any;
}

export function ProductsList({product, navigation}: Props) {
  return (
    <View
      style={{
        paddingHorizontal: 0,
      }}>
      <FlatList
        style={{
          paddingHorizontal: 10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={product} // wrap the product object in an array
        renderItem={({item}) => {
          return <Products product={item} navigation={navigation} />;
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
