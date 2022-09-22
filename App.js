import { NativeBaseProvider } from "native-base";
import { StatusBar } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";

export default function App() {
  return (
    <NativeBaseProvider>
      <LoginScreen />
      <StatusBar auto />
    </NativeBaseProvider>
  );
}
