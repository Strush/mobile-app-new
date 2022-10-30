import React from "react";
import { Icon, Input, View, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBarScreen() {
  return (
    <View
      safeAreaTop
      px={4}
      w="full"
      py={4}
      style={{
        zIndex: 999,
      }}
      backgroundColor="#fff"
      shadow={2}
    >
      <VStack w="100%" alignSelf="center">
        <Input
          placeholder="Caută produsul dorit..."
          variant="outline"
          width="100%"
          size="xl"
          fontWeight="500"
          borderRadius="50"
          color="black"
          placeholderTextColor="#000"
          backgroundColor="gray.100"
          px={3}
          InputLeftElement={
            <Icon
              ml="4"
              size="6"
              color="black"
              as={<Ionicons name="ios-search" />}
            />
          }
        />
      </VStack>
    </View>
  );
}
