import axiosIntance from "./_axios-instance"
import Const from '../constant';


const dashboard = async () => {
    try {
        let result = await axiosIntance().get("dashboard", {
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


export { dashboard }