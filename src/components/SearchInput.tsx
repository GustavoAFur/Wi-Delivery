import { Pressable, Text, View } from "react-native";
import Search from '../../assets/svgs/search-b.svg'

interface SearchInputProps {
  navTo: () => void
}
export function SearchInput({ navTo }: SearchInputProps) {
  return(
    <Pressable
      onPress={navTo}
      style={{
      width: '90%',
      height: 45,
      backgroundColor: '#F2F3F2',
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 16,
      paddingLeft: 10,
      marginTop: 24
    }}>
      <Search width={20} height={20} />
      <Text
        style={ {
          backgroundColor: '#F2F3F2',
          alignSelf: 'center',
          fontFamily: 'GeneralSans-Semibold',
          borderRadius: 16,
          paddingLeft: 20,
          color: '#7C7C7C'
      
        }} >
        Pesquisar produto
      </Text>
    </Pressable>
  )
}