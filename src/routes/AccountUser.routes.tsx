import { createStackNavigator,TransitionPresets } from "@react-navigation/stack"
import { Login } from "../screens/Login"
import { CriarConta } from "../screens/CriarConta"

export function AccountUser(){
  const { Navigator, Screen } = createStackNavigator()
  return(
    <Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen 
        name="Login" 
        component={Login}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Screen 
        name="CriarConta" 
        component={CriarConta}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Navigator>
  )
}