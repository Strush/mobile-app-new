import React from "react";
import { Alert, Text } from "native-base";

const MessageBox = ({ children }) => {
  return (
    <Alert w="100%" status="error">
      <Text>{children}</Text>
    </Alert>
  );
};

export default MessageBox;
