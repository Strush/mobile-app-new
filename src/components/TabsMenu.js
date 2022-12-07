import React, { useContext } from "react";
import { Text, View } from "native-base";
import { Store } from "../Store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProductsCategoriesScreen from "../screens/ProductsCategoriesScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "../screens/Products";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SingleProduct from "../screens/SingleProduct";
import HomePageScreen from "../screens/HomePageScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import PaymentScreen from "../screens/PaymentScreen";
import CreateOrderScreen from "../screens/CreateOrderScreen";
import exOrder from "../screens/exOrder";

const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();
const ProductStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Login" component={LoginScreen} />
      <ProfileStack.Screen name="Register" component={RegisterScreen} />
    </ProfileStack.Navigator>
  );
}

function HomepageStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomePageScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="SingleProduct"
        component={SingleProduct}
        options={{
          title: "Înapoi",
          headerBackTitle: "Înapoi",
        }}
      />
    </HomeStack.Navigator>
  );
}

function CartStackScreen() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name="Cart"
        options={{
          title: "Coș",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            color: "#000",
          },
        }}
        component={CartScreen}
      />
      <CartStack.Screen
        name="PlaceOrder"
        options={{
          title: "Adresa de livrare",
          tabBarVisible: false,
          headerTitleAlign: "center",
          headerBackTitle: "Înapoi",
        }}
        component={PlaceOrderScreen}
      />

      <CartStack.Screen
        name="Payment"
        options={{
          title: "Metoda de plată",
          headerTitleAlign: "center",
          headerBackTitle: "Înapoi",
        }}
        component={PaymentScreen}
      />
      <CartStack.Screen
        name="order"
        options={{
          title: "Comanda dumneavoastră",
          headerBackTitle: "",
        }}
        component={CreateOrderScreen}
      />
    </CartStack.Navigator>
  );
}

function ProductStackTab() {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen
        name="Categories"
        component={ProductsCategoriesScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProductStack.Screen
        name="Products"
        options={{
          title: "",
          headerBackTitle: "Înapoi",
          style: {
            padding: 0,
          },
        }}
        component={Products}
      />
      <ProductStack.Screen
        name="SingleProduct"
        options={{
          title: "",
          headerBackTitle: "Înapoi",
          headerStyle: { paddingVertical: 0, margin: 0, height: 20 },
          headerStatusBarHeight: 20,
        }}
        component={SingleProduct}
      />
    </ProductStack.Navigator>
  );
}

export default function TabsMenu({ routeName }) {
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const hideTabBar = routeName === "PlaceOrder";

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: 14,
          marginTop: -7,
          paddingBottom: 7,
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 100,
          //display: hideTabBar ? "none" : "flex",
        },
      }}
    >
      <Tab.Screen
        name="CartToHome"
        component={HomepageStackScreen}
        options={{
          tabBarLabel: "Acasă",
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
        name="ProductsCategories"
        component={ProductStackTab}
        options={{
          tabBarLabel: "Produse",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign
              name="isv"
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
        name="Coș"
        component={CartStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                position: "relative",
              }}
            >
              <MaterialCommunityIcons
                name="cart-outline"
                color={color}
                size={size}
                style={{
                  zIndex: 9,
                }}
              />
              {cartItems.length > 0 && (
                <View
                  style={{
                    backgroundColor: "#FF0000",
                    zIndex: 11,
                    borderRadius: 50,
                    position: "absolute",
                    left: 15,
                    overflow: "hidden",
                    top: -7,
                    width: 20,
                    height: 20,
                  }}
                >
                  <Text color="#fff" textAlign="center" fontSize={13}>
                    {cartItems.length}
                  </Text>
                </View>
              )}
            </View>
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
  );
}
