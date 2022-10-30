import { View, Text } from "react-native";
import React from "react";
import { Box, HStack, Image, ScrollView, Skeleton } from "native-base";

const SkeletonProduct = () => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <HStack space={3} px={4}>
        {[...Array(8).keys()].map((index) => (
          <Box
            key={index}
            style={{
              display: "flex",
              overflow: "hidden",
              maxWidth: 160,
              backgroundColor: "#fff",
              shadow: 2,
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            <Skeleton h={140} w={160} mb={2}>
              <Image
                width="160px"
                height="140px"
                resizeMode="cover"
                marginBottom={2}
                source={{
                  uri: "skeleton",
                }}
                alt=""
              />
            </Skeleton>
            <Box margin={0} px={2} pb={2}>
              <Skeleton.Text
                lines={2}
                space={1}
                height={39}
                lineHeight={16}
                style={{ marginBottom: 2 }}
                mb={2}
              >
                <Text height={36} mb={3} noOfLines={2}></Text>
              </Skeleton.Text>

              <HStack justifyContent="center" mb={1}>
                <Skeleton.Text lines={1} width={90} mb={2}></Skeleton.Text>
              </HStack>

              <HStack justifyContent="center" mb={2}>
                <Skeleton.Text lines={1} width={100} mb={2}>
                  <Text></Text>
                </Skeleton.Text>
              </HStack>

              <Skeleton
                h={30}
                style={{
                  borderRadius: 3,
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    overflow: "visible",
                    backgroundColor: "#3C5898",
                    height: 30,
                    borderRadius: 3,
                  }}
                >
                  <HStack alignItems="center" justifyContent="center" space="2">
                    <Text></Text>
                  </HStack>
                </Box>
              </Skeleton>
            </Box>
          </Box>
        ))}
      </HStack>
    </ScrollView>
  );
};

export default SkeletonProduct;
