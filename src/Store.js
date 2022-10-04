import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  userInfo: AsyncStorage.getItem("@user_info").then((value) => {
    if (value) {
      JSON.parse(value);
    }
  }),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_SINGIN": {
      return { ...state, userInfo: action.payload };
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
