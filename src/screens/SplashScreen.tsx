import { Image, StatusBar, Text, View } from "react-native";

export function SplashScreen(){
  return(
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff'
      }}
    >
      <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />
      <Image 
        source={require('../../assets/images/splash(1).png')}
        style={{
          width: '100%',
          resizeMode: 'contain'
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          gap: 5
        }}
      >
      <Text style={{
          fontSize: 26,
          alignSelf: 'center',
          color: '#EE2F2A',
          fontFamily: 'GeneralSans-SemiboldItalic'
        }}>
          Super
        </Text>
        <Text style={{
          fontSize: 26,
          alignSelf: 'center',
          color: '#323232',
          
          fontFamily: 'GeneralSans-SemiboldItalic'
        }}>
          Dantas
        </Text>
      </View>
     
    </View>
  )
}