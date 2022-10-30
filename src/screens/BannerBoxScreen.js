import { ImageBackground } from "react-native";
import React from "react";
import { Box, Flex, Heading, Text, View } from "native-base";
import { Entypo } from "@expo/vector-icons";

export default function BannerBoxScreen({ style, imgOverlay, imgUrl }) {
  return (
    <ImageBackground source={imgUrl} resizeMode="cover" style={[style]}>
      <View style={[imgOverlay]} />
      <Box px={5} pb={4}>
        <Flex flexDirection="row">
          <Entypo name="documents" size={40} color="#fff" />
          <Heading ml={4} color="#fff" fontWeight="900" size="2xl">
            1F2G45
          </Heading>
        </Flex>
        <Heading color="white" fontSize="30px" mt={1}>
          Livrare gratuită
        </Heading>
        <Text color="#fff" fontWeight="500" fontSize="16px">
          Foloseste cuponul de mai sus
        </Text>
      </Box>
    </ImageBackground>
  );
}
