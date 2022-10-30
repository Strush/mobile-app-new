import {
  Box,
  Button,
  ScrollView,
  FormControl,
  Heading,
  Center,
  VStack,
  Input,
  Text,
} from "native-base";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Rating } from "react-native-ratings";
import {
  FontAwesome5,
  SimpleLineIcons,
  Entypo,
  AntDesign,
  Feather,
} from "@expo/vector-icons";
import { Store } from "../Store";

const PlaceOrderScreen = ({ navigation }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (address) => {
    ctxDispatch({
      type: "SAVE_DELIVERY_ADDRESS",
      payload: { ...userInfo.address, ...address },
    });
    console.log(userInfo, "address --->");
    navigation.push("Payment");
  };

  return (
    <>
      <ScrollView px={4}>
        <VStack width="full" space={4} h="full" justifyContent="center" p={4}>
          <Center>
            <FontAwesome5 name="user-edit" size={64} color="#155e75" />
          </Center>
          <Heading textAlign="center" fontSize="2xl">
            Adresa de livrare
          </Heading>

          <FormControl isRequired isInvalid={"first_name" in errors}>
            <FormControl.Label>Nume</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  placeholder="Nume"
                  onChangeText={onChange}
                  value={value}
                  fontSize="lg"
                  variant="outline"
                  InputLeftElement={
                    <SimpleLineIcons
                      name="user"
                      size={24}
                      style={{ marginLeft: 15 }}
                      color="#155e75"
                    />
                  }
                />
              )}
              name="first_name"
              rules={{ required: "Numele este obligatoriu", minLength: 3 }}
              defaultValue=""
            />
            <FormControl.ErrorMessage>
              {errors.first_name?.type == "required"
                ? errors.first_name?.message
                : "Minimum 3 caractere"}
            </FormControl.ErrorMessage>
          </FormControl>
          {console.log(errors, "errors")}

          <FormControl isRequired isInvalid={"last_name" in errors}>
            <FormControl.Label>Prenume</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  placeholder="Prenume"
                  onChangeText={onChange}
                  value={value}
                  fontSize="lg"
                  variant="outline"
                  InputLeftElement={
                    <SimpleLineIcons
                      name="user"
                      size={24}
                      style={{ marginLeft: 15 }}
                      color="#155e75"
                    />
                  }
                />
              )}
              name="last_name"
              rules={{ required: "Prenumele este obligatoriu", minLength: 3 }}
              defaultValue=""
            />
            <FormControl.ErrorMessage>
              {errors.last_name?.type == "required"
                ? errors.last_name?.message
                : "Minimum 3 caractere"}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={"phone" in errors}>
            <FormControl.Label>Telefon</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  placeholder="+40 0771775373"
                  onChangeText={onChange}
                  value={value}
                  fontSize="lg"
                  type="phone"
                  variant="outline"
                  InputLeftElement={
                    <Feather
                      name="phone"
                      size={24}
                      style={{ marginLeft: 15 }}
                      color="#155e75"
                    />
                  }
                />
              )}
              name="phone"
              rules={{ required: "Telefon este obligatoriu", minLength: 9 }}
              defaultValue=""
            />
            <FormControl.ErrorMessage>
              {errors.phone?.type == "required"
                ? errors.phone?.message
                : "Minimum 9 caractere"}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={"email" in errors}>
            <FormControl.Label>Email</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  placeholder="user@gmail.com"
                  onChangeText={onChange}
                  value={value}
                  type="email"
                  InputLeftElement={
                    <Entypo
                      name="mail"
                      size={24}
                      style={{ marginLeft: 15 }}
                      color="#155e75"
                    />
                  }
                  fontSize="lg"
                  variant="outline"
                />
              )}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              defaultValue=""
            />
            <FormControl.ErrorMessage>
              {errors.email?.message}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={"address_1" in errors}>
            <FormControl.Label>Adresa</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  placeholder="Adresa"
                  onChangeText={onChange}
                  value={value}
                  fontSize="lg"
                  numberOfLines={1}
                  variant="outline"
                  InputLeftElement={
                    <AntDesign
                      name="enviromento"
                      size={24}
                      p={0}
                      style={{ marginLeft: 15, lineHeight: 24 }}
                      color="#155e75"
                    />
                  }
                />
              )}
              name="address_1"
              rules={{ required: "Adresa este obligatorie", minLength: 3 }}
              defaultValue=""
            />
            <FormControl.ErrorMessage>
              {errors.address_1?.type == "required"
                ? errors.address_1?.message
                : "Minimum 3 caractere"}
            </FormControl.ErrorMessage>
          </FormControl>
        </VStack>
      </ScrollView>
      <Box py={4} px={3} background="#fff">
        <Button
          variant="solid"
          colorScheme="primary"
          size="sm"
          onPress={handleSubmit(onSubmit)}
        >
          <Text fontSize={20} fontWeight={400} color="#fff">
            Continuă
          </Text>
        </Button>
      </Box>
    </>
  );
};

export default PlaceOrderScreen;
