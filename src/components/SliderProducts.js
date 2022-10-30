import React from "react";
import {
  Box,
  Heading,
  HStack,
  Image,
  ScrollView,
  Skeleton,
  Text,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Rating } from "react-native-ratings";
import { MaterialIcons } from "@expo/vector-icons";
import SkeletonProduct from "./SkeletonProduct";
import { AntDesign } from "@expo/vector-icons";
import AddToCartButton from "./AddToCartButton";

const SliderProducts = ({ loading, error, title, products, navigation }) => {
  return (
    <Box py={4} mb={5} shadow={1} bg="#fff">
      <Skeleton
        isLoaded={!loading}
        lines={1}
        size={10}
        w={40}
        h={6}
        px={4}
        mb={2}
      >
        <Heading size="md" mb="2" px={4}>
          {title}
        </Heading>
      </Skeleton>
      {loading ? (
        <SkeletonProduct />
      ) : error ? (
        <Text>Error...</Text>
      ) : (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {products.length > 0 ? (
            <HStack space={3} pr={5}>
              {products.map((product, index) => (
                <TouchableOpacity
                  style={{
                    display: "flex",
                    overflow: "hidden",
                    maxWidth: 160,
                    backgroundColor: "#fff",
                    shadow: 2,
                    borderColor: "#ccc",
                    borderWidth: 1,
                    borderRadius: 5,
                    marginLeft: index === 0 ? 15 : 0,
                  }}
                  key={product.id}
                  onPress={() =>
                    navigation.navigate("SingleProduct", {
                      productId: product.id,
                    })
                  }
                >
                  <Image
                    width="160px"
                    height="140px"
                    resizeMode="cover"
                    marginBottom={2}
                    source={{
                      uri: product.images ? product.images[0].src : "test",
                    }}
                    alt=""
                  />

                  <Box margin={0} px={2} pb={2}>
                    <Text
                      fontSize={12}
                      textAlign="center"
                      height={36}
                      lineHeight={16}
                      mb={1}
                      noOfLines={2}
                      bold
                    >
                      {product.name}
                    </Text>

                    <HStack justifyContent="center" mb={2}>
                      <Rating
                        type="star"
                        startingValue={product?.rating_count}
                        ratingCount={5}
                        imageSize={14}
                      />
                    </HStack>

                    <HStack justifyContent="center" mb={2}>
                      <Text bold>{product.price} Lei</Text>
                    </HStack>

                    {product?.stock_quantity > 0 ? (
                      <AddToCartButton
                        product={product}
                        BtnHeight={30}
                        TextSize={16}
                        IconSize={18}
                      />
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
                        <HStack justifyContent="center" space="2">
                          <Text color="#fff" bold>
                            Indisponibil
                          </Text>
                        </HStack>
                      </TouchableOpacity>
                    )}
                  </Box>
                </TouchableOpacity>
              ))}
            </HStack>
          ) : (
            ""
          )}
        </ScrollView>
      )}
    </Box>
  );
};

export default SliderProducts;
