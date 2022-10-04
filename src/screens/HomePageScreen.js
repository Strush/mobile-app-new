import React, { useContext } from "react";
import { Box } from "native-base";
import { Store } from "../Store";
import SearchBarScreen from "./SearchBarScreen";
import BannerBoxScreen from "./BannerBoxScreen";
import { StyleSheet } from "react-native";

function HomePageScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  let img = require("../../assets/login3.png");

  return (
    <Box safeAreaTop>
      <SearchBarScreen />
      <BannerBoxScreen
        style={backgroundImageCustomStyle.image}
        imgOverlay={backgroundImageCustomStyle.overlay}
        imgUrl={img}
      />
    </Box>
  );
}

export default HomePageScreen;

const backgroundImageCustomStyle = StyleSheet.create({
  image: {
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    height: 290,
    display: "flex",
    justifyContent: "flex-end",
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#000",
    opacity: 0.6,
  },
});
