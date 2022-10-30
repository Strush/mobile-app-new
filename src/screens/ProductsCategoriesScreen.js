import React, { useEffect, useReducer } from "react";
import { WooCommerceDataAPI } from "../woocoomerce";
import { Box, Center, HStack, Image, ScrollView, Text } from "native-base";
import SearchBarScreen from "./SearchBarScreen";
import Loading from "../components/Loading";
import { TouchableOpacity } from "react-native";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST_CATEGORIES":
      return { ...state, loading: true };
    case "FETCH_SUCCESS_CATEGORIES":
      return { ...state, loading: false, categories: action.payload };
    case "FETCH_FAIL_CATEGORIES":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductsCategoriesScreen({ navigation }) {
  const [{ loading, categories, error }, dispatch] = useReducer(reducer, {
    loading: true,
    categories: null,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST_CATEGORIES", loading: true });
      try {
        const data = await WooCommerceDataAPI.get("products/categories");
        dispatch({
          type: "FETCH_SUCCESS_CATEGORIES",
          loading: false,
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL_CATEGORIES",
          loading: false,
          payload: err,
        });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Text>Error...</Text>
      ) : (
        <ScrollView>
          <Box safeAreaTop position="relative">
            {/* //<SearchBarScreen /> */}
            <HStack space={3} mt={1} pl="4" flexWrap="wrap">
              {categories.map((cat) =>
                cat.slug !== "uncategorized" ? (
                  <TouchableOpacity
                    style={{
                      display: "flex",
                      width: "30%",
                      marginBottom: 10,
                      backgroundColor: "#fff",
                      shadow: 1,
                      padding: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 7,
                    }}
                    key={cat.id}
                    onPress={() =>
                      navigation.navigate("Products", {
                        categoryID: cat.id,
                      })
                    }
                  >
                    <Image
                      rounded="full"
                      width="70px"
                      height="70px"
                      mb={2}
                      source={{
                        uri: cat.image ? cat.image.src : "test",
                      }}
                      alt="Cadouri barbati"
                    />
                    <Text fontSize="lg" bold>
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  ""
                )
              )}
            </HStack>
          </Box>
        </ScrollView>
      )}
    </>
  );
}
