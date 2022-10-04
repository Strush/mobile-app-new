import { Box } from "native-base";
import { Button, Text, View } from "react-native";

export const Home = ({ navigation }) => (
  <Box bgColor="#000" position="absolute">
    <Text>Master List Screen</Text>
    <Button
      title="React Native by Example"
      onPress={() =>
        navigation.push("Details", { name: "React Native by Example " })
      }
    />
    <Button
      title="React Native School"
      onPress={() =>
        navigation.push("Details", { name: "React Native School" })
      }
    />
    <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
  </Box>
);
