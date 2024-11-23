import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {SignIn} from '../screens/SignIn';
import {SignUp} from '../screens/SignUp';
import {AccountRecover} from '../screens/AccountRecover';

export function AuthRoutes() {
  const {Navigator, Screen} = createStackNavigator();
  return (
    <Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}>
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
      <Screen
        name="AccountRecover"
        component={AccountRecover}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Navigator>
  );
}
