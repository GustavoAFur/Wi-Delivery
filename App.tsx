import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Routes } from './src/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/hooks/auth';

export default function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

