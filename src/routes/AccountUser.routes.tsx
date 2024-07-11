import { createStackNavigator,TransitionPresets } from "@react-navigation/stack"
import { SingIn } from "../screens/SingIn"
import { SignUp } from "../screens/SignUp"

export function AccountUser(){
  const { Navigator, Screen } = createStackNavigator()
  return(
    <Navigator
      initialRouteName="SingIn"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen 
        name="SingIn" 
        component={SingIn}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Screen 
        name="SignUp" 
        component={SignUp}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Navigator>
  )
}