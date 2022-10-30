import WooCommerceAPI from "react-native-woocommerce-api";

export const WooCommerceDataAPI = new WooCommerceAPI({
  url: "https://development.cadouribarbati.ro", // Your store URL
  ssl: true,
  consumerKey: process.env.WOOCOOMERCE_CLIENT_KEY, // Your consumer secret
  consumerSecret: process.env.WOOCOOMERCE_SECRET_KEY, // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: "wc/v3", // WooCommerce WP REST API version
  queryStringAuth: true,
});
