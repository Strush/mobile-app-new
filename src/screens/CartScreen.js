import React, { useContext, useState } from "react";
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
  VStack,
} from "native-base";
import { Store } from "../Store";
import { TouchableOpacity, Pressable } from "react-native";
import { Rating } from "react-native-ratings";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { WooCommerceDataAPI } from "../woocoomerce";
import axios from "axios";

export default function CartScreen({ navigation }) {
  const { state, dispatch: ctxContext } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const [deliveryMethod, setDeliveryMethod] = useState(15);

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
  };

  const removeProductHandler = (product) => {
    ctxContext({ type: "REMOVE_PRODUCT_FROM_CART", payload: product });
    Toast.show({
      description: "Produsul a fost șters din coș",
      type: "success",
      style: {
        backgroundColor: "#42855B",
      },
    });
  };

  const saveDeliveryMethod = async (val) => {
    console.log(val, "val -->");
    const delivery = await WooCommerceDataAPI.get(`shipping_methods/${val}`)
      .then(({ id, title }) => {
        console.log(id, title);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    //ctxContext({ type: "SAVE_DELIVERY_PRICE", payload: val });
    navigation.navigate("PlaceOrder");
  };

  return (
    <>
      <ScrollView>
        <Box safeAreaTop position="relative">
          <HStack flexDirection="column" px="2" mt="2">
            {cartItems.length > 0 ? (
              cartItems.map((product, index) => (
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
                    borderRadius: 7,
                  }}
                  key={index}
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
                  <Box flex={1} margin={0} pr={1}>
                    <Text
                      fontSize={13}
                      lineHeight={16}
                      mb={2}
                      noOfLines={2}
                      bold
                    >
                      {product.name}
                    </Text>

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
                </TouchableOpacity>
              ))
            ) : (
              <Center
                style={{
                  paddingTop: 50,
                }}
              >
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
                  onPress={() => navigation.navigate("Home")}
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
          <Text fontSize={16} mb={2} fontWeight={600}>
            Livrare:
          </Text>
          <Radio.Group
            defaultValue="flat_rate"
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            onChange={(val) => setDeliveryMethod(val)}
          >
            <VStack>
              <Radio value="flat_rate">
                Sameday:
                <Text fontSize={16} bold>
                  14,99 lei
                </Text>
              </Radio>
              <Radio value="local_pickup" my={2}>
                Colectare locală:
                <Text fontSize={16} bold>
                  0 lei
                </Text>
              </Radio>
            </VStack>
          </Radio.Group>
          <Divider my={2} />
          <Flex flexDirection="row" mb={2} justifyContent="space-between">
            <Text fontSize={16} fontWeight={600}>
              Total comandă:
            </Text>
            <Text fontSize={16} fontWeight={600}>
              {cartItems
                .reduce((a, c) => a + c.price * c.quantity, 0)
                .toFixed(2)}
              Lei
            </Text>
          </Flex>
          <Button
            variant="solid"
            colorScheme="primary"
            size="sm"
            onPress={() => saveDeliveryMethod(deliveryMethod)}
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
