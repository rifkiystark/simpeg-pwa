import axiosIntance from "./_axios-instance";
import Const from "../constant";

const myTraining = async () => {
  try {
    let result = await axiosIntance().get("diklat/my", {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN),
      },
    });
    return { status: true, data: result.data.data, message: "" };
  } catch (error) {
    return {
      status: false,
      data: null,
      message: "",
    };
  }
};
const updateTraining = async (requestData) => {
  try {
    let result = await axiosIntance().post("diklat/update", requestData, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN),
      },
    });
    return { status: true, data: result.data.data, message: "" };
  } catch (error) {
    return {
      status: false,
      data: null,
      message: "",
    };
  }
};

export { myTraining, updateTraining };
