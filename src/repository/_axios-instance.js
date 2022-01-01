import axios from "axios";
import Const from "../constant";

const axiosIntance = axios.create({
    baseURL: Const.BASE_URL + Const.API_PREFIX,
    headers: { 'Accept': 'application/json' }
});

export default axiosIntance