import axiosIntance from "./_axios-instance"
import Const from '../constant';

const login = async (email, password) => {
    try {
        let result = await axiosIntance().post("auth/login", { email, password });
        return { status: true, data: result.data.data, message: "Berhasil Login" }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                return { status: false, data: {}, message: error.response.data.message }
            } else {
                return { status: false, data: {}, message: "Login Gagal" }
            }
        } else if (error.request) {
            return { status: false, data: {}, message: "Server error" }
        } else {
            return { status: false, data: {}, message: "Error tidak diketahui" }
        }
    }
}

const userInfo = async () => {
    try {
        let result = await axiosIntance().get("auth/me", {
            headers: { 'Authorization': "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN) }
        });
        return { status: true, data: result.data.data, message: "Berhasil" }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                return { status: false, data: {}, message: Const.MESSAGE_CODE.FILL_USER_INFO }
            } else {
                return { status: false, data: {}, message: "Error, hubungi pengembang aplikasi" }
            }
        } else {
            return { status: false, data: {}, message: "Error, hubungi pengembang aplikasi" }

        }
    }
}


export { login, userInfo }