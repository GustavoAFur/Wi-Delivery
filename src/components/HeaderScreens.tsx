import {View, Text, Pressable, PressableProps} from 'react-native';

import ScreenBack from '../../assets/svgs/arrow-right.svg';

interface Props {
  navigation: any;
  title: string;
}
export function HeaderScreens({navigation, title}: Props & PressableProps) {
  return (
    <View
      style={{
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 0.5,
      }}>
      <Pressable
        style={{
          width: 20,
          height: 20,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          left: 20,
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        <ScreenBack width={20} height={20} />
      </Pressable>
      <Text
        style={{
          fontSize: 18,
          alignSelf: 'center',
          color: '#323232',
          fontFamily: 'DMSans-SemiBold',
        }}>
        {title}
      </Text>
    </View>
  );
}
