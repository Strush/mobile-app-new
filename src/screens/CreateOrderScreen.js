import { Box, ScrollView, Text } from "native-base";
import React, { useContext, useEffect, useReducer } from "react";
import { Store } from "../Store";
import { WooCommerceDataAPI } from "../woocoomerce";

const reducer = (state, action) => {
  switch (action.type) {
    case "ORDER_REQUEST": {
      return { ...state, loading: true };
    }
    case "ORDER_SUCCESS": {
      return { ...state, loading: false, order: action.payload };
    }
    case "ORDER_FAIL": {
      return { ...state, loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

const CreateOrderScreen = () => {
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
    userInfo,
  } = state;

  const [{ loading, order, error }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const createOrder = async () => {
      try {
        dispatch({ type: "ORDER_REQUEST", loading: true });
        const order = await WooCommerceDataAPI.post("orders", {
          payment_method: "cod",
          payment_method_title: "Numerar la livrare",
          set_paid: false,
          billing: userInfo.address,
          shipping: userInfo.address,
          line_items: cartItems.map(({ id, quantity }) => {
            return { product_id: id, quantity: quantity };
          }),

          shipping_lines: [
            {
              method_id: "flat_rate",
              method_title: "Flat Rate",
              total: "14.99",
            },
          ],
        });
        dispatch({
          type: "ORDER_SUCCESS",
          loading: false,
          payload: order,
        });
      } catch (err) {
        dispatch({ type: "ORDER_FAIL", loading: false, payload: err });
        console.log("error -->", err);
      }
    };
    createOrder();
  }, []);

  return (
    <>
      <ScrollView>
        <Box safeAreaTop>
          {loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Error...</Text>
          ) : (
            console.log(order)
          )}
        </Box>
      </ScrollView>
      <Text>CreateOrderScreen</Text>
    </>
  );
};

export default CreateOrderScreen;
