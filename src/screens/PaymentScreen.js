import {
  Box,
  Text,
  Radio,
  VStack,
  Flex,
  Center,
  Heading,
  HStack,
  Button,
  ScrollView,
} from "native-base";
import React, { useContext, useState } from "react";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Store } from "../Store";

const PaymentScreen = ({ navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { state } = useContext(Store);
  console.log(state, "state --->");

  return (
    <>
      <ScrollView>
        <Box safeAreaTop justifyContent="center" p={6}>
          <Center
            style={{
              marginBottom: 40,
            }}
          >
            <FontAwesome5 name="money-check-alt" size={100} color="#155e75" />
            <Heading mt={4} textAlign="center" fontSize="2xl">
              Metoda de plată
            </Heading>
          </Center>

          <Radio.Group
            defaultValue="card"
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            onChange={(val) => setPaymentMethod(val)}
          >
            <VStack space={1}>
              <HStack alignItems="center">
                <Radio value="15">
                  <Text fontSize={16} bold>
                    Cash
                  </Text>
                </Radio>
                <Flex flexDirection="row" alignItems="center">
                  <Text>{"  ("}</Text>
                  <MaterialIcons
                    name="attach-money"
                    size={24}
                    color="#155e75"
                  />
                  <Text>{"Plătește cu numerar la livrare )"}</Text>
                </Flex>
              </HStack>
              <HStack alignItems="center">
                <Radio value="card" my={2}>
                  <Text fontSize={16} bold>
                    Card bancar
                  </Text>
                </Radio>
                <Flex
                  flexDirection="row"
                  flex={1}
                  space={2}
                  alignItems="center"
                >
                  <Text pr={1}>{"  ("}</Text>
                  <FontAwesome5 name="money-check" size={20} color="#155e75" />
                  <Text pl={1}>{")"}</Text>
                </Flex>
              </HStack>
            </VStack>
          </Radio.Group>
        </Box>
      </ScrollView>
      <Box py={4} px={3} background="#fff">
        <Button
          variant="solid"
          colorScheme="primary"
          size="sm"
          onPress={() => navigation.navigate("order")}
        >
          <Text fontSize={20} fontWeight={400} color="#fff">
            Plătește
          </Text>
        </Button>
      </Box>
    </>
  );
};

export default PaymentScreen;
