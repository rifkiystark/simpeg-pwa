import axiosIntance from "./_axios-instance";
import Const from "../constant";

const allUser = async () => {
  try {
    let result = await axiosIntance().get("user", {
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
const updateUser = async (payload) => {
  try {
    let result = await axiosIntance().post("user/update", payload, {
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

export { allUser, updateUser };
