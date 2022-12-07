import { NativeBaseProvider } from "native-base";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import StoreProvider from "./src/Store";
import TabsMenu from "./src/components/TabsMenu";
import { useState } from "react";

export default function App() {
  const ref = createNavigationContainerRef();
  const [routeName, setRouteName] = useState();

  return (
    <StoreProvider>
      <NativeBaseProvider>
        <NavigationContainer
          ref={ref}
          onReady={() => {
            setRouteName(ref.getCurrentRoute().name);
          }}
          onStateChange={async () => {
            const currentRouteName = ref.getCurrentRoute().name;
            setRouteName(currentRouteName);
          }}
        >
          <TabsMenu routeName={routeName} />
        </NavigationContainer>
      </NativeBaseProvider>
    </StoreProvider>
  );
}
