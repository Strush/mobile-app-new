import React, { useEffect, useReducer } from "react";
import { useWindowDimensions } from "react-native";
import { Box, ScrollView, Text } from "native-base";
import { WooCommerceDataAPI } from "../woocoomerce";
import Loading from "../components/Loading";
import { FlatListSlider } from "react-native-flatlist-slider";
import { Rating } from "react-native-ratings";
import MessageBox from "../components/MessageBox";
import RenderHTML from "react-native-render-html";
import AddToCartButton from "../components/AddToCartButton";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCT_REQUEST":
      return { ...state, loading: true };
    case "FETCH_PRODUCT_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_PRODUCT_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function SingleProduct({ route }) {
  const { productId } = route.params;
  const { width } = useWindowDimensions();

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    product: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        dispatch({ type: "FETCH_PRODUCT_REQUEST", loading: true });
        const data = await WooCommerceDataAPI.get(`products/${productId}`);
        dispatch({
          type: "FETCH_PRODUCT_SUCCESS",
          payload: data,
          loading: false,
        });
      } catch (err) {
        dispatch({ type: "FETCH_PRODUCT_FAIL", payload: err, loading: false });
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <>
          <ScrollView>
            <Box safeAreaTop position="relative">
              <Box shadow="1" borderBottomWidth={1} borderBottomColor="#ccc">
                {product.images?.length > 0 ? (
                  <FlatListSlider
                    data={product.images}
                    imageKey={"src"}
                    indicatorActiveWidth={15}
                    indicatorContainerStyle={{
                      position: "absolute",
                      bottom: 15,
                    }}
                    height={340}
                    animation
                  />
                ) : (
                  "No image"
                )}
              </Box>
              <Box p={4} bg="#fff" shadow={1}>
                <Text bold fontSize="lg" mb={4}>
                  {product.name}
                </Text>
                <Text mb={3}>
                  <Rating
                    type="custom"
                    startingValue={product?.average_rating} //product?.rating_count
                    ratingCount={5}
                    imageSize={20}
                    style={{
                      paddingRight: 10,
                    }}
                  />
                  <Text fontSize={16}>{product?.average_rating}</Text>
                </Text>
                <Text fontSize={22} color="#FF0000" mb={1} bold>
                  {product.price} Lei
                </Text>
                {product.stock_status == "instock" ? (
                  <Text color="#367E18" fontSize={14} bold>
                    In Stock
                  </Text>
                ) : (
                  <Text color="#CC3636" fontSize={14} bold>
                    Stock Epuizat
                  </Text>
                )}

                <Box mt={3}>
                  <Text bold fontSize={18}>
                    Descriere generală:
                  </Text>
                  <RenderHTML
                    width={width}
                    contentWidth={width}
                    source={{ html: `${product.description}` }}
                    tagsStyles={contentStyles}
                  ></RenderHTML>
                </Box>
              </Box>
            </Box>
          </ScrollView>

          <Box p={4} bg="#fff" shadow={1} borderColor="#ccc" borderWidth={1}>
            <AddToCartButton
              product={product}
              BtnHeight={40}
              TextSize={20}
              IconSize={24}
            />
          </Box>
        </>
      )}
    </>
  );
}

const contentStyles = {
  p: { lineHeight: 26, fontSize: 16, margin: 0, padding: 0 },
  h3: { fontSize: 18, lineHeight: 26, padding: 0, marginBottom: 0 },
  li: { fontSize: 15, lineHeight: 20, marginBottom: 10 },
};
