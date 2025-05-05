import axios from "axios";

// const axiosInstance = () => {
const axiosInstance = axios.create({
  baseURL:
    "http://localhost/e-commerce_webapp/laravel_con_bsc_ecommerce/public/api/",
});

//   return instance;
// };

export default axiosInstance;
