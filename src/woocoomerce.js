import WooCommerceAPI from "react-native-woocommerce-api";

export const WooCommerceDataAPI = new WooCommerceAPI({
  url: "https://development.cadouribarbati.ro", // Your store URL
  ssl: true,
  consumerKey: "ck_041b25ad036c80c5fb09a5e7b74e2c9b35f264cf", // Your consumer secret
  consumerSecret: "cs_34719000809c7b3a13c1a06acba270105ee4ee43", // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: "wc/v3", // WooCommerce WP REST API version
  queryStringAuth: true,
});
