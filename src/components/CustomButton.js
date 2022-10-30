import { HStack } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

const CustomButton = ({ children }) => {
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        backgroundColor: "#3C5898",
        height: 40,
        paddingHorizontal: 12,
        paddingLeft: 4,
        borderRadius: 5,
      }}
      {...children}
    >
      <HStack alignItems="center" space="2">
        {children}
      </HStack>
    </TouchableOpacity>
  );
};

export default CustomButton;
