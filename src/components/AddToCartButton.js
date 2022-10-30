import { TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { HStack, Text, Toast } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Store } from "../Store";
import { WooCommerceDataAPI } from "../woocoomerce";

const AddToCartButton = ({ product, BtnHeight, TextSize, IconSize }) => {
  const { state, dispatch: ctxContext } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (product) => {
    const existProduct = cartItems.find((x) => x.id === product.id);
    const quantity = existProduct ? existProduct.quantity + 1 : 1;
    const productData = await WooCommerceDataAPI.get(`/products/${product.id}`);
    if (productData.stock_quantity < quantity) {
      Toast.show({
        description: "Acest produs nu mai este in stock",
        type: "error",
        style: {
          backgroundColor: "red",
        },
      });
      return;
    }

    ctxContext({
      type: "ADD_PRODUCT_TO_CART",
      payload: { ...product, quantity },
    });
  };

  return (
    <TouchableOpacity
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        backgroundColor: "#3C5898",
        height: BtnHeight,
        paddingHorizontal: 12,
        paddingLeft: 4,
        borderRadius: 3,
      }}
      onPress={() => addToCartHandler(product)}
    >
      <HStack alignItems="center" space="2">
        <MaterialIcons name="add-shopping-cart" size={IconSize} color="#fff" />
        <Text color="#fff" bold fontSize={TextSize}>
          În coș
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export default AddToCartButton;
