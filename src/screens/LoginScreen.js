import {
  VStack,
  Input,
  Button,
  FormControl,
  Box,
  Heading,
  Center,
  ScrollView,
  Text,
  useToast,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { AntDesign, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import getError from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Store } from "../Store";

function LoginScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Loading button on form submit
  const [loading, setLoading] = useState(false);

  // Manage state with context API
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const toast = useToast();

  const onSubmit = async (fromData) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.API_URI_SITE}/wp-json/jwt-auth/v1/token`,
        {
          username: fromData.email,
          password: fromData.password,
        }
      );
      ctxDispatch({ type: "USER_SINGIN", payload: data });
      setLoading(false);

      // Send token on async storage
      AsyncStorage.setItem("@user_info", JSON.stringify(data));
      navigation.push("Home");
    } catch (err) {
      console.log(err.response.status);
      toast.show({
        description:
          err.response.status == 403
            ? "Parola sau email-ul sunt invalide!"
            : getError(err),
        type: "error",
        style: {
          backgroundColor: "red",
        },
      });
      setLoading(false);
    }
  };

  // If user is login, redirect to homepage
  useEffect(() => {
    if (userInfo) {
      navigation.push("Home");
    }
  }, [navigation, userInfo]);

  return (
    <ScrollView w="full" h="full" safeAreaTop>
      <VStack width="full" space={4} p={6} h="full" justifyContent="center">
        <Center mb={5}>
          <SimpleLineIcons name="user-following" size={80} color="#008080" />
        </Center>
        <Heading textAlign="center" fontSize="3xl" mb={5}>
          Intră în cont
        </Heading>

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
                fontSize="xl"
                py={3}
                variant="outline"
              />
            )}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            }}
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            {errors.email?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={"password" in errors}>
          <FormControl.Label>Password</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                placeholder="**********"
                onChangeText={onChange}
                value={value}
                type="text"
                fontSize="xl"
                py={3}
                variant="outline"
                InputLeftElement={
                  <AntDesign
                    name="unlock"
                    style={{ marginLeft: 15 }}
                    size={24}
                    color="#155e75"
                  />
                }
              />
            )}
            name="password"
            rules={{
              required: "Password is required",
            }}
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            {errors.password?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <Box mt={3}>
          <Button
            onPress={handleSubmit(onSubmit)}
            bgColor="teal.600"
            _text={{
              fontSize: "xl",
            }}
            isLoading={loading}
            isLoadingText="Autentificare..."
            _pressed={{
              color: "red",
              bgColor: "teal.500",
            }}
          >
            Autentificare
          </Button>
          <Box flexDirection="row" mt={3}>
            <Text fontSize="md">Nu ai încă un cont,</Text>
            <Button
              ml={2}
              p={0}
              variant="link"
              onPress={() => navigation.push("Register")}
              _pressed={{
                color: "primary.300",
              }}
            >
              <Text fontSize="md" fontWeight="600" color="primary.600">
                Crează unul nou
              </Text>
            </Button>
          </Box>
        </Box>
      </VStack>
    </ScrollView>
  );
}
export default LoginScreen;
