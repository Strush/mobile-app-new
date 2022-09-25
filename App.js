import { NativeBaseProvider } from "native-base";
import { StatusBar } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

export default function App() {
  return (
    <NativeBaseProvider>
      <LoginScreen />
      <StatusBar auto />
    </NativeBaseProvider>
  );
}
