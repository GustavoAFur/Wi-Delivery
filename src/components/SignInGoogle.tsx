import { Image, Text, TouchableOpacity } from "react-native";

export function SignInGoogle(){
  return(
    <TouchableOpacity
          style={{
            backgroundColor: '#F2F3F2',
            borderRadius: 8,
            width: '95%',
            alignSelf: 'center',
            paddingHorizontal: 20,
            paddingVertical: 12,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginBottom: 20,
          }}
        >
          <Image
            source={require('./../../assets/images/google-logo.png')}
            resizeMode='contain'
            style={{
              height: 15,
              width: 15,
              position: 'absolute',
              left: 30,
            }}
          />
          <Text style={{
            fontSize: 16,
            fontFamily: 'GeneralSans-Light',
            color: '#0F1121',
          }}>
            SingIn com Google
          </Text>
        </TouchableOpacity>
  )
}