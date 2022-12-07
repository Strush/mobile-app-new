import { Box, HStack, Image, ScrollView, Text, useToast } from "native-base";
import React, { useContext, useEffect, useReducer } from "react";
import { TouchableOpacity } from "react-native";
import Loading from "../components/Loading";
import { WooCommerceDataAPI } from "../woocoomerce";
import { MaterialIcons } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { Store } from "../Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_PRODUCTS_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Products({ route, navigation }) {
  const { categoryID } = route.params;
  let img = require("../../assets/login3.png");
  const toast = useToast();

  const { state, dispatch: ctxContext } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  console.log("cartitems ->>>>", cartItems);

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    products: null,
    error: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "FETCH_PRODUCTS_REQUEST", loading: true });
      try {
        const data = await WooCommerceDataAPI.get("products", {
          category: categoryID,
        });
        dispatch({
          type: "FETCH_PRODUCTS_SUCCESS",
          loading: false,
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: "FETCH_PRODUCTS_FAIL",
          loading: false,
          payload: err,
        });
      }
    };

    fetchProducts();
  }, [categoryID]);

  // Add to cart product handler
  const addProductToCartHandler = async (product) => {
    const existProduct = cartItems.find((x) => x.id === product.id);
    const quantity = existProduct ? existProduct.quantity + 1 : 1;
    const productData = await WooCommerceDataAPI.get(`products/${product.id}`);
    if (productData.stock_quantity < quantity) {
      toast.show({
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
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Text>Error...</Text>
      ) : (
        <ScrollView>
          <Box>
            {
              <HStack flexDirection="column" px="2" mt="2">
                {products.map((product) => (
                  <TouchableOpacity
                    style={{
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      marginBottom: 10,
                      backgroundColor: "#fff",
                      padding: 3,
                      shadow: 1,
                      alignItems: "center",
                      rounded: "lg",
                    }}
                    key={product.id}
                    onPress={() =>
                      navigation.navigate("SingleProduct", {
                        productId: product.id,
                      })
                    }
                  >
                    <Image
                      width="120px"
                      height="125px"
                      mr={3}
                      resizeMode="cover"
                      source={{
                        uri: product.images ? product.images[0].src : "test",
                      }}
                      alt=""
                    />
                    <Box flex={1} margin={0}>
                      <Text
                        fontSize="sm"
                        lineHeight={18}
                        mb={2}
                        noOfLines={2}
                        bold
                      >
                        {product.name}
                      </Text>

                      <Text mb={1}>
                        <Rating
                          type="star"
                          startingValue={product?.rating_count}
                          ratingCount={5}
                          imageSize={14}
                        />
                      </Text>

                      <HStack
                        alignItems="flex-end"
                        justifyContent="space-between"
                        pr={2}
                      >
                        <Box>
                          {product?.stock_quantity > 0 ? (
                            <Text color="green.600" mb={1} fontSize={13}>
                              În Stock
                            </Text>
                          ) : (
                            <Text
                              color="red.600"
                              fontWeight={500}
                              mb={1}
                              fontSize={13}
                            >
                              Stock Epuizat
                            </Text>
                          )}

                          <Text color="gray.700">
                            <Text bold>{product.price} Lei</Text>
                          </Text>
                        </Box>

                        {product?.stock_quantity > 0 ? (
                          <TouchableOpacity
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              overflow: "visible",
                              backgroundColor: "#3C5898",
                              height: 30,
                              paddingHorizontal: 16,
                              borderRadius: 5,
                            }}
                            onPress={() => addProductToCartHandler(product)}
                          >
                            <HStack alignItems="center" space="2">
                              <MaterialIcons
                                name="add-shopping-cart"
                                size={18}
                                color="#fff"
                              />
                              <Text color="#fff" bold>
                                În Coș
                              </Text>
                            </HStack>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              overflow: "visible",
                              backgroundColor: "#EB1D36",
                              height: 30,
                              paddingHorizontal: 10,
                              borderRadius: 5,
                              opacity: 0.8,
                            }}
                            onPress={() =>
                              navigation.navigate("SingleProduct", {
                                productId: product.id,
                              })
                            }
                          >
                            <HStack alignItems="center" space="2">
                              <Text color="#fff" bold>
                                Indisponibil
                              </Text>
                            </HStack>
                          </TouchableOpacity>
                        )}
                      </HStack>
                    </Box>
                  </TouchableOpacity>
                ))}
              </HStack>
            }
          </Box>
        </ScrollView>
      )}
    </>
  );
}
