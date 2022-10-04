import axios from "axios";

const getToken = async (email, password) => {
  const { data } = await axios.post(
    `${process.env.API_URI_SITE}/wp-json/jwt-auth/v1/token`,
    {
      username: email,
      password: password,
    }
  );
  console.log(data, "consts");
  return data;
};

export default getToken;
