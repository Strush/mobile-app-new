import { Box, HStack, Image, ScrollView, Text, Toast } from "native-base";
import React, { useContext, useEffect, useReducer } from "react";
import { TouchableOpacity } from "react-native";
import { Rating } from "react-native-ratings";
import MessageBox from "../components/MessageBox";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Store } from "../Store";
import getError from "../utils";
import { WooCommerceDataAPI } from "../woocoomerce";

const reducer = (state, action) => {
  switch (action.type) {
    case "ORDER_REQUEST": {
      return { ...state, loading: true };
    }
    case "ORDER_SUCCESS": {
      return { ...state, loading: false, order: action.payload };
    }
    case "ORDER_FAIL": {
      return { ...state, loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

const CreateOrderScreen = () => {
  const { state } = useContext(Store);
  const { cart, userInfo } = state;
  const { cartItems } = cart;

  const [{ loading, order, error }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const createOrder = async () => {
      try {
        dispatch({ type: "ORDER_REQUEST", loading: true });
        const order = await WooCommerceDataAPI.post("orders", {
          payment_method: cart.paymentMethod.id,
          payment_method_title: cart.paymentMethod.title,
          set_paid: false,
          billing: userInfo.address,
          shipping: userInfo.address,
          line_items: cartItems.map(({ id, quantity }) => {
            return { product_id: id, quantity: quantity };
          }),

          shipping_lines: [cart.deliveryMethod],
        });
        dispatch({
          type: "ORDER_SUCCESS",
          loading: false,
          payload: order,
        });
      } catch (err) {
        dispatch({ type: "ORDER_FAIL", loading: false, payload: err });
        Toast.show({
          description: getError(err),
          type: "error",
          style: {
            backgroundColor: "red",
          },
        });
      }
    };
    createOrder();
  }, []);

  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <ScrollView>
          <Box>
            <Box p={4} mt={2}>
              <Box
                bg="#fff"
                mb={10}
                mt={4}
                px={3}
                style={{
                  borderRadius: 5,
                }}
              >
                <HStack
                  space={2}
                  bg="#fff"
                  w="90%"
                  shadow={3}
                  mb={3}
                  mx="auto"
                  mt={-5}
                  style={{
                    display: "flex",
                    height: 36,
                    borderRadius: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AntDesign name="skin" size={24} color="black" />
                  <Text bold>Produse</Text>
                </HStack>
                {order.line_items.map((product) => (
                  <HStack
                    style={{
                      display: "flex",
                      overflow: "hidden",
                      width: "100%",
                      height: 110,
                      backgroundColor: "#fff",
                      shadow: 1,
                      borderColor: "#ccc",
                      borderWidth: 1,
                      borderRadius: 5,
                      marginBottom: 10,
                    }}
                    key={product.id}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("SingleProduct", {
                          productId: product.id,
                        })
                      }
                    >
                      <Image
                        width="110px"
                        height="100%"
                        resizeMode="cover"
                        source={{
                          uri: product.image.src,
                        }}
                        alt="No image"
                      />
                    </TouchableOpacity>

                    <Box p={2} flex={1} justifyContent="center">
                      <TouchableOpacity
                        style={{
                          marginBottom: 1,
                          display: "flex",
                          justifyContent: "center",
                          height: 40,
                        }}
                        onPress={() =>
                          navigation.navigate("SingleProduct", {
                            productId: product.id,
                          })
                        }
                      >
                        <Text fontSize={12} lineHeight={16} noOfLines={2} bold>
                          {product.name}
                        </Text>
                      </TouchableOpacity>

                      <HStack mb={1}>
                        <Rating
                          type="star"
                          startingValue={product?.rating_count}
                          ratingCount={5}
                          imageSize={14}
                        />
                      </HStack>

                      <HStack>
                        <Text bold fontSize={12}>
                          Cantitatea: {product.quantity} buc
                        </Text>
                      </HStack>
                      <HStack>
                        <Text bold fontSize={12}>
                          Prețul: {product.price} Lei
                        </Text>
                      </HStack>
                    </Box>
                  </HStack>
                ))}
              </Box>
              <Box
                shadow={1}
                px={3}
                pb={3}
                mb={5}
                bg="#fff"
                rounded={5}
                w="full"
              >
                <HStack
                  space={2}
                  bg="#fff"
                  w="90%"
                  shadow={3}
                  mb={3}
                  mx="auto"
                  mt={-5}
                  style={{
                    display: "flex",
                    height: 36,
                    borderRadius: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesome name="map-marker" size={24} color="black" />
                  <Text bold>Adresa</Text>
                </HStack>
                <Text mb={1}>
                  <Text fontWeight={600}>Adresa:</Text>
                  {" " +
                    order.billing.first_name +
                    " " +
                    order.billing.last_name +
                    ", " +
                    order.billing.address_1 +
                    ", " +
                    order.billing.city +
                    ", " +
                    order.billing.postcode +
                    order.billing.country}
                </Text>
                <Text mb={1}>
                  <Text fontWeight={600}>Telefon:</Text>{" "}
                  {" " + order.billing.phone}
                </Text>
                <Text mb={1}>
                  <Text fontWeight={600}>Email:</Text>{" "}
                  {" " + order.billing.email}
                </Text>
              </Box>
              <Box
                shadow={1}
                px={3}
                pb={3}
                mt={5}
                bg="#fff"
                rounded={5}
                w="full"
              >
                <HStack
                  space={2}
                  bg="#fff"
                  w="90%"
                  shadow={3}
                  mb={3}
                  mx="auto"
                  mt={-5}
                  style={{
                    display: "flex",
                    height: 36,
                    borderRadius: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AntDesign name="pushpin" size={24} color="black" />
                  <Text bold>Detalii</Text>
                </HStack>
                <Text mb={1}>
                  <Text fontWeight={600}>Total:</Text>
                  {" " + order.total + " lei"}
                </Text>
                <Text mb={1}>
                  <Text fontWeight={600}>Livrare:</Text>{" "}
                  {" " +
                    order.shipping_lines[0].method_title +
                    ` (${order.shipping_lines[0].total} lei)`}
                </Text>
                <Text mb={1}>
                  <Text fontWeight={600}>Metoda de Plată:</Text>{" "}
                  {" " + order.payment_method_title}
                </Text>
                <Text mb={1}>
                  <Text fontWeight={600}>Data:</Text> {" " + order.date_created}
                </Text>
                <Text>
                  <Text fontWeight={600}>Status:</Text>
                  {order.payment_method === "cod" ? (
                    <Text
                      bold
                      style={{
                        fontSize: 18,
                        color: "green",
                      }}
                    >
                      {" "}
                      Confirmată
                    </Text>
                  ) : (
                    <Text
                      bold
                      style={{
                        fontSize: 18,
                      }}
                    >
                      {" " + order.status}
                    </Text>
                  )}
                </Text>
              </Box>
            </Box>
          </Box>
        </ScrollView>
      )}
    </>
  );
};

export default CreateOrderScreen;
