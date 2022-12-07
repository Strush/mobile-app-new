import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  ScrollView,
  Text,
  Toast,
  Radio,
  Divider,
  Skeleton,
  VStack,
  StatusBar,
} from "native-base";
import { Store } from "../Store";
import { TouchableOpacity } from "react-native";
import { Rating } from "react-native-ratings";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { WooCommerceDataAPI } from "../woocoomerce";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducer = (state, action) => {
  switch (action.type) {
    case "DELIVERY_METHODS_REQUEST": {
      return { ...state, loading: true };
    }
    case "DELIVERY_METHODS_SUCCESS": {
      return { ...state, loading: false, methods: action.payload };
    }
    case "DELIVERY_METHODS_FAIL": {
      return { ...state, loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default function CartScreen({ navigation }) {
  const { state, dispatch: ctxContext } = useContext(Store);
  const [{ loading, error, methods }, dispatch] = useReducer(reducer, {
    loading: true,
    methods: [],
    error: "",
  });

  const {
    cart: { cartItems },
  } = state;

  const [deliveryMethod, setDeliveryMethod] = useState(
    state.cart.deliveryMethod || {
      method_id: "local_pickup",
      method_title: "Colectare locală",
      total: "0 lei",
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "DELIVERY_METHODS_REQUEST", loading: true });
        const data = await WooCommerceDataAPI.get("shipping/zones/1/methods");
        dispatch({
          type: "DELIVERY_METHODS_SUCCESS",
          loading: false,
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: "DELIVERY_METHODS_FAIL",
          loading: false,
          payload: err,
        });
        Toast.show({
          description: "Ceva nu a mers bine!?",
          type: "error",
          style: {
            backgroundColor: "red",
          },
        });
      }
    };
    fetchData();
  }, []);

  const updateCartHandler = async (product, quantity) => {
    const data = await WooCommerceDataAPI.get(`products/${product.id}`);
    if (quantity > data.stock_quantity) {
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

    await AsyncStorage.setItem(
      "cartItems",
      JSON.stringify({ ...product, quantity })
    );
  };

  const removeProductHandler = async (product) => {
    ctxContext({ type: "REMOVE_PRODUCT_FROM_CART", payload: product });
  };

  const saveDeliveryMethod = async (obj) => {
    ctxContext({
      type: "SAVE_DELIVERY_METHOD",
      payload: obj,
    });

    navigation.navigate("PlaceOrder");
  };

  const getDeliveryMethodHandler = (methodId) => {
    const method = methods.find((x) => x.method_id === methodId);
    const {
      title,
      settings: {
        cost: { value },
      },
    } = method;
    let total = value ? value + " lei" : "0 lei";
    setDeliveryMethod({
      method_id: methodId,
      method_title: title,
      total: total,
    });
  };

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: cartItems.length > 0 ? 0 : 1,
          justifyContent: "center",
        }}
      >
        <Box mt={1}>
          <HStack flexDirection="column" px="2">
            {cartItems.length > 0 ? (
              cartItems.map((product, index) => (
                <Box
                  style={{
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    marginTop: 10,
                    backgroundColor: "#fff",
                    padding: 3,
                    shadow: 1,
                    alignItems: "center",
                    borderRadius: 7,
                  }}
                  key={index}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("SingleProduct", {
                        productId: product.id,
                      })
                    }
                  >
                    <Image
                      width="130px"
                      height="130px"
                      mr={3}
                      resizeMode="cover"
                      source={{
                        uri: product.images ? product.images[0].src : "test",
                      }}
                      alt=""
                    />
                  </TouchableOpacity>

                  <Box flex={1} margin={0} pr={1}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("SingleProduct", {
                          productId: product.id,
                        })
                      }
                    >
                      <Text
                        fontSize={13}
                        lineHeight={16}
                        mb={2}
                        noOfLines={2}
                        bold
                      >
                        {product.name}
                      </Text>
                    </TouchableOpacity>

                    <Text mb={1}>
                      <Rating
                        type="star"
                        startingValue={product?.average_rating}
                        ratingCount={5}
                        imageSize={14}
                      />
                    </Text>

                    <HStack
                      alignItems="flex-end"
                      justifyContent="space-between"
                      pr={2}
                    >
                      <Box flex={1}>
                        <Flex flexDirection="row" mb={2} alignItems="center">
                          <Text bold mr={3} fontSize={13}>
                            Cantitatea:
                          </Text>
                          <HStack space={3}>
                            <Button
                              h={6}
                              w={7}
                              p={0}
                              bg="transparent"
                              borderWidth={1}
                              borderColor="#FFCACA"
                              onPress={() =>
                                updateCartHandler(product, product.quantity - 1)
                              }
                              isDisabled={product.quantity === 1}
                            >
                              <Text
                                color="#000"
                                fontSize={24}
                                lineHeight={24}
                                fontWeight={600}
                              >
                                -
                              </Text>
                            </Button>
                            <Text>{product.quantity}</Text>
                            <Button
                              h={6}
                              w={7}
                              p={0}
                              bg="transparent"
                              borderWidth={1}
                              borderColor="#A8E890"
                              onPress={() =>
                                updateCartHandler(product, product.quantity + 1)
                              }
                              isDisabled={
                                product.quantity === product.stock_quantity
                              }
                            >
                              <Text
                                color="#000"
                                fontSize={18}
                                lineHeight={18}
                                fontWeight={600}
                              >
                                +
                              </Text>
                            </Button>
                            <Button
                              p={0}
                              variant="link"
                              onPress={() => removeProductHandler(product)}
                            >
                              <FontAwesome
                                name="trash-o"
                                size={24}
                                color="#CF0A0A"
                              />
                            </Button>
                          </HStack>
                        </Flex>
                        <Text color="gray.700">
                          <Text bold>{product.price} Lei</Text>
                        </Text>
                      </Box>
                    </HStack>
                  </Box>
                </Box>
              ))
            ) : (
              <Center>
                <MaterialCommunityIcons
                  name="cart-minus"
                  size={100}
                  color="#EB1D36"
                />
                <Text my={3} fontSize={20}>
                  Coșul tău este gol
                </Text>
                <Button
                  py={1}
                  style={{
                    borderWidth: 1,
                    borderColor: "#3C5898",
                    borderRadius: 25,
                    backgroundColor: "transparent",
                  }}
                  onPress={() => navigation.navigate("CartToHome")}
                >
                  <Text color="#3C5898" fontWeight={600}>
                    Continuă cumparăturile
                  </Text>
                </Button>
              </Center>
            )}
          </HStack>
        </Box>
      </ScrollView>
      {cartItems.length > 0 && (
        <Box py={4} px={3} background="#fff">
          {loading ? (
            <VStack space={3}>
              <HStack space={3}>
                <Skeleton
                  style={{
                    width: "30%",
                  }}
                  h={5}
                  rounded="full"
                />
                <Skeleton
                  h={5}
                  style={{
                    width: "65%",
                  }}
                  rounded="full"
                />
              </HStack>
              <HStack space={3}>
                <Skeleton
                  style={{
                    width: "5%",
                  }}
                  h={5}
                  rounded="full"
                />
                <Skeleton
                  h={5}
                  style={{
                    width: "90%",
                  }}
                  rounded="full"
                />
              </HStack>
              <HStack space={3}>
                <Skeleton
                  style={{
                    width: "5%",
                  }}
                  h={5}
                  rounded="full"
                />
                <Skeleton
                  h={5}
                  style={{
                    width: "90%",
                  }}
                  rounded="full"
                />
              </HStack>
            </VStack>
          ) : (
            <>
              <Text fontSize={16} mb={2} fontWeight={600}>
                Livrare:
              </Text>

              <Radio.Group
                defaultValue={deliveryMethod.method_id}
                name="myRadioGroup"
                accessibilityLabel="favorite number"
                onChange={(val) => getDeliveryMethodHandler(val)}
              >
                <VStack space={2}>
                  {methods.length > 0
                    ? methods.map((met) =>
                        met.settings.cost ? (
                          <Radio
                            value={met.method_id}
                            key={met.id}
                            w="full"
                            overflow="hidden"
                          >
                            <Text>{met.title}:</Text>
                            <Text fontSize={16} bold>
                              {met.settings.cost.value
                                ? met.settings.cost.value
                                : "0 "}
                              lei
                            </Text>
                          </Radio>
                        ) : (
                          ""
                        )
                      )
                    : ""}
                </VStack>
              </Radio.Group>
            </>
          )}

          <Divider my={3} />
          <Flex flexDirection="row" mb={2} justifyContent="space-between">
            <Skeleton isLoaded={!loading} rounded="2xl" h={5}>
              <Text fontSize={16} fontWeight={600}>
                Total comandă:
              </Text>
              <Text fontSize={16} fontWeight={600}>
                {cartItems
                  .reduce(
                    (a, c) =>
                      a +
                      c.price * c.quantity +
                      parseFloat(deliveryMethod.total),
                    0
                  )
                  .toFixed(2)}{" "}
                lei
              </Text>
            </Skeleton>
          </Flex>
          <Button
            variant="solid"
            colorScheme="primary"
            size="sm"
            onPress={() => saveDeliveryMethod(deliveryMethod)}
            isLoading={loading}
            fontSize={20}
            fontWeight={400}
            h={12}
          >
            <Text fontSize={20} fontWeight={400} color="#fff">
              Continuă
            </Text>
          </Button>
        </Box>
      )}
    </>
  );
}
