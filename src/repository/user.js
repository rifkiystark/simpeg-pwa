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
    if (error.response) {
      if (error.response.status == 422) {
        return {
          status: false,
          data: null,
          message: "Email sudah digunakan oleh pegawai lain",
        };
      } else {
        return {
          status: false,
          data: null,
          message: "Gagal memperbarui data",
        };
      }
    } else {
      return {
        status: false,
        data: null,
        message: "Gagal memperbarui data",
      };
    }
  }
};

export { allUser, updateUser };
