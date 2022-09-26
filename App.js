import { NativeBaseProvider } from "native-base";
import { StatusBar } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomePageScreen from "./src/screens/HomePageScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StoreProvider from "./src/Store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StoreProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Autentificare" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomePageScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        {/* <LoginScreen /> */}
        <StatusBar auto />
      </NativeBaseProvider>
    </StoreProvider>
  );
}
