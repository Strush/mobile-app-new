import { Button, Flex, Heading, Input, VStack } from "native-base";
import React from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";

export default function LoginScreen() {
  return (
    <Flex p={6} flex={1} justifyContent="center" bg="muted.200" h="full">
      <Heading size="xl" mb={6} color="black">
        Autentificare
      </Heading>
      <VStack space={5}>
        <Input
          placeholder="user@gmail.com"
          size="lg"
          InputLeftElement={
            <Entypo
              name="mail"
              size={24}
              style={{ marginLeft: 15 }}
              color="#155e75"
            />
          }
          pl={2}
          type="email"
          variant="outline"
          color="black"
          w="full"
        />
        <Input
          InputLeftElement={
            <AntDesign
              name="unlock"
              style={{ marginLeft: 15 }}
              size={24}
              color="#155e75"
            />
          }
          placeholder="*********"
          type="password"
          size="lg"
          variant="outline"
          w="full"
        />

        <Button
          w="full"
          mt={2}
          _pressed={{
            bg: "#06b6d4",
          }}
          _text={{
            color: "white",
            fontSize: "20px",
          }}
          color="#155e75"
        >
          Autentificare
        </Button>
      </VStack>
    </Flex>
  );
}
