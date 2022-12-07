import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useReducer, useState } from "react";

export const Store = createContext();

const initialState = {
  userInfo: {
    token: null,
    address: {},
  },
  cart: {
    cartItems: [],
    deliveryMethod: null,
    paymentMethod: null,
  },
};

console.log("initial state ->", initialState);

// Set storage user address
AsyncStorage.getItem("userInfoAddress").then((add) =>
  add ? (initialState.userInfo.address = JSON.parse(add)) : {}
);

// Set storage cart items
AsyncStorage.getItem("cartItems").then((items) =>
  items ? (initialState.cart.cartItems = JSON.parse(items)) : []
);

// Set storage payment method
AsyncStorage.getItem("deliveryMethod").then((delivery) =>
  delivery ? (initialState.cart.deliveryMethod = JSON.parse(delivery)) : null
);

// Set storage payment method
AsyncStorage.getItem("paymentMethod").then((payment) =>
  payment ? (initialState.cart.paymentMethod = JSON.parse(payment)) : null
);

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_SINGIN": {
      // Send token on async storage
      AsyncStorage.setItem("secret_token", JSON.stringify(data));

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

      AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "REMOVE_PRODUCT_FROM_CART": {
      const product = action.payload;
      const cartItems = state.cart.cartItems.filter((x) => x.id !== product.id);

      AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));

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
      AsyncStorage.setItem("deliveryMethod", JSON.stringify(deliveryMethod));
      return { ...state, cart: { ...state.cart, deliveryMethod } };
    }

    case "SAVE_PAYMENT_METHOD": {
      const paymentMethod = action.payload;
      AsyncStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
      return { ...state, cart: { ...state.cart, paymentMethod } };
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
