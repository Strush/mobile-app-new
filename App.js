import { NativeBaseProvider } from "native-base";
import LoginScreen from "./src/screens/LoginScreen";
import HomePageScreen from "./src/screens/HomePageScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import StoreProvider from "./src/Store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./src/screens/RegisterScreen";

// const Tab = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Profile = createStackNavigator();

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Login" component={LoginScreen} />
      <ProfileStack.Screen name="Register" component={RegisterScreen} />
    </ProfileStack.Navigator>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: {
                fontSize: 14,
                marginTop: -7,
                paddingBottom: 7,
              },
              tabBarStyle: {
                backgroundColor: "#fff",
                //paddingTop: 10,
                height: 100,
              },
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomePageScreen}
              options={{
                tabBarLabel: "Acasa",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <AntDesign
                    name="home"
                    style={{
                      marginBottom: 0,
                      paddingBottom: 0,
                    }}
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Contul Meu"
              component={ProfileStackScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <SimpleLineIcons name="user" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </StoreProvider>
  );
}
