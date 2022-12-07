import {
  Box,
  Text,
  Radio,
  VStack,
  Button,
  Toast,
  ScrollView,
  Image,
  Center,
} from "native-base";
import React, { useContext, useState } from "react";
import {
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Store } from "../Store";
import { WooCommerceDataAPI } from "../woocoomerce";
import getError from "../utils";

const PaymentScreen = ({ navigation }) => {
  const { state, dispatch: ctxContext } = useContext(Store);
  const [paymentMethod, setPaymentMethod] = useState(
    state.cart.paymentMethod || { id: "bacs", title: "Card Bancar" }
  );

  const savePaymentMethodHandler = async (val) => {
    try {
      const { id, title } = await WooCommerceDataAPI.get(
        `payment_gateways/${val}`
      );

      ctxContext({
        type: "SAVE_PAYMENT_METHOD",
        payload: { id: id, title: title },
      });

      navigation.navigate("order");
    } catch (err) {
      Toast.show({
        description: getError(err),
        type: "error",
        style: {
          backgroundColor: "red",
        },
      });
    }
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <Box justifyContent="center" p={6} mt={-20}>
          <Center mb={10}>
            <MaterialCommunityIcons
              name="baseball-diamond-outline"
              size={180}
              color="#155e75"
            />
            <FontAwesome5 name="money-check" size={40} color="#155e75" />
          </Center>
          {console.log(paymentMethod, "paymentMethod")}
          <Radio.Group
            defaultValue={paymentMethod.id}
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            onChange={(val) => setPaymentMethod(val)}
            style={{
              flex: 1,
            }}
          >
            <VStack
              bg="#fff"
              rounded={5}
              px={3}
              py={4}
              shadow={1}
              width="100%"
              flex={1}
              flexDirection="row"
              justifyContent="space-between"
              mb={5}
            >
              <Radio value="cod">
                <Text fontSize={16} fontWeight={600}>
                  Plătește cu numerar la livrare
                </Text>
              </Radio>

              <MaterialIcons name="attach-money" size={24} color="#155e75" />
            </VStack>
            <VStack
              bg="#fff"
              rounded={5}
              px={3}
              py={4}
              shadow={1}
              width="100%"
              flex={1}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Radio value="bacs">
                <Text fontSize={16} fontWeight={600}>
                  Card bancar
                </Text>
              </Radio>
              <FontAwesome5 name="money-check" size={20} color="#155e75" />
            </VStack>
          </Radio.Group>
        </Box>
      </ScrollView>
      <Box py={4} px={3} background="#fff">
        <Button
          variant="solid"
          colorScheme="primary"
          size="sm"
          onPress={() => savePaymentMethodHandler(paymentMethod)}
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
