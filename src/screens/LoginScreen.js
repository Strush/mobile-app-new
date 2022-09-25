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
} from "native-base";
import React from "react";
import { AntDesign, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";

function LoginScreen() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { password: "" } });
  const onSubmit = (data) => {
    console.log("submiting with ", data);
  };

  const pwd = watch("password");

  return (
    <ScrollView w="full" h="full">
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
                fontSize="lg"
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
                fontSize="lg"
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
              minLength: 1,
              validate: (value) => value == "admin" || "Parolă incorectă",
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
            <Pressable ml={2}>
              <Text fontSize="md" fontWeight="600" color="primary.600">
                Crează unul nou
              </Text>
            </Pressable>
          </Box>
        </Box>
      </VStack>
    </ScrollView>
  );
}
export default LoginScreen;
