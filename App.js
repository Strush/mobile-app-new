import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import StoreProvider from "./src/Store";
import TabsMenu from "./src/components/TabsMenu";

export default function App() {
  return (
    <StoreProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <TabsMenu />
        </NavigationContainer>
      </NativeBaseProvider>
    </StoreProvider>
  );
}
