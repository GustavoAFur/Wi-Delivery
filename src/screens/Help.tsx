import { StatusBar, Text, TouchableOpacity, View } from "react-native"
import ScreenBack from '../../assets/svgs/arrow-right.svg'
import { getStatusBarHeight } from "react-native-status-bar-height"

export function Help({ navigation }: { navigation: any }) {
  return (
    <View
      style={{ 
        flex: 1,
        paddingVertical: getStatusBarHeight(),
      }}
    >
      <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />
      <View style={{
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
        <TouchableOpacity
          style={{
            width: 20,
            height: 20,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: 20
          }}
          onPress={() => {
            //@ts-ignore
            navigation.goBack()
          }}
        >
          <ScreenBack width={20} height={20} />
        </TouchableOpacity>
        <Text style={{
          fontSize: 18,
          alignSelf: 'center',
          color: '#323232',
          fontFamily: 'GeneralSans-Semibold'
        }}>
          Ajuda
        </Text>
      </View>
    </View>
  )
}