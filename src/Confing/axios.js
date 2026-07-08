import axios from "axios";
import { APIURL } from "./Apiconfing";
import secureLocalStorage from "react-secure-storage";
const token  = secureLocalStorage.getItem('token')
 const Axios = axios.create({
    baseURL: APIURL,
    headers: {
      "Authorization": `Bearer ${token}`,
    },
});


export default Axios;