import { Dimensions, Image, StatusBar, Text, TouchableOpacity, View } from "react-native"
import { getStatusBarHeight } from "react-native-status-bar-height"

export function InserirDadosInfo({ navigation }: { navigation: any }) {

  const { width, height } = Dimensions.get("window")

  return (
    <View style={{
      width: width,
      height: height + getStatusBarHeight(),
      paddingTop: getStatusBarHeight(),
      flex: 1,
      backgroundColor: '#fff',
    }}>

      <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />

      <View
        style={{
          width: width,
          height: '50%',
          paddingHorizontal: 20,
          paddingVertical: 40,
        }}
      >
        <Image
            source={require('./../../assets/images/Work-time.png')}
            resizeMode='contain'
            style={{
              width: '100%',
              height: '100%',
            }}
          />
      </View>

      <View
        style={{
          width: width,
          height: '50%',
          paddingHorizontal: 20,
          paddingVertical: 40,
        }}
      >
        <Text style={{
          fontSize: 28,
          fontFamily: 'DMSans-SemiBold',
          color: '#0F1121',
          textAlign: 'center',
          marginVertical: 20,
        }}>
          Menos de
          <Text style={{
            fontFamily: 'DMSans-Bold',
            color: '#EE2F2A',
          }}>
            {' '}um minuto!
          </Text> 
          
        </Text>

        <Text style={{
          fontSize: 20,
          lineHeight: 24,
          fontFamily: 'DMSans-Light',
          color: '#0F1121',
          textAlign: 'center',
        }}>
          Insira seus dados para uma melhor experiência
        </Text>

        <TouchableOpacity
          onPress={()=>{
            navigation.navigate('InfoPersonalDetails')
          }}
          style={{
            width: '100%',
            height: 55,
            paddingHorizontal: 20,
            justifyContent: 'center',
            backgroundColor: '#EE2F2A',
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 80
          }}>
          <Text style={{
            fontSize: 18,
            fontFamily: 'DMSans-SemiBold',
            color: '#fff',
          }}>
            Continuar
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}