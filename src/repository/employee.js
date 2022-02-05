import axiosIntance from "./_axios-instance";
import Const from "../constant";

const employeeByUserId = async (userId) => {
  try {
    let result = await axiosIntance().get("pegawai/" + userId, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN),
      },
    });
    return { status: true, data: result.data, message: "" };
  } catch (error) {
    return {
      status: false,
      data: null,
      message: "",
    };
  }
};

export {
  employeeByUserId
};
