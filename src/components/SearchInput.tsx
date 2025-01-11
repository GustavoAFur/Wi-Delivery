import {Pressable, Text, View} from 'react-native';
import Search from '../../assets/svgs/search-b.svg';

interface SearchInputProps {
  navTo: () => void;
}
export function SearchInput({navTo}: SearchInputProps) {
  return (
    <Pressable
      onPress={navTo}
      style={{
        width: '90%',
        backgroundColor: '#F5F6F8',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 30,
        padding: 15,
        paddingHorizontal: 20,
        marginTop: 24,
        gap: 10,
      }}>
      <Search width={20} height={20} />
      <Text
        style={{
          backgroundColor: '#F2F3F2',
          alignSelf: 'center',
          fontFamily: 'GeneralSans-Medium',
          borderRadius: 16,
          color: '#7C7C7C',
        }}>
        Pesquisar produto...
      </Text>
    </Pressable>
  );
}
