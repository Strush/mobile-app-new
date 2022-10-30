import React, { useEffect, useReducer } from "react";
import { Box, ScrollView, Toast } from "native-base";
import SearchBarScreen from "./SearchBarScreen";
import BannerBoxScreen from "./BannerBoxScreen";
import { StyleSheet } from "react-native";
import SliderProducts from "../components/SliderProducts";
import getError from "../utils";
import { WooCommerceDataAPI } from "../woocoomerce";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST": {
      return { ...state, loading: true };
    }
    case "FETCH_PRODUCTS_SUCCESS": {
      return { ...state, loading: false, products: action.payload };
    }
    case "FETCH_PRODUCTS_FAIL": {
      return { ...state, loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

function HomePageScreen({ navigation }) {
  let img = require("../../assets/login3.png");

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch({ type: "FETCH_PRODUCTS_REQUEST", loading: true });
        const data = await WooCommerceDataAPI.get("products", { category: 21 });
        dispatch({
          type: "FETCH_PRODUCTS_SUCCESS",
          loading: false,
          payload: data,
        });
      } catch (err) {
        dispatch({ type: "FETCH_PRODUCTS_FAIL", loading: false, error: err });
        Toast.show({
          description: getError(err),
          type: "error",
          style: {
            backgroundColor: "red",
          },
        });
      }
    };
    fetchProducts();
  }, []);

  return (
    <Box safeAreaTop position="relative">
      <SearchBarScreen />

      <ScrollView>
        <Box height={270}>
          <BannerBoxScreen
            style={backgroundImageCustomStyle.image}
            imgOverlay={backgroundImageCustomStyle.overlay}
            imgUrl={img}
          />
        </Box>
        <SliderProducts
          loading={loading}
          error={error}
          title="Șef"
          products={products}
          navigation={navigation}
        />
        <SliderProducts
          loading={loading}
          error={error}
          title="Soț"
          products={products}
          navigation={navigation}
        />
      </ScrollView>
    </Box>
  );
}

export default HomePageScreen;

const backgroundImageCustomStyle = StyleSheet.create({
  image: {
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    height: 270,
    display: "flex",
    justifyContent: "flex-end",
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#000",
    opacity: 0.6,
  },
});
