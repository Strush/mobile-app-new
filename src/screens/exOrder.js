import { Box, Flex, HStack, Image, ScrollView, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Rating } from "react-native-ratings";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { order } from "../exOrder.js";

const exOrder = () => {
  // const [order, setOrder] = useState({});

  console.log(order.id, "order -->");

  return (
    <>
      <ScrollView>
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
          <Box shadow={1} px={3} pb={3} mb={5} bg="#fff" rounded={5} w="full">
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
              <Text fontWeight={600}>Telefon:</Text> {" " + order.billing.phone}
            </Text>
            <Text mb={1}>
              <Text fontWeight={600}>Email:</Text> {" " + order.billing.email}
            </Text>
          </Box>
          <Box shadow={1} px={3} pb={3} mt={5} bg="#fff" rounded={5} w="full">
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
                ` (${order.shipping_lines[0].total_tax} lei)`}
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
      </ScrollView>
    </>
  );
};

export default exOrder;
