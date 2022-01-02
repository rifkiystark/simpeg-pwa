import axios from "axios";
import Const from "../constant";
import { useNavigate } from 'react-router';

const axiosIntance = () => {
    const instance = axios.create({
        baseURL: Const.BASE_URL + Const.API_PREFIX,
        headers: { 'Accept': 'application/json' },
    });

    instance.interceptors.response.use((response) => {
        return response
    }, async function (error) {
        if (error.response.status === 401) {
            const router = useNavigate()
            router("/login", { replace: true })
        }
        return Promise.reject(error);
    });

    return instance
}



export default axiosIntance