import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStorageData = (key) => {
  let data = "";
  try {
    data = AsyncStorage.getItem(key);
  } catch (error) {
    data = null;
  }
  return data;
};

const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};
export default getError;
