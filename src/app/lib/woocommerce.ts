import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: "https://saddlebrown-porpoise-760293.hostingersite.com/",
  consumerKey: "ck_5234d3c8283f9cf90dde57785fec6d8db08bcfab",
  consumerSecret: "cs_cec1790151b43df1a94cbf5d94f77a9b8f965eca",
  version: "wc/v3",
});

export default api;