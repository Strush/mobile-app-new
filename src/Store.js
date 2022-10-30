import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  userInfo: {
    token: AsyncStorage.getItem("@user_info").then((value) => {
      if (value) {
        JSON.parse(value);
      }
    }),
    address: {
      address_2: "",
      city: "Bacau",
      state: "Ro",
      postcode: "60017",
      country: "Romania",
    },
  },
  cart: {
    cartItems: [],
    deliveryMethod: {
      method_id: "",
      method_title: "",
      total: 0,
    },
    paymentMethod: "card",
  },
};

// AsyncStorage.getItem("cartItems").then((value) =>
//       value ? JSON.parse(value) : []

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_SINGIN": {
      return { ...state, userInfo: action.payload };
    }

    // Add product to cart
    case "ADD_PRODUCT_TO_CART": {
      const newProduct = action.payload;
      const existProduct = state.cart.cartItems.find(
        (x) => x.id === newProduct.id
      );
      const cartItems = existProduct
        ? state.cart.cartItems.map((item) => {
            return item.id === newProduct.id ? newProduct : item;
          })
        : [...state.cart.cartItems, newProduct];

      //AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "REMOVE_PRODUCT_FROM_CART": {
      const product = action.payload;
      const cartItems = state.cart.cartItems.filter((x) => x.id !== product.id);

      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "SAVE_DELIVERY_ADDRESS": {
      const address = action.payload;
      return {
        ...state,
        userInfo: { ...state.userInfo, address },
      };
    }

    case "SAVE_DELIVERY_METHOD": {
      const deliveryMethod = action.payload;
      return { ...state, cart: { ...cart.cart, deliveryMethod } };
    }

    case "SAVE_PAYMENT_METHOD": {
      return { ...state, paymentMethod: action.payload };
    }

    default:
      return state;
  }
};

export default StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
