import { Pressable, PressableProps, Text, View } from "react-native";

import MapPin from '../../assets/svgs/map-pin.svg'
import BackgroundMap from '../../assets/svgs/map.svg'

interface Props {
  street: string
  number: string
  neighborhood: string
  navTo: () => void
}
export function YourAdress({street,number, neighborhood, navTo}: Props & PressableProps) {
  return (
    <Pressable 
    onPress={navTo}
    style={{
      width: '100%',
      marginTop: 24,
      paddingHorizontal: 20,
    }}>
      <View style={{
        width: '100%',
        height: 80,
        backgroundColor: '#F2F6FC',
        borderRadius: 12,
        overflow: 'hidden',
      }}>

        <View style={{
          width: '100%',
          height: 80,
          borderRadius: 12,
          zIndex: 1,
          position: 'absolute',
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8
        }}>

          <MapPin
            width={24}
            height={24}
          />

          <View style={{
            alignItems: 'flex-start'
          }}>
            <Text style={{
              color: '#808D9E',
              fontSize: 12,
              fontFamily: 'GeneralSans-Medium',
            }}>
              O seu endereço de delivery
            </Text>

            <Text style={{
              color: '#191A26',
              fontSize: 14,
              fontFamily: 'GeneralSans-Semibold',
            }}>
              {street}, {number} - {neighborhood}
            </Text>
          </View>
        </View>

        <BackgroundMap
          style={{
            width: 335,
            height: 80,
            position: 'absolute',
            zIndex: 0,
          }}
        />
      </View>

    </Pressable>
  );
}