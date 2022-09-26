import {
  VStack,
  Input,
  Button,
  FormControl,
  Box,
  Heading,
  Pressable,
  Center,
  ScrollView,
  Text,
  useToast,
} from "native-base";
import React, { useReducer } from "react";
import { AntDesign, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import getError from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER_REQUEST":
      return { ...state, loading: true };
    case "FETCH_USER_SUCCESS":
      return { ...state, loading: false, user: action.payload };
    case "FETCH_USER_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function LoginScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Manage state of API Request
  const [{ loading, user, error }, dispatch] = useReducer(reducer, {
    loading: false,
    user: null,
    error: "",
  });

  const toast = useToast();

  const onSubmit = async (fromData) => {
    console.log("formdata", fromData);

    dispatch({ type: "FETCH_USER_REQUEST", loading: true });

    try {
      const { data } = await axios.post(
        `${process.env.API_URI_SITE}/wp-json/wp/login`,
        {
          email: fromData.email,
          password: fromData.password,
        }
      );
      dispatch({ type: "FETCH_USER_SUCCESS", loading: false, payload: data });
    } catch (err) {
      dispatch({
        type: "FETCH_USER_FAIL",
        loading: false,
        payload: err.message,
      });

      toast.show({
        description: getError(err),
        type: "error",
        style: {
          backgroundColor: "red",
        },
      });
    }
  };

  return (
    <ScrollView w="full" h="full" safeAreaTop>
      <VStack width="full" space={4} p={6} h="full" justifyContent="center">
        <Text>
          {loading
            ? "Loading..."
            : error
            ? console.log(error)
            : console.log(user)}
        </Text>
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
