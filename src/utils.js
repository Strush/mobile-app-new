import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStorageData = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    return [];
  }
};

const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};
export default getError;
