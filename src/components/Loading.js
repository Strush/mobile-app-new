import React from "react";
import { Spinner, View } from "native-base";

export default function Loading() {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        zIndex: 999,
        height: "100%",
      }}
    >
      <Spinner size="lg" zIndex="99" />
    </View>
  );
}
