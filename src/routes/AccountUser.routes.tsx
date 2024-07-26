import { createStackNavigator,TransitionPresets } from "@react-navigation/stack"
import { SignIn } from "../screens/SignIn"
import { SignUp } from "../screens/SignUp"

export function AccountUser(){
  const { Navigator, Screen } = createStackNavigator()
  return(
    <Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen 
        name="SignIn" 
        component={SignIn}
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