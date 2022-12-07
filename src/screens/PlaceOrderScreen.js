import {
  Box,
  Button,
  FormControl,
  VStack,
  Input,
  Text,
  TextArea,
  StatusBar,
  View,
} from "native-base";
import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  SimpleLineIcons,
  Entypo,
  AntDesign,
  Feather,
  Octicons,
} from "@expo/vector-icons";
import { Store } from "../Store";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PlaceOrderScreen = ({ navigation }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const storageData = userInfo.address;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (address) => {
    address = {
      ...address,
      address_2: "",
      city: "Bacau",
      state: "Ro",
      country: "Romania",
    };
    ctxDispatch({
      type: "SAVE_DELIVERY_ADDRESS",
      payload: { ...userInfo.address, address },
    });

    await AsyncStorage.setItem("userInfoAddress", JSON.stringify(address));

    navigation.push("Payment");
  };

  return (
    <Box style={{ flex: 1 }} safeAreaBottom>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={90}
      >
        <>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <VStack space={4} justifyContent="center" p={4}>
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
                  defaultValue={storageData.first_name || ""}
                />
                <FormControl.ErrorMessage>
                  {errors.first_name?.type == "required"
                    ? errors.first_name?.message
                    : "Minimum 3 caractere"}
                </FormControl.ErrorMessage>
              </FormControl>

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
                  rules={{
                    required: "Prenumele este obligatoriu",
                    minLength: 3,
                  }}
                  defaultValue={storageData.last_name || ""}
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
                  defaultValue={storageData.phone || ""}
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
                    required: "Email-ul este obligatoriu",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  defaultValue={storageData.email || ""}
                />
                <FormControl.ErrorMessage>
                  {errors.email?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={"code_postal" in errors}>
                <FormControl.Label>Codul poștal</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onBlur={onBlur}
                      placeholder="Codul poștal"
                      onChangeText={onChange}
                      value={value}
                      fontSize="lg"
                      numberOfLines={1}
                      variant="outline"
                      InputLeftElement={
                        <Octicons
                          name="codescan-checkmark"
                          size={24}
                          p={0}
                          style={{ marginLeft: 15, lineHeight: 24 }}
                          color="#155e75"
                        />
                      }
                    />
                  )}
                  name="code_postal"
                  rules={{
                    required: "Codul poștal este obligatoriu",
                    minLength: 5,
                  }}
                  defaultValue={storageData.code_postal || ""}
                />
                <FormControl.ErrorMessage>
                  {errors.code_postal?.type == "required"
                    ? errors.code_postal?.message
                    : "Minimum 5 caractere"}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={"address_1" in errors}>
                <FormControl.Label>Adresa</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextArea
                      onBlur={onBlur}
                      placeholder="Adresa"
                      onChangeText={onChange}
                      value={value}
                      fontSize="lg"
                      variant="outline"
                      InputLeftElement={
                        <AntDesign
                          name="enviromento"
                          size={28}
                          p={0}
                          style={{
                            marginLeft: 15,
                            paddingTop: 7,
                            textAlignVertical: "top",
                            height: "100%",
                          }}
                          color="#155e75"
                        />
                      }
                    />
                  )}
                  name="address_1"
                  rules={{ required: "Adresa este obligatorie", minLength: 3 }}
                  defaultValue={storageData.address_1 || ""}
                />
                <FormControl.ErrorMessage>
                  {errors.address_1?.type == "required"
                    ? errors.address_1?.message
                    : "Minimum 3 caractere"}
                </FormControl.ErrorMessage>
              </FormControl>
            </VStack>
          </ScrollView>

          <View px={4} py={3} flexDirection="row" alignItems="center">
            <Button
              variant="solid"
              colorScheme="primary"
              size="sm"
              w="100%"
              onPress={handleSubmit(onSubmit)}
            >
              <Text fontSize={20} fontWeight={400} color="#fff">
                Continuă
              </Text>
            </Button>
          </View>
        </>
      </KeyboardAvoidingView>
    </Box>
  );
};

export default PlaceOrderScreen;
