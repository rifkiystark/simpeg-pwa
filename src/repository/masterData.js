import axiosIntance from "./_axios-instance"
import Const from '../constant';

const masterDiklat = async () => {
    try {
        let result = await axiosIntance().get("master/diklat", {
            headers: { 'Authorization': "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN) }
        });
        return { status: true, data: result.data.data, message: "" }
    } catch (error) {
        return {
            status: false,
            data: null,
            message: ""
        }

    }
}


export { masterDiklat }